import { useEffect } from 'react';

/* Mola crítica-ish: mesma ideia do cursor-edge-glow-button do MicroKit.
   O brilho persegue o cursor em vez de teleportar para a posição exata —
   é o atraso e a acomodação que dão peso ao movimento. Sem isso, o brilho
   fica grudado no cursor e parece um efeito de CSS solto, não um detalhe
   desenhado. */
const FREQUENCIA = 3.6;
const AMORTECIMENTO = 0.8;

/**
 * Anexa um brilho com física a um elemento: escreve --brilho-x/--brilho-y
 * nele conforme o ponteiro se move dentro da área.
 *
 * @param {React.RefObject<HTMLElement>} ref
 */
export function useBrilhoSeguidor(ref) {
  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const reduzido = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    let x = 0;
    let y = 0;
    let vx = 0;
    let vy = 0;
    let tx = 0;
    let ty = 0;
    let frame = null;
    let ultimo = 0;

    const pintar = () => {
      el.style.setProperty('--brilho-x', `${x.toFixed(2)}px`);
      el.style.setProperty('--brilho-y', `${y.toFixed(2)}px`);
    };

    const mover = (agora) => {
      const dt = Math.min((agora - ultimo) / 1000, 0.032);
      ultimo = agora;
      const w = 2 * Math.PI * FREQUENCIA;

      vx += (w * w * (tx - x) - 2 * AMORTECIMENTO * w * vx) * dt;
      vy += (w * w * (ty - y) - 2 * AMORTECIMENTO * w * vy) * dt;
      x += vx * dt;
      y += vy * dt;
      pintar();

      const parado =
        Math.abs(tx - x) < 0.15 &&
        Math.abs(ty - y) < 0.15 &&
        Math.abs(vx) < 0.4 &&
        Math.abs(vy) < 0.4;

      if (!parado) {
        frame = requestAnimationFrame(mover);
      } else {
        frame = null;
        x = tx;
        y = ty;
        vx = 0;
        vy = 0;
        pintar();
      }
    };

    const acionar = () => {
      if (frame === null) {
        ultimo = performance.now();
        frame = requestAnimationFrame(mover);
      }
    };

    const aoMoverPonteiro = (evento) => {
      const caixa = el.getBoundingClientRect();
      tx = evento.clientX - caixa.left;
      ty = evento.clientY - caixa.top;

      if (reduzido) {
        x = tx;
        y = ty;
        pintar();
        return;
      }

      acionar();
    };

    el.addEventListener('pointermove', aoMoverPonteiro);

    return () => {
      el.removeEventListener('pointermove', aoMoverPonteiro);
      if (frame !== null) cancelAnimationFrame(frame);
    };
  }, [ref]);
}
