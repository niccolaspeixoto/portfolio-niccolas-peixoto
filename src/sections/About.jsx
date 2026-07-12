import { motion } from 'framer-motion';
import './About.css';

const TIMELINE = [
  {
    year: '2025',
    title: 'HTML, CSS e JavaScript',
    text: 'Primeiros projetos front-end: interfaces responsivas, boas práticas de semântica e consumo de APIs públicas.',
  },
  {
    year: '2026',
    title: 'React e Node.js',
    text: 'Aplicações modernas com componentes reutilizáveis, hooks, backend próprio e integração com APIs REST.',
  },
  {
    year: '2026',
    title: 'Projetos Full Stack',
    text: 'Aplicações completas: CRUD, autenticação, banco de dados PostgreSQL, deploy e acompanhamento em produção.',
  },
];

export default function About() {
  return (
    <section id="sobre" className="section about">
      <div className="container">
        <div className="about__intro">
          <p className="eyebrow">Sobre mim</p>
          <h2 className="section-title">De curioso a desenvolvedor Full Stack</h2>
          <p className="section-lede">
            Comecei estudando lógica de programação por conta própria e, em pouco tempo,
            passei a construir aplicações completas! Do layout no Figma ao deploy em
            produção. Hoje me sinto confortável navegando entre front-end e back-end,
            sempre buscando escrever código limpo e entender o problema antes da solução.
          </p>
        </div>

        <div className="timeline">
          <div className="timeline__line-track" aria-hidden="true">
            <motion.div
              className="timeline__line-fill"
              initial={{ scaleY: 0 }}
              whileInView={{ scaleY: 1 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 1.1, ease: [0.16, 1, 0.3, 1] }}
            />
          </div>

          {TIMELINE.map((item, i) => (
            <motion.div
              className="timeline__item"
              key={`${item.year}-${item.title}`}
              initial={{ opacity: 0, x: -18 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, amount: 0.5 }}
              transition={{ duration: 0.6, delay: i * 0.15, ease: [0.16, 1, 0.3, 1] }}
            >
              <span className="timeline__dot" />
              <span className="timeline__year">{item.year}</span>
              <h3 className="timeline__title">{item.title}</h3>
              <p className="timeline__text">{item.text}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
