import { useRef } from 'react';
import { motion, useInView, useReducedMotion, useScroll, useTransform } from 'framer-motion';
import SecaoComTransicao from '../components/SecaoComTransicao';
import Reveal from '../components/Reveal';
import Adiado from '../components/Adiado';
import TextoCorte from '../components/efeitos/TextoCorte';
import PainelSistema from '../components/painel/PainelSistema';
import { useMidia, DESKTOP } from '../lib/useMidia';
import { demonstracao } from '../data/conteudo';
import './Demonstracao.css';

/**
 * O momento "aha": o sistema funcionando, não um print dele.
 *
 * A moldura entra inclinada pra trás e vai se assentando plana conforme a
 * página rola — mecânica do Container Scroll Animation (Manu Arora /
 * Aceternity, MIT: https://21st.dev/@manuarora700/components/container-scroll-animation).
 * Dentro, um painel React de verdade, em loop enquanto está na tela.
 */
export default function Demonstracao() {
  const palco = useRef(null);
  const moldura = useRef(null);
  const titulo = useRef(null);
  const semMovimento = useReducedMotion();
  const desktop = useMidia(DESKTOP);

  const { scrollYProgress } = useScroll({ target: palco, offset: ['start end', 'start 0.2'] });
  const giro = useTransform(scrollYProgress, [0, 1], [desktop ? 28 : 10, 0]);
  const escala = useTransform(scrollYProgress, [0, 1], desktop ? [1.06, 1] : [0.94, 1]);
  const subida = useTransform(scrollYProgress, [0, 1], [desktop ? 90 : 30, 0]);

  const painelNaTela = useInView(moldura, { amount: 0.4 });
  const tituloNaTela = useInView(titulo, { once: true, amount: 0.6 });

  return (
    <SecaoComTransicao id="demonstracao" data-brasa="demonstracao" className="faixa demonstracao">
      <div className="quadro">
        <header className="demonstracao__cabecalho">
          <Reveal>
            <p className="demonstracao__rotulo">{demonstracao.rotulo}</p>
          </Reveal>

          <h2 ref={titulo} className="d-secao demonstracao__titulo">
            <span className="sr-only">{demonstracao.titulo}</span>
            {/* Cascata curta de propósito: no celular este título costuma ser o
                maior elemento da primeira tela, e ele só conta como
                "pintado" quando a última letra termina de subir. */}
            <TextoCorte texto={demonstracao.titulo} iniciar={tituloNaTela} escalonamento={0.01} />
          </h2>

          <Reveal atraso={0.2}>
            <p className="lead demonstracao__texto">{demonstracao.texto}</p>
          </Reveal>
        </header>

        <div className="demonstracao__palco" ref={palco}>
          <motion.div
            ref={moldura}
            className="demonstracao__moldura"
            style={semMovimento ? undefined : { rotateX: giro, scale: escala, y: subida }}
          >
            <Adiado className="demonstracao__adiado" margem="300px 0px">
              <PainelSistema ativo={painelNaTela} />
            </Adiado>
          </motion.div>
          <span className="demonstracao__reflexo" aria-hidden="true" />
        </div>
      </div>
    </SecaoComTransicao>
  );
}
