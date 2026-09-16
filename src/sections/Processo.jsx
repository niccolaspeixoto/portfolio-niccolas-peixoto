import { useRef } from 'react';
import { motion, useScroll, useTransform, useReducedMotion } from 'framer-motion';
import Reveal from '../components/Reveal';
import { processo } from '../data/conteudo';
import './Processo.css';

/**
 * As quatro etapas numa linha vertical que se desenha conforme a página
 * desce. A numeração fica aqui porque a ordem das etapas é a informação:
 * nas outras seções ela saiu.
 */
export default function Processo() {
  const trilha = useRef(null);
  const semMovimento = useReducedMotion();

  const { scrollYProgress } = useScroll({
    target: trilha,
    offset: ['start 72%', 'end 82%'],
  });
  const altura = useTransform(scrollYProgress, [0, 1], ['0%', '100%']);

  return (
    <section id="processo" className="faixa processo">
      <div className="quadro">
        <Reveal className="processo__cabecalho">
          <h2 className="d-secao">{processo.titulo}</h2>
        </Reveal>

        <ol className="processo__trilha" ref={trilha}>
          {/* Fio apagado ao fundo e, por cima, o fio terracota que cresce. */}
          <span className="processo__fio" aria-hidden="true">
            <motion.span
              className="processo__fio-ativo"
              style={semMovimento ? { height: '100%' } : { height: altura }}
            />
          </span>

          {processo.itens.map((item, i) => (
            <Reveal como="li" key={item.n} className="etapa" atraso={i * 0.06}>
              <span className="etapa__marca" aria-hidden="true" />

              <div className="etapa__cabeca">
                <span className="etapa__n">{item.n}</span>
                <span className="etapa__prazo">{item.prazo}</span>
              </div>

              <h3 className="etapa__titulo">{item.titulo}</h3>
              <p className="etapa__texto">{item.texto}</p>
            </Reveal>
          ))}
        </ol>
      </div>
    </section>
  );
}
