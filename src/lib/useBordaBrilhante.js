import { useEffect } from 'react';

/* Mecânica do Glowing Effect (Manu Arora / Aceternity — MIT):
   https://21st.dev/@manuarora700/components/glowing-effect
   O arco aceso da borda aponta pro cursor e só aparece quando ele está
   perto do card. Escreve --angulo-borda e --borda-ativa no elemento; o
   desenho em si é CSS (.borda-brilhante, em global.css). */

const PROXIMIDADE = 90;

/**
 * @param {React.RefObject<HTMLElement>} ref
 * @param {boolean} ligado - false em toque/movimento reduzido
 */
export function useBordaBrilhante(ref, ligado = true) {
  useEffect(() => {
    const el = ref.current;
    if (!el || !ligado) return undefined;

    let quadro = null;
    let ultimoX = 0;
    let ultimoY = 0;
    let angulo = 0;

    const atualizar = () => {
      quadro = null;
      const r = el.getBoundingClientRect();
      const perto =
        ultimoX > r.left - PROXIMIDADE &&
        ultimoX < r.right + PROXIMIDADE &&
        ultimoY > r.top - PROXIMIDADE &&
        ultimoY < r.bottom + PROXIMIDADE;

      el.style.setProperty('--borda-ativa', perto ? '1' : '0');
      if (!perto) return;

      const cx = r.left + r.width / 2;
      const cy = r.top + r.height / 2;
      let alvo = (Math.atan2(ultimoY - cy, ultimoX - cx) * 180) / Math.PI + 90;
      // Caminho mais curto até o novo ângulo: sem isto, cruzar o 0°/360°
      // faria o arco dar a volta inteira no card.
      while (alvo - angulo > 180) alvo -= 360;
      while (alvo - angulo < -180) alvo += 360;
      angulo = alvo;
      el.style.setProperty('--angulo-borda', `${angulo.toFixed(1)}deg`);
    };

    const aoMover = (e) => {
      ultimoX = e.clientX;
      ultimoY = e.clientY;
      if (quadro === null) quadro = requestAnimationFrame(atualizar);
    };

    window.addEventListener('pointermove', aoMover, { passive: true });
    return () => {
      window.removeEventListener('pointermove', aoMover);
      if (quadro !== null) cancelAnimationFrame(quadro);
    };
  }, [ref, ligado]);
}
