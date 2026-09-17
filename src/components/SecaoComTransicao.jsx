import { useRef } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { useTransicaoSaida } from '../lib/useTransicaoSaida';

/**
 * Substitui a tag <section> pura nas seções que devem encolher/escurecer
 * de leve ao serem cobertas pela próxima, dando sensação de camadas se
 * sobrepondo em vez de seções só empilhando.
 *
 * @param {boolean} comEscala - false nas seções que têm algo com
 *   `position: sticky` lá dentro (ver useTransicaoSaida.js pro motivo).
 */
export default function SecaoComTransicao({
  children,
  className,
  id,
  comEscala = true,
  ...resto
}) {
  const ref = useRef(null);
  const semMovimento = useReducedMotion();
  const { opacidade, escala } = useTransicaoSaida(ref, { comEscala });

  if (semMovimento) {
    return (
      <section id={id} className={className} {...resto}>
        {children}
      </section>
    );
  }

  return (
    <motion.section
      id={id}
      className={className}
      ref={ref}
      style={{ opacity: opacidade, scale: escala }}
      {...resto}
    >
      {children}
    </motion.section>
  );
}
