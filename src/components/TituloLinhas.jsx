import { motion, useReducedMotion } from 'framer-motion';
import { linhaMascarada, janelaCurta } from '../lib/animacoes';
import './TituloLinhas.css';

/**
 * Título grande em que cada linha sobe de dentro de uma máscara.
 * Recebe o título como lista de linhas: [{ texto, destaque }].
 * A linha com `destaque` sai em terracota itálico e recuada — é o único
 * ponto de cor do bloco.
 *
 * @param {boolean} imediato - anima ao carregar (hero) em vez de esperar o scroll
 */
export default function TituloLinhas({
  linhas,
  como: Tag = 'h2',
  className = 'd-secao',
  imediato = false,
}) {
  const semMovimento = useReducedMotion();

  if (semMovimento) {
    return (
      <Tag className={`titulo-linhas ${className}`}>
        {linhas.map((linha) => (
          <span
            key={linha.texto}
            className={`titulo-linhas__linha${linha.destaque ? ' titulo-linhas__linha--realce' : ''}`}
          >
            <span className={linha.destaque ? 'realce' : undefined}>{linha.texto}</span>
          </span>
        ))}
      </Tag>
    );
  }

  const disparo = imediato
    ? { animate: 'visivel' }
    : { whileInView: 'visivel', viewport: janelaCurta };

  return (
    <Tag className={`titulo-linhas ${className}`}>
      {linhas.map((linha, i) => (
        <span
          key={linha.texto}
          className={`titulo-linhas__linha${linha.destaque ? ' titulo-linhas__linha--realce' : ''}`}
        >
          <motion.span
            className={`titulo-linhas__interna${linha.destaque ? ' realce' : ''}`}
            variants={linhaMascarada}
            custom={i}
            initial="oculto"
            {...disparo}
          >
            {linha.texto}
          </motion.span>
        </span>
      ))}
    </Tag>
  );
}
