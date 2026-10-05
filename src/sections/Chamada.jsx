import { useRef } from 'react';
import { motion, useInView, useReducedMotion } from 'framer-motion';
import { MessageCircle } from 'lucide-react';
import Reveal from '../components/Reveal';
import TituloLinhas from '../components/TituloLinhas';
import BotaoVivo from '../components/efeitos/BotaoVivo';
import { SocialHighlightCards } from '../components/microkit/social-highlight-cards';
import { SUAVE } from '../lib/animacoes';
import { chamada, contato } from '../data/conteudo';
import './Chamada.css';

/**
 * A brasa chega: uma lâmpada terracota abre o cone de luz em cima do
 * título quando a seção entra (Lamp — Manu Arora / Aceternity, MIT:
 * https://21st.dev/@manuarora700/components/lamp, recolorida do ciano
 * original pra paleta do site).
 *
 * A seção é opaca embaixo e tem os cantos de baixo arredondados: ela
 * "levanta" e o rodapé aparece por baixo dela.
 */
export default function Chamada() {
  const ref = useRef(null);
  const semMovimento = useReducedMotion();
  const naTela = useInView(ref, { once: true, amount: 0.3 });
  const acesa = naTela || semMovimento;

  const abre = (atraso = 0) => ({
    initial: false,
    animate: { scaleX: acesa ? 1 : 0.42, opacity: acesa ? 1 : 0.35 },
    transition: { delay: 0.2 + atraso, duration: 1.1, ease: SUAVE },
  });

  return (
    <section id="contato" data-brasa="contato" className="chamada" ref={ref}>
      <div className="lampada" aria-hidden="true">
        <motion.span className="lampada__cone" {...abre()} />
        <motion.span className="lampada__halo" {...abre(0.05)} />
        <motion.span className="lampada__filamento" {...abre(0.1)} />
      </div>

      <div className="quadro chamada__conteudo">
        <TituloLinhas linhas={chamada.titulo} como="h2" className="d-secao chamada__titulo" />

        <Reveal atraso={0.15}>
          <p className="lead chamada__lead">{chamada.texto}</p>
        </Reveal>

        <Reveal atraso={0.25} className="chamada__acao">
          <BotaoVivo
            href={contato.whatsapp}
            target="_blank"
            rel="noreferrer"
            className="chamada__botao"
          >
            <MessageCircle size={18} strokeWidth={1.8} />
            {chamada.cta}
          </BotaoVivo>
          <span className="miudo chamada__numero">{contato.whatsappVisivel}</span>
        </Reveal>

        <Reveal atraso={0.35} className="chamada__redes">
          <p className="miudo chamada__redes-legenda">{chamada.legendaRedes}</p>
          <SocialHighlightCards redes={chamada.redes} />
        </Reveal>
      </div>
    </section>
  );
}
