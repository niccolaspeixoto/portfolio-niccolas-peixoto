import { useRef } from 'react';
import { motion, useScroll, useTransform, useReducedMotion } from 'framer-motion';
import { MessageCircle, ArrowDown } from 'lucide-react';
import TituloLinhas from '../components/TituloLinhas';
import { useBrilhoSeguidor } from '../lib/useBrilhoSeguidor';
import { hero, contato } from '../data/conteudo';
import './Hero.css';

export default function Hero() {
  const secao = useRef(null);
  const botaoCta = useRef(null);
  const semMovimento = useReducedMotion();

  const { scrollYProgress } = useScroll({
    target: secao,
    offset: ['start start', 'end start'],
  });
  const deslocaFoto = useTransform(scrollYProgress, [0, 1], ['0%', '12%']);
  /* Só escurece no último terço da passagem pelo hero: a cena fecha pouco
     antes da próxima seção assumir, em vez de escurecer assim que a rolagem
     começa (o que apagaria o hero enquanto ele ainda domina a tela). */
  const cortina = useTransform(scrollYProgress, [0.6, 1], [0, 1]);

  useBrilhoSeguidor(botaoCta);

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
      {/* A foto sangra pela borda direita da janela, fora do quadro de
          conteúdo. É ela que domina a primeira tela, não um cartão. */}
      <motion.div
        className="hero__foto"
        style={semMovimento ? undefined : { y: deslocaFoto }}
        {...entra(0, 0)}
      >
        <img
          src="/niccolas.jpg"
          alt="Niccolas Peixoto, desenvolvedor responsável pelos projetos"
          width="768"
          height="1376"
          fetchPriority="high"
        />
        {/* Véu que escurece o lado esquerdo da foto para o título poder
            avançar por cima dela sem perder contraste. */}
        <span className="hero__veu" aria-hidden="true" />
      </motion.div>

      {/* Cortina que fecha a cena pouco antes da próxima seção assumir, em
          vez de cortar seco de uma seção pra outra. */}
      {!semMovimento && (
        <motion.span
          className="hero__cortina"
          style={{ opacity: cortina }}
          aria-hidden="true"
        />
      )}

      <div className="quadro hero__quadro">
        <div className="hero__texto">
          <TituloLinhas linhas={hero.titulo} como="h1" className="d-hero" imediato />

          <motion.p className="lead hero__lead" {...entra(0.5)}>
            {hero.texto}
          </motion.p>

          <motion.div className="hero__acoes" {...entra(0.62)}>
            <a
              ref={botaoCta}
              href={contato.whatsapp}
              target="_blank"
              rel="noreferrer"
              className="botao botao--cheio botao--brilho"
            >
              <MessageCircle size={17} strokeWidth={1.8} />
              {hero.cta}
            </a>

            <a href={hero.ctaSecundario.href} className="link-risco hero__link">
              {hero.ctaSecundario.rotulo}
              <ArrowDown size={14} strokeWidth={1.8} />
            </a>
          </motion.div>

          <motion.p className="miudo hero__legenda" {...entra(0.78, 0)}>
            {hero.legendaFoto}
          </motion.p>
        </div>
      </div>
    </section>
  );
}
