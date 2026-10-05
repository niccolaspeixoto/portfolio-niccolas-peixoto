import { useRef } from 'react';
import { motion, useScroll, useTransform, useReducedMotion } from 'framer-motion';
import './efeitos.css';

/* Variante ligada ao scroll do Text Reveal (Cnippet — MIT):
   https://21st.dev/@cnippet-dev/components/text-reveal
   O original revela ao entrar na tela; aqui cada palavra acende conforme o
   leitor rola, e apaga de novo se ele voltar. */

function Palavra({ children, progresso, inicio, fim }) {
  // Piso de 0.5, não mais baixo: abaixo disso a palavra ainda apagada fica
  // sem contraste mínimo (AA) contra o fundo, e ela já é texto de verdade.
  const opacity = useTransform(progresso, [inicio, fim], [0.5, 1]);
  return (
    <>
      <motion.span style={{ opacity }}>{children}</motion.span>{' '}
    </>
  );
}

export default function TextoRolagem({ texto, className = '', como: Tag = 'p' }) {
  const ref = useRef(null);
  const semMovimento = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start 0.88', 'end 0.5'] });

  if (semMovimento) {
    return <Tag className={className}>{texto}</Tag>;
  }

  const palavras = texto.split(' ');

  return (
    <Tag ref={ref} className={`texto-rolagem ${className}`}>
      {palavras.map((palavra, i) => (
        <Palavra
          key={`${palavra}-${i}`}
          progresso={scrollYProgress}
          inicio={i / palavras.length}
          fim={(i + 1) / palavras.length}
        >
          {palavra}
        </Palavra>
      ))}
    </Tag>
  );
}
