import { motion, useReducedMotion } from 'framer-motion';
import { linhaMascarada, janelaCurta } from '../lib/animacoes';
import './TituloLinhas.css';

/**
 * Título grande em que cada linha sobe de dentro de uma máscara.
 * Recebe o título como lista de linhas: [{ texto, destaque }].
 * A linha com `destaque` sai em terracota e recuada.
 *
 * O gatilho fica no elemento do título, nunca na linha de dentro: a linha
 * nasce deslocada para fora da máscara, que tem overflow hidden, e o
 * IntersectionObserver recorta a interseção pelo clip do ancestral. Observada
 * nela mesma, a linha nunca conta como visível e a revelação jamais dispara,
 * deixando o título invisível na página.
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

  const Envoltorio = motion[Tag] ?? motion.h2;
  const disparo = imediato
    ? { animate: 'visivel' }
    : { whileInView: 'visivel', viewport: janelaCurta };

  return (
    <Envoltorio className={`titulo-linhas ${className}`} initial="oculto" {...disparo}>
      {linhas.map((linha, i) => (
        <span
          key={linha.texto}
          className={`titulo-linhas__linha${linha.destaque ? ' titulo-linhas__linha--realce' : ''}`}
        >
          <motion.span
            className={`titulo-linhas__interna${linha.destaque ? ' realce' : ''}`}
            variants={linhaMascarada}
            custom={i}
          >
            {linha.texto}
          </motion.span>
        </span>
      ))}
    </Envoltorio>
  );
}
