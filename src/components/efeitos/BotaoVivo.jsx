import { useRef } from 'react';
import { motion, useMotionValue, useSpring, useReducedMotion } from 'framer-motion';
import { useBrilhoSeguidor } from '../../lib/useBrilhoSeguidor';
import { useMidia, PONTEIRO_FINO } from '../../lib/useMidia';
import './efeitos.css';

/* Borda em movimento inspirada no Moving Border (Manu Arora / Aceternity —
   MIT): https://21st.dev/@manuarora700/components/moving-border
   Aqui é um conic-gradient girando (@property), sem SVG medindo o
   perímetro a cada frame. Somado ao brilho que segue o cursor (que o site
   já tinha) e a um leve magnetismo: o botão puxa em direção ao ponteiro. */

const MOLA = { stiffness: 210, damping: 17, mass: 0.6 };

/**
 * Link-botão principal (WhatsApp). Sem magnetismo no toque e com movimento
 * reduzido — lá ele é só um botão com a borda acesa.
 */
export default function BotaoVivo({ href, children, className = '', magnetico = true, ...resto }) {
  const ref = useRef(null);
  const semMovimento = useReducedMotion();
  const fino = useMidia(PONTEIRO_FINO);
  const ativo = magnetico && fino && !semMovimento;

  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const molaX = useSpring(x, MOLA);
  const molaY = useSpring(y, MOLA);

  useBrilhoSeguidor(ref);

  const mover = (evento) => {
    if (!ativo || !ref.current) return;
    const caixa = ref.current.getBoundingClientRect();
    // Centro sem o deslocamento atual, senão o botão "foge" de si mesmo.
    const cx = caixa.left + caixa.width / 2 - molaX.get();
    const cy = caixa.top + caixa.height / 2 - molaY.get();
    x.set((evento.clientX - cx) * 0.3);
    y.set((evento.clientY - cy) * 0.4);
  };

  const soltar = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.a
      ref={ref}
      href={href}
      className={`botao botao--cheio botao--brilho botao--vivo ${className}`}
      style={ativo ? { x: molaX, y: molaY } : undefined}
      onPointerMove={mover}
      onPointerLeave={soltar}
      {...resto}
    >
      <span className="botao-vivo__borda" aria-hidden="true">
        <span className="botao-vivo__giro" />
      </span>
      {children}
    </motion.a>
  );
}
