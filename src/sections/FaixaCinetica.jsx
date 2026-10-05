import { Fragment, useRef } from 'react';
import {
  motion,
  useAnimationFrame,
  useInView,
  useMotionValue,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
  useVelocity,
} from 'framer-motion';
import { faixaCinetica } from '../data/conteudo';
import './FaixaCinetica.css';

/* Scroll Based Velocity (Dillion Verma / Magic UI — MIT):
   https://21st.dev/@dillionverma/components/scroll-based-velocity
   A linha anda sozinha devagar; rolar a página acelera, e rolar pra cima
   inverte o sentido. Quatro cópias do texto em fila, com a posição
   "dando a volta" a cada quarto — emenda invisível. */

const COPIAS = 4;

const envolver = (min, max, v) => {
  const faixa = max - min;
  return ((((v - min) % faixa) + faixa) % faixa) + min;
};

function Linha({ itens, velocidade, variante }) {
  const ref = useRef(null);
  const semMovimento = useReducedMotion();
  const naTela = useInView(ref);
  const base = useMotionValue(0);
  const { scrollY } = useScroll();
  const velocidadeScroll = useVelocity(scrollY);
  const velocidadeSuave = useSpring(velocidadeScroll, { damping: 50, stiffness: 400 });
  const fator = useTransform(velocidadeSuave, [0, 1000], [0, 5], { clamp: false });
  const sentido = useRef(1);
  const x = useTransform(base, (v) => `${envolver(-100 / COPIAS, 0, v)}%`);

  useAnimationFrame((_, delta) => {
    // Fora da tela não anda: não há por que gastar quadro com isso.
    if (semMovimento || !naTela) return;
    let mover = sentido.current * velocidade * (delta / 1000);
    const f = fator.get();
    if (f < 0) sentido.current = -1;
    else if (f > 0) sentido.current = 1;
    mover += sentido.current * mover * f;
    base.set(base.get() + mover);
  });

  return (
    <div ref={ref} className={`faixa-linha faixa-linha--${variante}`}>
      <motion.div className="faixa-linha__trilho" style={semMovimento ? undefined : { x }}>
        {Array.from({ length: COPIAS }, (_, copia) => (
          <span key={copia} className="faixa-linha__copia">
            {itens.map((item) => (
              <Fragment key={item}>
                <span className="faixa-linha__item">{item}</span>
                <span className="faixa-linha__separador" />
              </Fragment>
            ))}
          </span>
        ))}
      </motion.div>
    </div>
  );
}

/**
 * Faixa cinética entre Projetos e Diferenciais. Decorativa: tudo o que ela
 * diz já está escrito nas seções vizinhas, então fica fora do leitor de tela.
 */
export default function FaixaCinetica() {
  const [primeira, segunda] = faixaCinetica.linhas;

  return (
    <section className="faixa-cinetica" data-brasa="faixa" aria-hidden="true">
      <div className="faixa-cinetica__giro">
        <Linha itens={primeira} velocidade={-2.2} variante="cheia" />
        <Linha itens={segunda} velocidade={2.2} variante="vazada" />
      </div>
    </section>
  );
}
