import { useRef } from 'react';
import { motion, useInView, useReducedMotion, useScroll, useTransform } from 'framer-motion';
import Reveal from '../components/Reveal';
import Adiado from '../components/Adiado';
import SecaoComTransicao from '../components/SecaoComTransicao';
import VisualEtapa from './processo/VisuaisEtapa';
import { processo } from '../data/conteudo';
import './Processo.css';

function Etapa({ item }) {
  const ref = useRef(null);
  const naTela = useInView(ref, { amount: 0.35 });
  const noCentro = useInView(ref, { margin: '-42% 0px -42% 0px' });

  return (
    <li ref={ref} className={`etapa${noCentro ? ' etapa--ativa' : ''}`}>
      <div className="etapa__fixo">
        <span className="etapa__marca" aria-hidden="true" />
        <span className="etapa__n">{item.n}</span>
        <h3 className="etapa__titulo">{item.titulo}</h3>
        <span className="etapa__prazo">{item.prazo}</span>
      </div>

      <div className="etapa__conteudo">
        <Reveal>
          <p className="etapa__texto">{item.texto}</p>
        </Reveal>
        <Reveal atraso={0.12} className="etapa__visual">
          <Adiado className="etapa__visual-adiado">
            <VisualEtapa visual={item.visual} ativo={naTela} />
          </Adiado>
        </Reveal>
      </div>
    </li>
  );
}

/**
 * Timeline (Manu Arora / Aceternity, MIT:
 * https://21st.dev/@manuarora700/components/timeline): o feixe terracota
 * enche a linha conforme a página desce, com um ponto aceso na ponta — é a
 * brasa do site virando trilho. O título de cada etapa fica preso enquanto
 * o conteúdo dela passa.
 */
export default function Processo() {
  const linha = useRef(null);
  const semMovimento = useReducedMotion();

  const { scrollYProgress } = useScroll({ target: linha, offset: ['start 50%', 'end 60%'] });
  const topoPonta = useTransform(scrollYProgress, (v) => `${v * 100}%`);

  return (
    <SecaoComTransicao id="processo" data-brasa="processo" className="faixa processo" comEscala={false}>
      <div className="quadro">
        <Reveal className="processo__cabecalho">
          <h2 className="d-secao">{processo.titulo}</h2>
        </Reveal>

        <div className="linha-tempo" ref={linha}>
          <div className="linha-tempo__trilho" aria-hidden="true">
            <motion.span
              className="linha-tempo__feixe"
              style={{ scaleY: semMovimento ? 1 : scrollYProgress }}
            />
            {!semMovimento && <motion.span className="linha-tempo__ponta" style={{ top: topoPonta }} />}
          </div>

          <ol className="linha-tempo__etapas">
            {processo.itens.map((item) => (
              <Etapa key={item.n} item={item} />
            ))}
          </ol>
        </div>
      </div>
    </SecaoComTransicao>
  );
}
