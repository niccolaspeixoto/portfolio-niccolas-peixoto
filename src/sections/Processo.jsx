import { motion } from 'framer-motion';
import Reveal from '../components/Reveal';
import { cascata, filho, janela } from '../lib/animacoes';
import { processo } from '../data/conteudo';
import './Processo.css';

export default function Processo() {
  return (
    <section id="processo" className="faixa processo">
      <div className="quadro">
        <Reveal className="processo__cabecalho">
          <p className="olho">{processo.olho}</p>
          <h2 className="d-secao processo__titulo">{processo.titulo}</h2>
        </Reveal>

        {/* Cada etapa desce um degrau em relação à anterior: a própria linha
            do topo dos blocos desenha a progressão. */}
        <motion.ol
          className="processo__etapas"
          variants={cascata}
          initial="oculto"
          whileInView="visivel"
          viewport={janela}
        >
          {processo.itens.map((item) => (
            <motion.li className="etapa" key={item.n} variants={filho}>
              <div className="etapa__cabeca">
                <span className="etapa__n">{item.n}</span>
                <span className="etapa__prazo">{item.prazo}</span>
              </div>

              <h3 className="etapa__titulo">{item.titulo}</h3>
              <p className="etapa__texto">{item.texto}</p>
            </motion.li>
          ))}
        </motion.ol>
      </div>
    </section>
  );
}
