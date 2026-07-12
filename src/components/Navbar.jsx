import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Menu, X } from 'lucide-react';
import './Navbar.css';
import Avatar from '../assets/avatar-niccolas.png'

const LINKS = [
  { label: 'Sobre', href: '#sobre' },
  { label: 'Tecnologias', href: '#tecnologias' },
  { label: 'Projetos', href: '#projetos' },
  { label: 'Processo', href: '#processo' },
  { label: 'Contato', href: '#contato' },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const handleClick = (href) => {
    setOpen(false);
    document.querySelector(href)?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <motion.header
      className={`navbar ${scrolled ? 'navbar--scrolled' : ''}`}
      initial={{ y: -40, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
    >
      <div className="container navbar__inner">
        <a href="#top" className="navbar__logo" onClick={(e) => { e.preventDefault(); handleClick('#top'); }}>
          <img src={Avatar} className="navbar__logo-mark" />
          <span className="navbar__logo-text">Niccolas Peixoto</span>
        </a>

        <nav className="navbar__links">
          {LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={(e) => { e.preventDefault(); handleClick(link.href); }}
            >
              {link.label}
            </a>
          ))}
        </nav>

        <a
          href="#contato"
          className="btn btn-primary navbar__cta"
          onClick={(e) => { e.preventDefault(); handleClick('#contato'); }}
        >
          Vamos conversar
        </a>

        <button
          className="navbar__toggle"
          aria-label={open ? 'Fechar menu' : 'Abrir menu'}
          onClick={() => setOpen((v) => !v)}
        >
          {open ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>

      {open && (
        <motion.nav
          className="navbar__mobile"
          initial={{ height: 0, opacity: 0 }}
          animate={{ height: 'auto', opacity: 1 }}
          exit={{ height: 0, opacity: 0 }}
        >
          {LINKS.map((link) => (
            <a key={link.href} href={link.href} onClick={(e) => { e.preventDefault(); handleClick(link.href); }}>
              {link.label}
            </a>
          ))}
          <a href="#contato" className="btn btn-primary" onClick={(e) => { e.preventDefault(); handleClick('#contato'); }}>
            Vamos conversar
          </a>
        </motion.nav>
      )}
    </motion.header>
  );
}
