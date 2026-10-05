import { useEffect, useId, useRef, useState } from 'react';
import { motion, useInView, useReducedMotion } from 'framer-motion';
import { useMidia, PONTEIRO_FINO } from '../lib/useMidia';

/**
 * Letreiro gigante vazado no rodapé (Text Hover Effect — Manu Arora /
 * Aceternity, MIT: https://21st.dev/@manuarora700/components/text-hover-effect).
 * O contorno se desenha ao entrar na tela; com o mouse em cima, um círculo
 * de luz terracota acende as letras onde o cursor passa.
 *
 * O viewBox é medido do próprio texto (getBBox) depois que a fonte carrega,
 * então o letreiro ocupa a largura toda sem cortar letra.
 */
export default function Letreiro({ texto }) {
  const id = useId().replace(/:/g, '');
  const svg = useRef(null);
  const medida = useRef(null);
  const luz = useRef(null);
  const semMovimento = useReducedMotion();
  const ponteiroFino = useMidia(PONTEIRO_FINO);
  const interativo = ponteiroFino && !semMovimento;
  const naTela = useInView(svg, { once: true, amount: 0.3 });
  const [caixa, setCaixa] = useState({ x: 0, y: -170, w: 1100, h: 200 });
  const [sobre, setSobre] = useState(false);
  const maiusculo = texto.toUpperCase();

  useEffect(() => {
    let vivo = true;
    const medir = () => {
      if (!vivo || !medida.current) return;
      const b = medida.current.getBBox();
      const folga = 8;
      setCaixa({ x: b.x - folga, y: b.y - folga, w: b.width + folga * 2, h: b.height + folga * 2 });
    };
    document.fonts?.ready.then(medir);
    medir();
    return () => {
      vivo = false;
    };
  }, [maiusculo]);

  const mover = (e) => {
    if (!interativo || !luz.current) return;
    const r = svg.current.getBoundingClientRect();
    luz.current.setAttribute('cx', `${((e.clientX - r.left) / r.width) * 100}%`);
    luz.current.setAttribute('cy', `${((e.clientY - r.top) / r.height) * 100}%`);
  };

  const viewBox = `${caixa.x} ${caixa.y} ${caixa.w} ${caixa.h}`;
  const desenhado = naTela || semMovimento;

  return (
    <svg
      ref={svg}
      className={`letreiro${interativo ? ' letreiro--interativo' : ''}${sobre ? ' letreiro--aceso' : ''}`}
      viewBox={viewBox}
      onPointerMove={mover}
      onPointerEnter={() => setSobre(true)}
      onPointerLeave={() => setSobre(false)}
      aria-hidden="true"
    >
      <defs>
        <linearGradient id={`cor-${id}`} x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor="#8a3612" />
          <stop offset="35%" stopColor="#c4501f" />
          <stop offset="65%" stopColor="#e8763b" />
          <stop offset="100%" stopColor="#e8c9a8" />
        </linearGradient>
        <radialGradient id={`luz-${id}`} ref={luz} cx="50%" cy="50%" r="24%">
          <stop offset="0%" stopColor="white" />
          <stop offset="100%" stopColor="black" />
        </radialGradient>
        <mask id={`mascara-${id}`}>
          <rect x={caixa.x} y={caixa.y} width={caixa.w} height={caixa.h} fill={`url(#luz-${id})`} />
        </mask>
      </defs>

      {/* Texto invisível só pra medir a caixa. */}
      <text ref={medida} x="0" y="0" className="letreiro__texto letreiro__medida">
        {maiusculo}
      </text>

      <motion.text
        x="0"
        y="0"
        className="letreiro__texto letreiro__contorno"
        initial={{ strokeDashoffset: semMovimento ? 0 : 6000 }}
        animate={{ strokeDashoffset: desenhado ? 0 : 6000 }}
        transition={{ duration: 4, ease: 'easeInOut' }}
      >
        {maiusculo}
      </motion.text>

      <text
        x="0"
        y="0"
        className="letreiro__texto letreiro__aceso"
        stroke={`url(#cor-${id})`}
        mask={interativo ? `url(#mascara-${id})` : undefined}
      >
        {maiusculo}
      </text>
    </svg>
  );
}
