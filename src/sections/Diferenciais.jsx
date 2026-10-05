import { useRef } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import Reveal from '../components/Reveal';
import SecaoComTransicao from '../components/SecaoComTransicao';
import { useBrilhoSeguidor } from '../lib/useBrilhoSeguidor';
import { fioCresce, janela, SUAVE } from '../lib/animacoes';
import { diferenciais } from '../data/conteudo';
import './Diferenciais.css';

/* Entrada com desfoque (Blur Fade — Dillion Verma / Magic UI, MIT:
   https://21st.dev/@dillionverma/components/blur-fade). Blur só na entrada,
   uma vez, em bloco pequeno — não é animação contínua. */
const desfocado = {
  oculto: { opacity: 0, y: 20, filter: 'blur(10px)' },
  visivel: (atraso = 0) => ({
    opacity: 1,
    y: 0,
    filter: 'blur(0px)',
    transition: { duration: 0.9, delay: atraso, ease: SUAVE },
  }),
};

function Diferencial({ item, indice }) {
  const ref = useRef(null);
  const semMovimento = useReducedMotion();
  // Spotlight que segue o cursor dentro do item (Card Spotlight — Manu
  // Arora / Aceternity, MIT), com a mesma mola do resto do site.
  useBrilhoSeguidor(ref);

  return (
    <Reveal como="li" className="diferencial" atraso={0.06} variantes={desfocado}>
      {indice > 0 && (
        <motion.span
          className="diferencial__fio"
          aria-hidden="true"
          variants={semMovimento ? undefined : fioCresce}
          initial={semMovimento ? undefined : 'oculto'}
          whileInView={semMovimento ? undefined : 'visivel'}
          viewport={janela}
        />
      )}

      <div ref={ref} className="diferencial__corpo">
        <span className="diferencial__barra" aria-hidden="true" />
        <span className="diferencial__n">{String(indice + 1).padStart(2, '0')}</span>
        <h3 className="diferencial__titulo">{item.titulo}</h3>
        <p className="diferencial__texto">{item.texto}</p>
      </div>
    </Reveal>
  );
}

/**
 * Lista editorial com o título preso à esquerda. Cada ponto acende no
 * hover: brilho seguindo o cursor, barra lateral crescendo, título
 * deslizando — o padrão do Feature Section with Hover Effects (Manu Arora).
 */
export default function Diferenciais() {
  return (
    <SecaoComTransicao data-brasa="diferenciais" className="faixa diferenciais" comEscala={false}>
      <div className="quadro grade diferenciais__grade">
        <div className="diferenciais__titulo-area">
          <Reveal className="diferenciais__fixo">
            <h2 className="d-secao">{diferenciais.titulo}</h2>
          </Reveal>
        </div>

        <ul className="diferenciais__lista">
          {diferenciais.itens.map((item, i) => (
            <Diferencial key={item.titulo} item={item} indice={i} />
          ))}
        </ul>
      </div>
    </SecaoComTransicao>
  );
}
