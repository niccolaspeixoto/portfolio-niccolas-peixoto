import { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { MessageCircle, Menu, X } from 'lucide-react';
import { marca, navegacao, contato } from '../data/conteudo';
import './Nav.css';

export default function Nav() {
  const [rolou, setRolou] = useState(false);
  const [aberto, setAberto] = useState(false);

  useEffect(() => {
    const aoRolar = () => setRolou(window.scrollY > 40);
    aoRolar();
    window.addEventListener('scroll', aoRolar, { passive: true });
    return () => window.removeEventListener('scroll', aoRolar);
  }, []);

  // Trava a rolagem do fundo enquanto o menu de celular está aberto.
  useEffect(() => {
    document.body.style.overflow = aberto ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [aberto]);

  useEffect(() => {
    const aoTeclar = (e) => e.key === 'Escape' && setAberto(false);
    window.addEventListener('keydown', aoTeclar);
    return () => window.removeEventListener('keydown', aoTeclar);
  }, []);

  return (
    <>
      <header className={`nav${rolou ? ' nav--rolou' : ''}`}>
        <div className="quadro nav__interno">
          <a href="#topo" className="nav__marca" aria-label={`${marca.nome} — início`}>
            <span className="nav__marca-nome">{marca.nome}</span>
            <span className="nav__marca-descritor">{marca.descritor}</span>
          </a>

          <nav className="nav__links" aria-label="Seções do site">
            {navegacao.map((item) => (
              <a key={item.href} href={item.href} className="nav__link">
                {item.rotulo}
              </a>
            ))}
          </nav>

          <div className="nav__acoes">
            <a
              href={contato.whatsapp}
              target="_blank"
              rel="noreferrer"
              className="botao botao--cheio nav__cta"
            >
              <MessageCircle size={16} strokeWidth={1.8} />
              Falar no WhatsApp
            </a>

            <button
              type="button"
              className="nav__menu-botao"
              onClick={() => setAberto(true)}
              aria-label="Abrir menu"
              aria-expanded={aberto}
            >
              <Menu size={22} strokeWidth={1.5} />
            </button>
          </div>
        </div>
      </header>

      <AnimatePresence>
        {aberto && (
          <motion.div
            className="menu"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            <div className="quadro menu__topo">
              <span className="nav__marca-nome">{marca.nome}</span>
              <button
                type="button"
                className="nav__menu-botao"
                onClick={() => setAberto(false)}
                aria-label="Fechar menu"
              >
                <X size={24} strokeWidth={1.5} />
              </button>
            </div>

            <nav className="quadro menu__links" aria-label="Seções do site">
              {navegacao.map((item, i) => (
                <motion.a
                  key={item.href}
                  href={item.href}
                  className="menu__link d-bloco"
                  onClick={() => setAberto(false)}
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.08 + i * 0.06, duration: 0.5 }}
                >
                  <span className="menu__link-n">0{i + 1}</span>
                  {item.rotulo}
                </motion.a>
              ))}
            </nav>

            <div className="quadro menu__rodape">
              <a
                href={contato.whatsapp}
                target="_blank"
                rel="noreferrer"
                className="botao botao--cheio menu__cta"
                onClick={() => setAberto(false)}
              >
                <MessageCircle size={16} strokeWidth={1.8} />
                Falar no WhatsApp
              </a>
              <span className="miudo">{contato.whatsappVisivel}</span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
