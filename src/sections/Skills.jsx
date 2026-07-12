import { motion } from 'framer-motion';
import {
  Atom, Braces, FileCode2, Palette,
  Server, Layers, Database, Webhook,
  GitBranch, Container, Send, Cloud,
} from 'lucide-react';
import './Skills.css';

const GROUPS = [
  {
    label: 'Frontend',
    items: [
      { name: 'React', desc: 'Interfaces em componentes', icon: Atom },
      { name: 'JavaScript', desc: 'ES6+ no dia a dia', icon: Braces },
      { name: 'HTML5', desc: 'Estrutura semântica', icon: FileCode2 },
      { name: 'CSS3', desc: 'Layout e responsividade', icon: Palette },
    ],
  },
  {
    label: 'Backend',
    items: [
      { name: 'Node.js', desc: 'Servidor e lógica de API', icon: Server },
      { name: 'Express', desc: 'Rotas e middlewares', icon: Layers },
      { name: 'Prisma', desc: 'ORM tipado para SQL', icon: Database },
      { name: 'PostgreSQL', desc: 'Banco de dados relacional', icon: Webhook },
    ],
  },
  {
    label: 'Ferramentas',
    items: [
      { name: 'Git', desc: 'Controle de versão', icon: GitBranch },
      { name: 'Docker', desc: 'Ambientes consistentes', icon: Container },
      { name: 'Postman', desc: 'Testes de API', icon: Send },
      { name: 'Vercel', desc: 'Deploy e CI/CD', icon: Cloud },
    ],
  },
];

const fadeUp = {
  hidden: { opacity: 0, y: 16 },
  show: (i) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, delay: i * 0.05, ease: [0.16, 1, 0.3, 1] },
  }),
};

export default function Skills() {
  return (
    <section id="tecnologias" className="section skills">
      <div className="container">
        <p className="eyebrow">Tecnologias</p>
        <h2 className="section-title">Ferramentas que uso para entregar</h2>
        <p className="section-lede skills__lede">
          Uma stack enxuta, focada no que realmente importa para colocar um produto
          no ar com qualidade. Do primeiro componente ao banco de dados.
        </p>

        <div className="skills__groups">
          {GROUPS.map((group) => (
            <div className="skills__group" key={group.label}>
              <h3 className="skills__group-label">{group.label}</h3>
              <div className="skills__grid">
                {group.items.map((item, i) => {
                  const Icon = item.icon;
                  return (
                    <motion.div
                      className="skill-card"
                      key={item.name}
                      custom={i}
                      initial="hidden"
                      whileInView="show"
                      viewport={{ once: true, amount: 0.4 }}
                      variants={fadeUp}
                      whileHover={{ y: -4 }}
                    >
                      <span className="skill-card__icon">
                        <Icon size={18} strokeWidth={1.6} />
                      </span>
                      <span className="skill-card__name">{item.name}</span>
                      <span className="skill-card__desc">{item.desc}</span>
                    </motion.div>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
