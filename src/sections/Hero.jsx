import { useRef } from 'react';
import {
  motion,
  useMotionValue,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
} from 'framer-motion';
import { MessageCircle, ArrowDown } from 'lucide-react';
import TextoCorte, { duracaoCorte } from '../components/efeitos/TextoCorte';
import PalavraGiratoria from '../components/efeitos/PalavraGiratoria';
import BotaoVivo from '../components/efeitos/BotaoVivo';
import { useMidia, PONTEIRO_FINO, DESKTOP } from '../lib/useMidia';
import { hero, contato } from '../data/conteudo';
import './Hero.css';

const ATRASO_LINHA_1 = 0.35;
const ATRASO_LINHA_2 = ATRASO_LINHA_1 + duracaoCorte(hero.titulo.linha1) + 0.12;
const ATRASO_PALAVRA = ATRASO_LINHA_2 + duracaoCorte(hero.titulo.linha2) + 0.05;
const ATRASO_RESTO = ATRASO_PALAVRA + 0.35;

const MOLA_PONTEIRO = { stiffness: 60, damping: 18, mass: 0.8 };

export default function Hero() {
  const secao = useRef(null);
  const semMovimento = useReducedMotion();
  const ponteiroFino = useMidia(PONTEIRO_FINO);
  const desktop = useMidia(DESKTOP);
  const profundidade = ponteiroFino && desktop && !semMovimento;

  const { scrollYProgress } = useScroll({
    target: secao,
    offset: ['start start', 'end start'],
  });
  const deslocaFoto = useTransform(scrollYProgress, [0, 1], ['0%', '12%']);
  const zoomFoto = useTransform(scrollYProgress, [0, 1], [1, 1.08]);
  const sobeTexto = useTransform(scrollYProgress, [0, 0.7], [0, -110]);
  const someTexto = useTransform(scrollYProgress, [0.08, 0.62], [1, 0]);
  /* Só escurece no último terço da passagem pelo hero: a cena fecha pouco
     antes da próxima seção assumir. */
  const cortina = useTransform(scrollYProgress, [0.6, 1], [0, 1]);

  /* Profundidade pelo ponteiro: foto, feixe de luz e texto andam em
     sentidos e distâncias diferentes, como camadas a alturas diferentes. */
  const px = useMotionValue(0);
  const py = useMotionValue(0);
  const molaX = useSpring(px, MOLA_PONTEIRO);
  const molaY = useSpring(py, MOLA_PONTEIRO);
  const fotoX = useTransform(molaX, (v) => v * -16);
  const textoX = useTransform(molaX, (v) => v * 12);
  const feixeX = useTransform(molaX, (v) => v * 40);
  const feixeY = useTransform(molaY, (v) => v * 24);

  const aoMoverPonteiro = (evento) => {
    if (!profundidade || !secao.current) return;
    const caixa = secao.current.getBoundingClientRect();
    px.set((evento.clientX - caixa.left) / caixa.width - 0.5);
    py.set((evento.clientY - caixa.top) / caixa.height - 0.5);
  };

  const entra = (atraso, deslocamento = 16) =>
    semMovimento
      ? {}
      : {
          initial: { opacity: 0, y: deslocamento },
          animate: { opacity: 1, y: 0 },
          transition: { duration: 0.9, delay: atraso, ease: [0.16, 1, 0.3, 1] },
        };

  const { linha1, linha2, palavras } = hero.titulo;

  return (
    <section
      id="topo"
      className="hero"
      ref={secao}
      data-brasa="topo"
      onPointerMove={aoMoverPonteiro}
    >
      {/* A foto sangra pela borda direita da janela, fora do quadro de
          conteúdo. É ela que domina a primeira tela, não um cartão. */}
      <motion.div
        className="hero__foto"
        style={semMovimento ? undefined : { y: deslocaFoto, x: fotoX, scale: zoomFoto }}
        initial={semMovimento ? undefined : { opacity: 0 }}
        animate={semMovimento ? undefined : { opacity: 1 }}
        transition={{ duration: 1.4, ease: [0.16, 1, 0.3, 1] }}
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

      {/* Feixe de luz terracota (Spotlight — Manu Arora / Aceternity, MIT:
          https://21st.dev/@manuarora700/components/spotlight). Entra varrendo
          no carregamento e acende a foto por cima, em modo screen. */}
      <motion.span
        className="hero__feixe"
        style={profundidade ? { x: feixeX, y: feixeY } : undefined}
        aria-hidden="true"
      >
        <span className="hero__feixe-luz" />
      </motion.span>

      {!semMovimento && (
        <motion.span
          className="hero__cortina"
          style={{ opacity: cortina }}
          aria-hidden="true"
        />
      )}

      <div className="quadro hero__quadro">
        <motion.div
          className="hero__texto"
          style={
            semMovimento ? undefined : { y: sobeTexto, opacity: someTexto, x: profundidade ? textoX : 0 }
          }
        >
          <h1 className="d-hero hero__titulo">
            <span className="sr-only">{`${linha1} ${linha2} ${palavras[0]}`}</span>
            <span className="hero__linha">
              <TextoCorte texto={linha1} atraso={ATRASO_LINHA_1} />
            </span>
            <span className="hero__linha realce">
              <TextoCorte texto={linha2} atraso={ATRASO_LINHA_2} />{' '}
              <PalavraGiratoria palavras={palavras} atrasoEntrada={ATRASO_PALAVRA} />
            </span>
          </h1>

          <motion.p className="lead hero__lead" {...entra(ATRASO_RESTO)}>
            {hero.texto}
          </motion.p>

          <motion.div className="hero__acoes" {...entra(ATRASO_RESTO + 0.12)}>
            <BotaoVivo href={contato.whatsapp} target="_blank" rel="noreferrer">
              <MessageCircle size={17} strokeWidth={1.8} />
              {hero.cta}
            </BotaoVivo>

            <a href={hero.ctaSecundario.href} className="link-risco hero__link">
              {hero.ctaSecundario.rotulo}
              <ArrowDown size={14} strokeWidth={1.8} />
            </a>
          </motion.div>

          <motion.p className="miudo hero__legenda" {...entra(ATRASO_RESTO + 0.28, 0)}>
            {hero.legendaFoto}
          </motion.p>
        </motion.div>
      </div>

      <motion.div className="hero__rolar" aria-hidden="true" {...entra(ATRASO_RESTO + 0.6, 0)}>
        <span className="hero__rolar-texto">{hero.indicadorRolagem}</span>
        <span className="hero__rolar-trilho">
          <span className="hero__rolar-ponto" />
        </span>
      </motion.div>
    </section>
  );
}
