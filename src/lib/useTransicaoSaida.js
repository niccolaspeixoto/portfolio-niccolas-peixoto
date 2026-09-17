import { useScroll, useTransform } from 'framer-motion';

/* Efeito de "página deslizando por cima": a seção encolhe e escurece nos
   últimos 25% da própria altura, como se a seção seguinte estivesse
   subindo e cobrindo ela. Sem isso, uma seção termina e a próxima começa
   sem nenhuma relação visual entre as duas — é o que fazia o site parecer
   "sete salas" em vez de uma rolagem contínua.

   IMPORTANTE: a escala usa `transform`, que quebra `position: sticky` em
   qualquer descendente (é assim que o CSS funciona: transform num
   ancestral cria um novo containing block, e o sticky do filho para de
   funcionar). Seções com algo sticky lá dentro (Problemas, Diferenciais)
   devem chamar apenas a parte de opacidade, nunca a de escala. */

/**
 * @param {React.RefObject<HTMLElement>} ref
 * @param {{ comEscala?: boolean }} opcoes
 */
export function useTransicaoSaida(ref, { comEscala = true } = {}) {
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start start', 'end start'],
  });

  const opacidade = useTransform(scrollYProgress, [0.75, 1], [1, 0.65]);
  const escala = useTransform(scrollYProgress, [0.75, 1], [1, 0.96]);

  return { opacidade, escala: comEscala ? escala : undefined };
}
