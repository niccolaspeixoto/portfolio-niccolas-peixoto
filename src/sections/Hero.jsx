import { useRef } from 'react';
import { motion, useScroll, useTransform, useReducedMotion } from 'framer-motion';
import { MessageCircle, ArrowDown } from 'lucide-react';
import TituloLinhas from '../components/TituloLinhas';
import { hero, contato } from '../data/conteudo';
import './Hero.css';

export default function Hero() {
  const secao = useRef(null);
  const semMovimento = useReducedMotion();

  // Parallax leve: a foto sobe mais devagar que o texto ao rolar.
  const { scrollYProgress } = useScroll({
    target: secao,
    offset: ['start start', 'end start'],
  });
  const deslocaFoto = useTransform(scrollYProgress, [0, 1], ['0%', '14%']);

  /* Quem pediu menos movimento no sistema recebe o hero já montado, sem
     nenhum estado inicial invisível. */
  const entra = (atraso, deslocamento = 14) =>
    semMovimento
      ? {}
      : {
          initial: { opacity: 0, y: deslocamento },
          animate: { opacity: 1, y: 0 },
          transition: { duration: 0.9, delay: atraso, ease: [0.16, 1, 0.3, 1] },
        };

  return (
    <section id="topo" className="hero" ref={secao}>
      <div className="quadro hero__quadro">
        <div className="grade hero__grade">
          {/* --- Foto --- */}
          <motion.div
            className="hero__foto-area"
            style={semMovimento ? undefined : { y: deslocaFoto }}
            {...entra(0, 0)}
          >
            <div className="hero__moldura">
              {/* Contorno deslocado: marca de registro gráfico, não sombra. */}
              <span className="hero__eco" aria-hidden="true" />
              <img
                src="/niccolas.jpg"
                alt="Niccolas Peixoto, desenvolvedor responsável pelos projetos"
                width="768"
                height="1376"
                fetchPriority="high"
              />
            </div>

            <p className="hero__legenda miudo">{hero.legendaFoto}</p>
          </motion.div>

          {/* --- Texto --- */}
          <div className="hero__texto-area">
            <motion.p className="olho" {...entra(0.1, 0)}>
              {hero.olho}
            </motion.p>

            <TituloLinhas linhas={hero.titulo} como="h1" className="d-hero" imediato />

            <motion.p className="lead hero__lead" {...entra(0.55)}>
              {hero.texto}
            </motion.p>

            <motion.div className="hero__acoes" {...entra(0.68)}>
              <a
                href={contato.whatsapp}
                target="_blank"
                rel="noreferrer"
                className="botao botao--cheio"
              >
                <MessageCircle size={17} strokeWidth={1.8} />
                {hero.cta}
              </a>

              <a href={hero.ctaSecundario.href} className="link-risco hero__link">
                {hero.ctaSecundario.rotulo}
                <ArrowDown size={14} strokeWidth={1.8} />
              </a>
            </motion.div>

            <motion.ul className="hero__selos" {...entra(0.85, 0)}>
              {hero.selos.map((selo) => (
                <li key={selo} className="miudo">
                  {selo}
                </li>
              ))}
            </motion.ul>
          </div>
        </div>
      </div>

      {/* --- Faixa dos três pilares, no pé do hero --- */}
      <motion.div className="pilares" {...entra(1, 18)}>
        <div className="quadro pilares__quadro">
          {hero.pilares.map((pilar) => (
            <article className="pilar" key={pilar.n}>
              <span className="pilar__n">{pilar.n}</span>
              <h2 className="pilar__titulo">{pilar.titulo}</h2>
              <p className="pilar__texto miudo">{pilar.texto}</p>
            </article>
          ))}
        </div>
      </motion.div>
    </section>
  );
}
