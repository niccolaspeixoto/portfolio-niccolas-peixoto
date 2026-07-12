import { motion } from 'framer-motion';
import './Process.css';

const STEPS = [
  {
    n: '01',
    title: 'Entendimento do problema',
    text: 'Converso com o cliente para entender o objetivo real por trás do pedido — não só o que precisa ser feito, mas por quê.',
  },
  {
    n: '02',
    title: 'Planejamento da solução',
    text: 'Defino estrutura, tecnologias e etapas antes de escrever a primeira linha de código, para evitar retrabalho.',
  },
  {
    n: '03',
    title: 'Desenvolvimento',
    text: 'Construo em ciclos curtos, com commits organizados e validações constantes ao longo do processo.',
  },
  {
    n: '04',
    title: 'Testes e deploy',
    text: 'Testo fluxos e responsividade, corrijo pontas soltas e coloco a aplicação no ar em produção.',
  },
];

export default function Process() {
  return (
    <section id="processo" className="section process">
      <div className="container">
        <p className="eyebrow">Como eu trabalho</p>
        <h2 className="section-title">Um processo simples, sem surpresas</h2>
        <p className="section-lede process__lede">
          Cada etapa existe para reduzir risco e manter você informado sobre o
          andamento do projeto do início ao fim.
        </p>

        <div className="process__grid">
          {STEPS.map((step, i) => (
            <motion.div
              className="process-step"
              key={step.n}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.4 }}
              transition={{ duration: 0.55, delay: i * 0.1, ease: [0.16, 1, 0.3, 1] }}
            >
              <span className="process-step__n">{step.n}</span>
              <h3 className="process-step__title">{step.title}</h3>
              <p className="process-step__text">{step.text}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
