import { useEffect, useRef, useState } from 'react';
import {
  AnimatePresence,
  motion,
  useReducedMotion,
  useScroll,
  useMotionValueEvent,
} from 'framer-motion';
import { useLenis } from 'lenis/react';
import { MessageCircle, Menu, X } from 'lucide-react';
import { useScrollSpy } from '../lib/useScrollSpy';
import { useBrilhoSeguidor } from '../lib/useBrilhoSeguidor';
import { SUAVE } from '../lib/animacoes';
import { marca, navegacao, contato, hero } from '../data/conteudo';
import './Nav.css';

const IDS_SECOES = navegacao.map((item) => item.href.slice(1));

/**
 * Nav que vira pílula flutuante ao rolar (Resizable Navbar — Manu Arora /
 * Aceternity, MIT: https://21st.dev/@manuarora700/components/resizable-navbar),
 * some quando o leitor desce rápido e volta assim que ele sobe. No celular,
 * menu em tela cheia com os links subindo de dentro de máscaras (Immersive
 * Full Screen Navigation — Hyperiux Vault).
 */
export default function Nav() {
  const [rolou, setRolou] = useState(false);
  const [oculto, setOculto] = useState(false);
  const [aberto, setAberto] = useState(false);
  const botaoCta = useRef(null);
  const ultimoY = useRef(0);
  const semMovimento = useReducedMotion();
  const lenis = useLenis();

  const ativo = useScrollSpy(IDS_SECOES);

  useBrilhoSeguidor(botaoCta);

  /* useScroll em vez de um listener de scroll cru. Os estados só mudam ao
     cruzar um limite, então isso não re-renderiza a cada pixel. */
  const { scrollY } = useScroll();
  useMotionValueEvent(scrollY, 'change', (y) => {
    const delta = y - ultimoY.current;
    ultimoY.current = y;
    setRolou((atual) => (atual !== y > 40 ? y > 40 : atual));
    if (semMovimento) return;
    if (y > 640 && delta > 6) setOculto(true);
    else if (delta < -6 || y < 640) setOculto(false);
  });

  // Trava a rolagem do fundo enquanto o menu de celular está aberto.
  useEffect(() => {
    if (aberto) lenis?.stop();
    else lenis?.start();
    document.body.style.overflow = aberto ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [aberto, lenis]);

  useEffect(() => {
    const aoTeclar = (e) => e.key === 'Escape' && setAberto(false);
    window.addEventListener('keydown', aoTeclar);
    return () => window.removeEventListener('keydown', aoTeclar);
  }, []);

  const classes = ['nav', rolou && 'nav--rolou', oculto && !aberto && 'nav--oculto']
    .filter(Boolean)
    .join(' ');

  return (
    <>
      <header className={classes}>
        <div className="quadro nav__interno">
          <a href="#topo" className="nav__marca" aria-label={`${marca.nome} — início`}>
            <span className="nav__marca-nome">{marca.nome}</span>
            <span className="nav__marca-descritor">{marca.descritor}</span>
          </a>

          <nav className="nav__links" aria-label="Seções do site">
            {navegacao.map((item) => {
              const idSecao = item.href.slice(1);
              const estaAtivo = ativo === idSecao;

              return (
                <a
                  key={item.href}
                  href={item.href}
                  className={`nav__link${estaAtivo ? ' nav__link--ativo' : ''}`}
                  aria-current={estaAtivo ? 'true' : undefined}
                >
                  {item.rotulo}

                  {/* Um só elemento com este layoutId existe por vez; ao
                      trocar de link, o Framer Motion anima a peça velha até
                      a nova em vez de sumir numa e nascer na outra. */}
                  {estaAtivo && !semMovimento && (
                    <motion.span
                      layoutId="nav-indicador"
                      className="nav__indicador"
                      transition={{ type: 'spring', stiffness: 380, damping: 32 }}
                      aria-hidden="true"
                    />
                  )}
                  {estaAtivo && semMovimento && (
                    <span className="nav__indicador" aria-hidden="true" />
                  )}
                </a>
              );
            })}
          </nav>

          <div className="nav__acoes">
            <a
              ref={botaoCta}
              href={contato.whatsapp}
              target="_blank"
              rel="noreferrer"
              className="botao botao--cheio botao--brilho nav__cta"
            >
              <MessageCircle size={16} strokeWidth={1.8} />
              {hero.cta}
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
            role="dialog"
            aria-modal="true"
            aria-label="Menu"
            initial={{ clipPath: 'circle(0% at calc(100% - 44px) 40px)' }}
            animate={{ clipPath: 'circle(150% at calc(100% - 44px) 40px)' }}
            exit={{ clipPath: 'circle(0% at calc(100% - 44px) 40px)' }}
            transition={{ duration: semMovimento ? 0 : 0.7, ease: SUAVE }}
          >
            <span className="menu__brasa" aria-hidden="true" />

            <div className="quadro menu__topo">
              <span className="nav__marca-nome">{marca.nome}</span>
              <button
                type="button"
                className="nav__menu-botao menu__fechar"
                onClick={() => setAberto(false)}
                aria-label="Fechar menu"
                autoFocus
              >
                <X size={24} strokeWidth={1.5} />
              </button>
            </div>

            <nav className="quadro menu__links" aria-label="Seções do site">
              {navegacao.map((item, i) => (
                <a key={item.href} href={item.href} className="menu__link" onClick={() => setAberto(false)}>
                  <span className="menu__link-n">0{i + 1}</span>
                  <span className="menu__link-mascara">
                    <motion.span
                      className="menu__link-texto"
                      initial={{ y: '110%' }}
                      animate={{ y: '0%' }}
                      exit={{ y: '110%', transition: { duration: 0.25 } }}
                      transition={{ delay: 0.25 + i * 0.07, duration: 0.7, ease: SUAVE }}
                    >
                      {item.rotulo}
                    </motion.span>
                  </span>
                </a>
              ))}
            </nav>

            <motion.div
              className="quadro menu__rodape"
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.55, duration: 0.6, ease: SUAVE }}
            >
              <a
                href={contato.whatsapp}
                target="_blank"
                rel="noreferrer"
                className="botao botao--cheio botao--vivo menu__cta"
                onClick={() => setAberto(false)}
              >
                <MessageCircle size={16} strokeWidth={1.8} />
                {hero.cta}
              </a>
              <span className="miudo">{contato.whatsappVisivel}</span>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
