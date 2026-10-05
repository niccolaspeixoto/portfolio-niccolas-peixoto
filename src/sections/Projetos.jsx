import { useCallback, useLayoutEffect, useRef, useState } from 'react';
import {
  AnimatePresence,
  motion,
  useMotionValueEvent,
  useReducedMotion,
  useScroll,
  useTransform,
} from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import Reveal from '../components/Reveal';
import SecaoComTransicao from '../components/SecaoComTransicao';
import CartaoProjeto from './projetos/CartaoProjeto';
import ModalCase from './projetos/ModalCase';
import { useMidia, DESKTOP, PONTEIRO_FINO } from '../lib/useMidia';
import { projetos } from '../data/conteudo';
import './Projetos.css';

function Abertura() {
  return (
    <div className="projetos__abertura">
      <p className="projetos__rotulo">{projetos.rotulo}</p>
      <h2 className="d-secao projetos__titulo">{projetos.titulo}</h2>
      <p className="lead projetos__texto">{projetos.texto}</p>
    </div>
  );
}

/**
 * Galeria dirigida pelo scroll: a seção prende e os cards deslizam na
 * horizontal enquanto o usuário rola na vertical (Scroll X Carousel —
 * YoucefBnm, MIT: https://21st.dev/@youcefbnm/components/scroll-x-carousel).
 * A altura da pista é medida: largura do trilho menos a da janela, mais
 * uma tela — exatamente o scroll necessário pra atravessar tudo.
 *
 * Celular e movimento reduzido: sem prender nada. No celular vira um
 * carrossel nativo de arrastar; no desktop com movimento reduzido, grade.
 */
export default function Projetos() {
  const desktop = useMidia(DESKTOP);
  const ponteiroFino = useMidia(PONTEIRO_FINO);
  const semMovimento = useReducedMotion();
  const horizontal = desktop && !semMovimento;
  const interativo = horizontal && ponteiroFino;

  const pista = useRef(null);
  const trilho = useRef(null);
  const distancia = useRef(0);
  const [altura, setAltura] = useState(null);
  const [atual, setAtual] = useState(0);
  const [aberto, setAberto] = useState(null);

  const total = projetos.itens.length;

  useLayoutEffect(() => {
    if (!horizontal) return undefined;
    const medir = () => {
      const t = trilho.current;
      if (!t) return;
      distancia.current = Math.max(t.scrollWidth - window.innerWidth, 0);
      setAltura(distancia.current + window.innerHeight);
    };
    medir();
    const observador = new ResizeObserver(medir);
    observador.observe(trilho.current);
    window.addEventListener('resize', medir);
    return () => {
      observador.disconnect();
      window.removeEventListener('resize', medir);
    };
  }, [horizontal]);

  const { scrollYProgress } = useScroll({ target: pista, offset: ['start start', 'end end'] });
  const x = useTransform(scrollYProgress, (p) => -p * distancia.current);

  useMotionValueEvent(scrollYProgress, 'change', (p) => {
    const indice = Math.min(total - 1, Math.max(0, Math.round(p * total - 0.35)));
    setAtual((a) => (a === indice ? a : indice));
  });

  const abrirCase = useCallback((item) => setAberto(item), []);
  const fecharCase = useCallback(() => setAberto(null), []);

  const cartoes = projetos.itens.map((item, i) => (
    <CartaoProjeto
      key={item.cliente}
      item={item}
      indice={i}
      interativo={interativo}
      progresso={horizontal ? scrollYProgress : undefined}
      aoAbrirCase={abrirCase}
    />
  ));

  const modal = (
    <AnimatePresence>
      {aberto && <ModalCase key={aberto.cliente} item={aberto} aoFechar={fecharCase} />}
    </AnimatePresence>
  );

  if (!horizontal) {
    return (
      <SecaoComTransicao id="projetos" data-brasa="projetos" className="faixa projetos projetos--lista">
        <div className="quadro">
          <Reveal>
            <Abertura />
          </Reveal>
        </div>
        <div className="projetos__carrossel">{cartoes}</div>
        {modal}
      </SecaoComTransicao>
    );
  }

  return (
    <SecaoComTransicao
      id="projetos"
      data-brasa="projetos"
      className="projetos projetos--horizontal"
      comEscala={false}
    >
      <div ref={pista} className="projetos__pista" style={altura ? { height: altura } : undefined}>
        <div className="projetos__fixo">
          <motion.div ref={trilho} className="projetos__trilho" style={{ x }}>
            <Reveal>
              <Abertura />
              <p className="projetos__dica">
                {projetos.dica}
                <ArrowRight size={15} strokeWidth={1.8} />
              </p>
            </Reveal>
            {cartoes}
          </motion.div>

          <div className="quadro projetos__rodape" aria-hidden="true">
            <span className="projetos__contador">
              <strong>{String(atual + 1).padStart(2, '0')}</strong> / {String(total).padStart(2, '0')}
            </span>
            <span className="projetos__barra">
              <motion.span className="projetos__barra-preenchida" style={{ scaleX: scrollYProgress }} />
            </span>
          </div>
        </div>
      </div>
      {modal}
    </SecaoComTransicao>
  );
}
