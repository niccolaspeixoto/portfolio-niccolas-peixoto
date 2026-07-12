import './Footer.css';

export default function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="footer">
      <div className="container footer__inner">
        <span>© {year} Niccolas Peixoto — Desenvolvedor Full Stack Júnior</span>
        <span className="footer__built">Construído com React &amp; Vite</span>
      </div>
    </footer>
  );
}
