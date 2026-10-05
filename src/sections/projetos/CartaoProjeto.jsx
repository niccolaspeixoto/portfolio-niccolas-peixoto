import { useRef, useState } from 'react';
import {
  AnimatePresence,
  motion,
  useMotionTemplate,
  useMotionValue,
  useReducedMotion,
  useSpring,
  useTransform,
} from 'framer-motion';
import { ArrowUpRight, Plus } from 'lucide-react';
import { SUAVE } from '../../lib/animacoes';
import { projetos } from '../../data/conteudo';

/* Lado por onde o ponteiro entrou/saiu (Direction Aware Hover — Manu
   Arora / Aceternity, MIT: https://21st.dev/@manuarora700/components/direction-aware-hover). */
const LADOS = ['cima', 'direita', 'baixo', 'esquerda'];
const DESLOCAMENTO = {
  cima: { x: 0, y: '-100%' },
  direita: { x: '100%', y: 0 },
  baixo: { x: 0, y: '100%' },
  esquerda: { x: '-100%', y: 0 },
};

function ladoDoPonteiro(evento, el) {
  const r = el.getBoundingClientRect();
  const x = (evento.clientX - r.left - r.width / 2) * (r.width > r.height ? r.height / r.width : 1);
  const y = (evento.clientY - r.top - r.height / 2) * (r.height > r.width ? r.width / r.height : 1);
  const quadrante = Math.round(((Math.atan2(y, x) * 180) / Math.PI + 180) / 90 + 3) % 4;
  return LADOS[quadrante];
}

const variantesOverlay = {
  fora: (lado) => ({ ...(DESLOCAMENTO[lado] ?? DESLOCAMENTO.baixo), opacity: 0 }),
  dentro: { x: 0, y: 0, opacity: 1, transition: { duration: 0.38, ease: SUAVE } },
};

const MOLA_INCLINACAO = { stiffness: 160, damping: 18, mass: 0.6 };

/**
 * @param {boolean} interativo - inclinação 3D, reflexo e overlay direcional
 *   (só com ponteiro fino e movimento liberado)
 * @param {import('framer-motion').MotionValue<number>} [progresso] - scroll
 *   da pista horizontal, pro numeral andar num ritmo diferente do card
 */
export default function CartaoProjeto({ item, indice, interativo, progresso, aoAbrirCase }) {
  const moldura = useRef(null);
  const semMovimento = useReducedMotion();
  const [lado, setLado] = useState('baixo');
  const [sobre, setSobre] = useState(false);

  const inclinaX = useMotionValue(0);
  const inclinaY = useMotionValue(0);
  const molaX = useSpring(inclinaX, MOLA_INCLINACAO);
  const molaY = useSpring(inclinaY, MOLA_INCLINACAO);
  const luzX = useMotionValue(50);
  const luzY = useMotionValue(50);
  const reflexo = useMotionTemplate`radial-gradient(circle at ${luzX}% ${luzY}%, rgba(245, 240, 234, 0.2), transparent 55%)`;

  const progressoSeguro = useMotionValue(0);
  const numeralX = useTransform(progresso ?? progressoSeguro, [0, 1], [90 - indice * 30, -60 - indice * 30]);

  const mover = (e) => {
    if (!interativo) return;
    const r = moldura.current.getBoundingClientRect();
    const px = (e.clientX - r.left) / r.width;
    const py = (e.clientY - r.top) / r.height;
    inclinaY.set((px - 0.5) * 14);
    inclinaX.set((0.5 - py) * 10);
    luzX.set(px * 100);
    luzY.set(py * 100);
  };

  const entrar = (e) => {
    if (!interativo) return;
    setLado(ladoDoPonteiro(e, moldura.current));
    setSobre(true);
  };

  const sair = (e) => {
    if (!interativo) return;
    setLado(ladoDoPonteiro(e, moldura.current));
    setSobre(false);
    inclinaX.set(0);
    inclinaY.set(0);
  };

  const numero = String(indice + 1).padStart(2, '0');

  return (
    <article className="cartao-projeto">
      <motion.span
        className="cartao-projeto__numero"
        style={progresso && !semMovimento ? { x: numeralX } : undefined}
        aria-hidden="true"
      >
        {numero}
      </motion.span>

      <motion.div
        ref={moldura}
        className="cartao-projeto__moldura"
        style={interativo ? { rotateX: molaX, rotateY: molaY, transformPerspective: 1100 } : undefined}
        onPointerMove={mover}
        onPointerEnter={entrar}
        onPointerLeave={sair}
      >
        <img src={item.imagem} alt={`Tela inicial do site de ${item.cliente}`} loading="lazy" />

        {/* Cortina que se recolhe ao entrar na tela (scaleY, não clipPath:
            clipPath com whileInView não dispara de forma confiável nesta
            versão do framer-motion). */}
        {!semMovimento && (
          <motion.span
            className="cartao-projeto__cortina"
            aria-hidden="true"
            initial={{ scaleY: 1 }}
            whileInView={{ scaleY: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 1, ease: SUAVE }}
          />
        )}

        {interativo && (
          <motion.span className="cartao-projeto__reflexo" style={{ background: reflexo }} aria-hidden="true" />
        )}

        <AnimatePresence custom={lado}>
          {interativo && sobre && (
            <motion.div
              className="cartao-projeto__overlay"
              custom={lado}
              variants={variantesOverlay}
              initial="fora"
              animate="dentro"
              exit="fora"
              aria-hidden="true"
            >
              <span className="cartao-projeto__overlay-nicho">{item.nicho}</span>
              <span className="cartao-projeto__overlay-tipo">{item.tipo}</span>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>

      <footer className="cartao-projeto__pe">
        <div>
          <h3 className="cartao-projeto__cliente">{item.cliente}</h3>
          <p className="miudo cartao-projeto__meta">
            {item.nicho} <span aria-hidden="true">·</span> {item.tipo}
          </p>
        </div>
        <span className={`etiqueta${item.status === 'No ar' ? ' etiqueta--ativo' : ''}`}>{item.status}</span>
      </footer>

      {(item.caso || item.url) && (
        <div className="cartao-projeto__acoes">
          {item.caso && (
            <button type="button" className="cartao-projeto__case" onClick={() => aoAbrirCase(item)}>
              <Plus size={14} strokeWidth={2} />
              {projetos.verCase}
            </button>
          )}
          {item.url && (
            <a href={item.url} target="_blank" rel="noreferrer" className="link-risco">
              {projetos.verSite}
              <ArrowUpRight size={14} strokeWidth={1.8} />
            </a>
          )}
        </div>
      )}
    </article>
  );
}
