import { motion, useReducedMotion } from 'framer-motion';
import { revelar, janela } from '../lib/animacoes';

/**
 * Envolve qualquer bloco e faz ele entrar quando chega na tela.
 * Quem pediu menos movimento no sistema recebe o conteúdo parado.
 *
 * @param {string} como - 'div' | 'section' | 'li' | ...
 * @param {number} atraso - segundos de atraso, para escalonar irmãos
 */
export default function Reveal({
  children,
  como = 'div',
  atraso = 0,
  variantes = revelar,
  className,
  ...resto
}) {
  const semMovimento = useReducedMotion();
  const Tag = motion[como] ?? motion.div;

  if (semMovimento) {
    const Simples = como;
    return (
      <Simples className={className} {...resto}>
        {children}
      </Simples>
    );
  }

  return (
    <Tag
      className={className}
      variants={variantes}
      custom={atraso}
      initial="oculto"
      whileInView="visivel"
      viewport={janela}
      {...resto}
    >
      {children}
    </Tag>
  );
}
