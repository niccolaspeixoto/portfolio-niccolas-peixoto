import { motion } from 'framer-motion';
import { Github, Linkedin, Mail, MessageCircle, ArrowUpRight } from 'lucide-react';
import './Contact.css';

const LINKS = [
  { label: 'LinkedIn', value: 'linkedin.com/in/niccolaspeixoto', href: 'https://linkedin.com/', icon: Linkedin },
  { label: 'GitHub', value: 'github.com/niccolaspeixoto', href: 'https://github.com/niccolaspeixoto', icon: Github },
  { label: 'E-mail', value: 'niccolaspeixotodev@gmail.com', href: 'mailto:niccolaspeixotodev@gmail.com', icon: Mail },
  { label: 'WhatsApp', value: 'Enviar mensagem direta', href: 'https://wa.me/11952397051', icon: MessageCircle },
];

export default function Contact() {
  return (
    <section id="contato" className="section contact">
      <div className="container">
        <motion.div
          className="contact__box"
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
        >
          <p className="eyebrow">Contato</p>
          <h2 className="contact__title">Vamos criar uma solução juntos?</h2>
          <p className="section-lede contact__lede">
            Estou disponível para vagas de Full Stack Júnior e projetos freelance.
            Escolha o canal que preferir — respondo rápido.
          </p>

          <div className="contact__links">
            {LINKS.map((link) => {
              const Icon = link.icon;
              return (
                <a key={link.label} href={link.href} target="_blank" rel="noreferrer" className="contact-link">
                  <span className="contact-link__icon">
                    <Icon size={18} strokeWidth={1.6} />
                  </span>
                  <span className="contact-link__text">
                    <span className="contact-link__label">{link.label}</span>
                    <span className="contact-link__value">{link.value}</span>
                  </span>
                  <ArrowUpRight size={16} className="contact-link__arrow" />
                </a>
              );
            })}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
