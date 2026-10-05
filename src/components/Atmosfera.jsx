import { useEffect, useRef } from 'react';
import { motion, useScroll, useTransform, useReducedMotion } from 'framer-motion';
import './Atmosfera.css';

/* Onde a brasa fica quando cada seção está centrada na tela. x/y em fração
   da janela, sx/sy é a escala em cada eixo (processo estica na vertical pra
   virar o feixe da timeline), o é a intensidade. A chave casa com o
   atributo data-brasa de cada seção. */
const PARADAS = {
  topo: { x: 0.4, y: 0.48, sx: 1.15, sy: 1.15, o: 0.9 },
  demonstracao: { x: 0.5, y: 0.72, sx: 1.7, sy: 1.1, o: 0.8 },
  solucoes: { x: 0.78, y: 0.5, sx: 0.95, sy: 0.95, o: 0.5 },
  porque: { x: 0.5, y: 0.6, sx: 1.35, sy: 1, o: 0.55 },
  sistema: { x: 0.24, y: 0.42, sx: 1.05, sy: 1.05, o: 0.5 },
  projetos: { x: 0.62, y: 0.64, sx: 1.35, sy: 1.1, o: 0.5 },
  faixa: { x: 0.5, y: 0.5, sx: 1.9, sy: 0.55, o: 0.6 },
  diferenciais: { x: 0.2, y: 0.4, sx: 0.95, sy: 0.95, o: 0.45 },
  processo: { x: 0.13, y: 0.52, sx: 0.32, sy: 2, o: 0.65 },
  contato: { x: 0.5, y: 0.2, sx: 1.55, sy: 1, o: 1 },
};

const INICIAL = PARADAS.topo;

/**
 * A brasa: uma luz terracota só, presa à janela, que atravessa o site
 * inteiro conforme a página rola — nasce atrás do título do hero, desce
 * pro painel da demonstração, vira o feixe da timeline e termina como a
 * luz da lâmpada na chamada final. É o fio que costura as seções numa peça
 * só, em vez de onze blocos empilhados.
 */
function Brasa() {
  const semMovimento = useReducedMotion();
  const paradas = useRef([]);
  const janela = useRef({ w: 1, h: 1 });
  const { scrollY } = useScroll();

  useEffect(() => {
    let quadro = null;

    const medir = () => {
      quadro = null;
      const vh = window.innerHeight;
      const maximo = Math.max(document.documentElement.scrollHeight - vh, 0);
      janela.current = { w: window.innerWidth, h: vh };

      paradas.current = [...document.querySelectorAll('[data-brasa]')]
        .map((el) => {
          const valores = PARADAS[el.dataset.brasa];
          if (!valores) return null;
          const caixa = el.getBoundingClientRect();
          const topo = caixa.top + window.scrollY;
          const centrada = Math.min(Math.max(topo + caixa.height / 2 - vh / 2, 0), maximo);
          return { s: centrada, ...valores };
        })
        .filter(Boolean)
        .sort((a, b) => a.s - b.s);
    };

    const agendar = () => {
      if (quadro === null) quadro = requestAnimationFrame(medir);
    };

    medir();
    const observador = new ResizeObserver(agendar);
    observador.observe(document.body);
    window.addEventListener('resize', agendar);
    window.addEventListener('load', agendar);

    return () => {
      observador.disconnect();
      window.removeEventListener('resize', agendar);
      window.removeEventListener('load', agendar);
      if (quadro !== null) cancelAnimationFrame(quadro);
    };
  }, []);

  const valor = (y, chave) => {
    const p = paradas.current;
    if (p.length === 0) return INICIAL[chave];
    if (y <= p[0].s) return p[0][chave];
    const ultima = p[p.length - 1];
    if (y >= ultima.s) return ultima[chave];

    let i = 0;
    while (i < p.length - 2 && y > p[i + 1].s) i += 1;
    const a = p[i];
    const b = p[i + 1];
    const t = (y - a.s) / (b.s - a.s || 1);
    const suave = t * t * (3 - 2 * t);
    return a[chave] + (b[chave] - a[chave]) * suave;
  };

  const x = useTransform(scrollY, (y) => valor(y, 'x') * janela.current.w);
  const y = useTransform(scrollY, (v) => valor(v, 'y') * janela.current.h);
  const scaleX = useTransform(scrollY, (v) => valor(v, 'sx'));
  const scaleY = useTransform(scrollY, (v) => valor(v, 'sy'));
  const opacity = useTransform(scrollY, (v) => valor(v, 'o'));

  if (semMovimento) {
    return <div className="brasa brasa--estatica" aria-hidden="true" />;
  }

  return (
    <motion.div className="brasa" style={{ x, y, scaleX, scaleY, opacity }} aria-hidden="true">
      <span className="brasa__nucleo" />
    </motion.div>
  );
}

function BarraProgresso() {
  const { scrollYProgress } = useScroll();
  return (
    <motion.div className="barra-progresso" style={{ scaleX: scrollYProgress }} aria-hidden="true" />
  );
}

/** Camadas globais: brasa, barra de leitura e grão de filme. */
export default function Atmosfera() {
  return (
    <>
      <Brasa />
      <BarraProgresso />
      <div className="grao" aria-hidden="true" />
    </>
  );
}
