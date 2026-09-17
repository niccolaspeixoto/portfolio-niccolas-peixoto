/* Variantes do Framer Motion usadas em mais de um lugar.
   Ficam fora dos componentes para não serem recriadas a cada render. */

export const SUAVE = [0.16, 1, 0.3, 1];

/* Entrada padrão: sobe um pouco e aparece. Discreto de propósito.
   O atraso chega por `custom` para não brigar com a prop `transition`. */
export const revelar = {
  oculto: { opacity: 0, y: 22 },
  visivel: (atraso = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.85, delay: atraso, ease: SUAVE },
  }),
};

/* Mesma entrada, mas em cascata para os filhos. */
export const cascata = {
  oculto: {},
  visivel: {
    transition: { staggerChildren: 0.09, delayChildren: 0.05 },
  },
};

export const filho = {
  oculto: { opacity: 0, y: 18 },
  visivel: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.75, ease: SUAVE },
  },
};

/* Linha de título que sobe de dentro de uma máscara. Usada no hero e na
   chamada final — é o único momento em que a animação chama atenção. */
export const linhaMascarada = {
  oculto: { y: '108%' },
  visivel: (i = 0) => ({
    y: '0%',
    transition: { duration: 1, delay: 0.15 + i * 0.1, ease: SUAVE },
  }),
};

/* Fio horizontal que cresce da esquerda. */
export const fioCresce = {
  oculto: { scaleX: 0 },
  visivel: {
    scaleX: 1,
    transition: { duration: 1.1, ease: SUAVE },
  },
};

/* Área observada antes de disparar a entrada. */
export const janela = { once: true, amount: 0.25 };
export const janelaCurta = { once: true, amount: 0.45 };
