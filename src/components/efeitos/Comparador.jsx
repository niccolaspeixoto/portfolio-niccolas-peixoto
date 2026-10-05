import { useEffect, useRef } from 'react';
import {
  animate,
  motion,
  useInView,
  useMotionValue,
  useMotionValueEvent,
  useReducedMotion,
  useTransform,
} from 'framer-motion';
import { ChevronsLeftRight } from 'lucide-react';
import './Comparador.css';

/* Inspirado no Compare (Manu Arora / Aceternity — MIT):
   https://21st.dev/@manuarora700/components/compare
   Dois lados empilhados; o de cima (antes) é recortado da direita pra
   esquerda conforme a alça anda. Arrasta com mouse ou toque, e responde
   às setas do teclado quando a alça está em foco. */

const limitar = (v) => Math.min(100, Math.max(0, v));

export default function Comparador({ antes, depois, rotuloAntes, rotuloDepois, rotuloAlca, instrucao }) {
  const caixa = useRef(null);
  const alca = useRef(null);
  const arrastando = useRef(false);
  const semMovimento = useReducedMotion();
  const naTela = useInView(caixa, { once: true, amount: 0.55 });
  const posicao = useMotionValue(50);

  const recorte = useTransform(posicao, (v) => `inset(0 ${100 - v}% 0 0)`);
  const esquerda = useTransform(posicao, (v) => `${v}%`);

  // Valor do slider pro leitor de tela, escrito direto no DOM: re-render a
  // cada pixel arrastado seria desperdício.
  useMotionValueEvent(posicao, 'change', (v) => {
    alca.current?.setAttribute('aria-valuenow', String(Math.round(v)));
  });

  /* Varredura de apresentação, uma vez, ao entrar na tela: mostra que o
     lado de cima esconde outro por baixo antes do usuário descobrir sozinho. */
  useEffect(() => {
    if (!naTela || semMovimento) return undefined;
    const controle = animate(posicao, [50, 90, 10, 50], {
      duration: 3.4,
      ease: 'easeInOut',
      times: [0, 0.33, 0.72, 1],
    });
    return () => controle.stop();
  }, [naTela, semMovimento, posicao]);

  const levarPara = (clientX) => {
    const r = caixa.current.getBoundingClientRect();
    posicao.stop();
    posicao.set(limitar(((clientX - r.left) / r.width) * 100));
  };

  const aoPressionar = (e) => {
    arrastando.current = true;
    caixa.current.setPointerCapture?.(e.pointerId);
    levarPara(e.clientX);
  };

  const aoMover = (e) => {
    if (arrastando.current) levarPara(e.clientX);
  };

  const aoSoltar = () => {
    arrastando.current = false;
  };

  const aoTeclar = (e) => {
    const passo = e.shiftKey ? 20 : 5;
    if (e.key === 'ArrowLeft') posicao.set(limitar(posicao.get() - passo));
    else if (e.key === 'ArrowRight') posicao.set(limitar(posicao.get() + passo));
    else if (e.key === 'Home') posicao.set(0);
    else if (e.key === 'End') posicao.set(100);
    else return;
    e.preventDefault();
  };

  return (
    <div className="comparador">
      {/* Rótulos fora da caixa: dentro, o de "depois" cobria o selo de
          "dados fictícios" do painel, que precisa ficar legível. */}
      <div className="comparador__rotulos" aria-hidden="true">
        <span className="comparador__rotulo comparador__rotulo--antes">{rotuloAntes}</span>
        <span className="comparador__rotulo comparador__rotulo--depois">{rotuloDepois}</span>
      </div>

      <div
        ref={caixa}
        className="comparador__caixa"
        onPointerDown={aoPressionar}
        onPointerMove={aoMover}
        onPointerUp={aoSoltar}
        onPointerCancel={aoSoltar}
      >
        <div className="comparador__lado comparador__lado--depois">
          {depois}
        </div>

        <motion.div className="comparador__lado comparador__lado--antes" style={{ clipPath: recorte }}>
          {antes}
        </motion.div>

        <motion.div
          ref={alca}
          className="comparador__alca"
          style={{ left: esquerda }}
          role="slider"
          tabIndex={0}
          aria-label={rotuloAlca}
          aria-valuemin={0}
          aria-valuemax={100}
          aria-valuenow={50}
          onKeyDown={aoTeclar}
        >
          <span className="comparador__alca-linha" />
          <span className="comparador__alca-botao">
            <ChevronsLeftRight size={16} strokeWidth={2} />
          </span>
        </motion.div>
      </div>

      {instrucao && <p className="miudo comparador__instrucao">{instrucao}</p>}
    </div>
  );
}
