import { motion } from 'framer-motion';
import { ArrowRight, Github, Linkedin, Mail } from 'lucide-react';
import PhotoFrame from '../components/PhotoFrame';
import './Hero.css';

const fadeUp = {
  hidden: { opacity: 0, y: 22 },
  show: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, delay: i * 0.1, ease: [0.16, 1, 0.3, 1] },
  }),
};

export default function Hero() {
  const scrollTo = (href) => (e) => {
    e.preventDefault();
    document.querySelector(href)?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section id="top" className="hero">
      <div className="hero__grid-bg" aria-hidden="true" />
      <div className="container hero__inner">
        <div className="hero__content">
          <motion.p className="eyebrow" custom={0} initial="hidden" animate="show" variants={fadeUp}>
            Disponível para novos projetos
          </motion.p>

          <motion.h1 className="hero__name" custom={1} initial="hidden" animate="show" variants={fadeUp}>
            Niccolas Peixoto
          </motion.h1>

          <motion.p className="hero__role" custom={2} initial="hidden" animate="show" variants={fadeUp}>
            Desenvolvedor Full Stack Júnior
          </motion.p>

          <motion.p className="hero__pitch" custom={3} initial="hidden" animate="show" variants={fadeUp}>
            Construo aplicações web modernas com React e Node.js. Do layout responsivo
            à API em produção. Foco em código organizado, performance e experiências
            que resolvem problemas reais para empresas e clientes.
          </motion.p>

          <motion.div className="hero__actions" custom={4} initial="hidden" animate="show" variants={fadeUp}>
            <a href="#projetos" className="btn btn-primary" onClick={scrollTo('#projetos')}>
              Ver projetos <ArrowRight size={16} />
            </a>
            <a href="#contato" className="btn btn-ghost" onClick={scrollTo('#contato')}>
              Contato
            </a>
            <a
              href="https://github.com/niccolaspeixoto"
              target="_blank"
              rel="noreferrer"
              className="btn btn-icon"
              aria-label="GitHub"
            >
              <Github size={18} />
            </a>
            <a
              href="https://www.linkedin.com/in/niccolas-peixoto/"
              target="_blank"
              rel="noreferrer"
              className="btn btn-icon"
              aria-label="LinkedIn"
            >
              <Linkedin size={18} />
            </a>
          </motion.div>

          <motion.div
            className="hero__stack"
            custom={5}
            initial="hidden"
            animate="show"
            variants={fadeUp}
          >
            <span>React</span>
            <span>Node.js</span>
            <span>PostgreSQL</span>
            <span>REST APIs</span>
          </motion.div>
        </div>

        <motion.div
          className="hero__visual"
          initial={{ opacity: 0, scale: 0.94, y: 24 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
        >
          <PhotoFrame />

          <motion.div
            className="hero__status-card"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.75, ease: [0.16, 1, 0.3, 1] }}
          >
            <div className="hero__status-row">
              <span className="hero__status-dot" />
              <span>status: pronto para novos desafios</span>
            </div>
            <div className="hero__status-row hero__status-row--muted">
              <Mail size={13} />
              <span>resposta em até 24h</span>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
