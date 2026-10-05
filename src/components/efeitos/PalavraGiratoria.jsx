import { useEffect, useState } from 'react';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import { SUAVE } from '../../lib/animacoes';
import './efeitos.css';

/* Inspirado no Container Text Flip (Manu Arora / Aceternity — MIT):
   https://21st.dev/@manuarora700/components/container-text-flip
   A largura é sempre a da palavra mais longa (todas empilhadas, invisíveis,
   na mesma célula de grid), então trocar de palavra não empurra nada. */

/**
 * @param {string[]} palavras - a primeira é a do estado parado
 * @param {number} atrasoEntrada - segundos até a primeira palavra subir
 * @param {number} intervalo - ms entre trocas
 */
export default function PalavraGiratoria({ palavras, atrasoEntrada = 0, intervalo = 2400 }) {
  const semMovimento = useReducedMotion();
  const [indice, setIndice] = useState(0);
  const [girando, setGirando] = useState(false);

  useEffect(() => {
    if (semMovimento) return undefined;
    const t = setTimeout(() => setGirando(true), (atrasoEntrada + 1.4) * 1000);
    return () => clearTimeout(t);
  }, [semMovimento, atrasoEntrada]);

  useEffect(() => {
    if (!girando) return undefined;
    const id = setInterval(() => setIndice((i) => (i + 1) % palavras.length), intervalo);
    return () => clearInterval(id);
  }, [girando, intervalo, palavras.length]);

  if (semMovimento) {
    return <span aria-hidden="true">{palavras[0]}</span>;
  }

  return (
    <span className="palavra-giratoria" aria-hidden="true">
      {palavras.map((p) => (
        <span key={p} className="palavra-giratoria__medida">
          {p}
        </span>
      ))}

      {/* Modo padrão (sync): a palavra que sai e a que entra dividem a
          mesma célula de grid ao mesmo tempo, uma subindo pra fora e a
          outra subindo pra dentro da máscara. */}
      <AnimatePresence initial>
        {/* A palavra que sai também apaga: a máscara é mais alta que as
            maiúsculas (line-height apertado do display), então sem o fade
            uma fatia dela atravessaria a linha de cima na subida. */}
        <motion.span
          key={palavras[indice]}
          className="palavra-giratoria__atual"
          initial={{ y: '100%', opacity: 0 }}
          animate={{ y: '0%', opacity: 1 }}
          exit={{ y: '-100%', opacity: 0, transition: { duration: 0.32, ease: [0.7, 0, 0.84, 0] } }}
          transition={
            girando
              ? { duration: 0.6, ease: SUAVE }
              : { type: 'spring', stiffness: 170, damping: 24, delay: atrasoEntrada }
          }
        >
          {palavras[indice]}
        </motion.span>
      </AnimatePresence>
    </span>
  );
}
