import { motion } from 'framer-motion';
import { ExternalLink, Github, ImagePlus, Plus } from 'lucide-react';
import './Projects.css';

const PROJECTS = [
  {
    name: 'Arena Pro Beach',
    description:
      'Landing page criada para um complexo esportivo, focada em apresentar os serviços, melhorar a experiência do usuário e converter visitantes em clientes.',
    tech: ['HTML', 'CSS', 'JavaScript'],
    liveUrl: 'https://arenaprobeach.com/',
    repoUrl: '#',
    // Coloque o print em public/projects/ e aponte o caminho aqui.
    // Ex: image: '/projects/arena-pro-beach.jpg',
    image:'../../public/projects/probeach-desktop.PNG',
  },
  {
    name: 'Football Store CRUD',
    description:
      'Aplicação full stack para gerenciamento de produtos esportivos, com CRUD completo e comunicação entre front-end e back-end.',
    tech: ['React', 'Node.js', 'Prisma', 'PostgreSQL'],
    liveUrl: 'https://elite-boots-store.vercel.app/',
    repoUrl: '#',
    image: '../../public/projects/desktop-crud.png',
  },
];

export default function Projects() {
  return (
    <section id="projetos" className="section projects">
      <div className="container">
        <p className="eyebrow">Projetos</p>
        <h2 className="section-title">Aplicações reais, do zero ao deploy</h2>
        <p className="section-lede projects__lede">
          Uma seleção de projetos que mostram como transformo um problema em uma
          aplicação funcional — com atenção ao código, à interface e à experiência de quem usa.
        </p>

        <div className="projects__grid">
          {PROJECTS.map((project, i) => (
            <motion.article
              className="project-card"
              key={project.name}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.25 }}
              transition={{ duration: 0.6, delay: i * 0.1, ease: [0.16, 1, 0.3, 1] }}
            >
              <div className="project-card__media">
                {project.image ? (
                  <img
                    src={project.image}
                    alt={`Print da aplicação ${project.name}`}
                    loading="lazy"
                  />
                ) : (
                  <>
                    <ImagePlus size={26} strokeWidth={1.3} />
                    <span>Print da aplicação</span>
                  </>
                )}
              </div>

              <div className="project-card__body">
                <h3 className="project-card__name">{project.name}</h3>
                <p className="project-card__desc">{project.description}</p>

                <div className="project-card__tags">
                  {project.tech.map((t) => (
                    <span key={t}>{t}</span>
                  ))}
                </div>

                <div className="project-card__actions">
                  <a href={project.liveUrl} className="btn btn-ghost" target="_blank" rel="noreferrer">
                    Ver projeto <ExternalLink size={15} />
                  </a>
                  <a href={project.repoUrl} className="btn btn-icon" target="_blank" rel="noreferrer" aria-label="Repositório no GitHub">
                    <Github size={17} />
                  </a>
                </div>
              </div>
            </motion.article>
          ))}

          <motion.div
            className="project-card project-card--empty"
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.25 }}
            transition={{ duration: 0.6, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
          >
            <Plus size={22} strokeWidth={1.3} />
            <span>Próximo projeto em breve</span>
          </motion.div>
        </div>
      </div>
    </section>
  );
}