import { motion, useReducedMotion } from 'framer-motion';
import './efeitos.css';

/* Inspirado no Vertical Cut Reveal (Daniel Petho — MIT):
   https://21st.dev/@danielpetho/components/vertical-cut-reveal
   Cada letra sobe de dentro da máscara da própria palavra, em cascata. */

const MOLA = { type: 'spring', stiffness: 240, damping: 28 };

/**
 * Só a parte visual: quem usa põe o texto completo para leitor de tela em
 * outro lugar (as letras soltas aqui são aria-hidden).
 *
 * @param {string} texto
 * @param {number} atraso - segundos antes da primeira letra
 * @param {number} escalonamento - segundos entre uma letra e a próxima
 * @param {boolean} iniciar - false segura a animação (ex.: esperando entrar na tela)
 */
export default function TextoCorte({ texto, atraso = 0, escalonamento = 0.024, iniciar = true }) {
  const semMovimento = useReducedMotion();

  if (semMovimento) {
    return <span aria-hidden="true">{texto}</span>;
  }

  const palavras = texto.split(' ');
  let indice = 0;

  return (
    <span className="texto-corte" aria-hidden="true">
      {palavras.map((palavra, p) => (
        <span key={`${palavra}-${p}`}>
          <span className="texto-corte__palavra">
            {[...palavra].map((letra) => {
              const i = indice++;
              return (
                <motion.span
                  key={i}
                  className="texto-corte__letra"
                  initial={{ y: '112%' }}
                  animate={iniciar ? { y: '0%' } : { y: '112%' }}
                  transition={{ ...MOLA, delay: atraso + i * escalonamento }}
                >
                  {letra}
                </motion.span>
              );
            })}
          </span>
          {p < palavras.length - 1 ? ' ' : null}
        </span>
      ))}
    </span>
  );
}

/** Quanto tempo a revelação de um texto leva, pra encadear a próxima. */
export function duracaoCorte(texto, escalonamento = 0.024) {
  return texto.replace(/\s/g, '').length * escalonamento;
}
