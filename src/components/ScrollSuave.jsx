import { useEffect } from 'react';
import { ReactLenis, useLenis } from 'lenis/react';
import { useReducedMotion } from 'framer-motion';
import 'lenis/dist/lenis.css';

/* Links #âncora passam por aqui, não pelo `anchors` do próprio Lenis: ele
   não cancela o salto nativo do navegador, e o `scrollTo` dele não faz
   nada enquanto o scroll está parado (menu do celular aberto, modal de
   case aberto). Aqui o salto nativo é cancelado e o scroll é religado
   antes de rolar. */
function AncorasSuaves() {
  const lenis = useLenis();

  useEffect(() => {
    if (!lenis) return undefined;

    const aoClicar = (evento) => {
      if (evento.defaultPrevented || evento.button !== 0) return;
      if (evento.metaKey || evento.ctrlKey || evento.shiftKey || evento.altKey) return;

      const link = evento.target.closest?.('a[href^="#"]');
      if (!link) return;

      const href = link.getAttribute('href');
      const alvo = href === '#topo' || href === '#' ? 0 : document.querySelector(href);
      if (alvo === null) return;

      evento.preventDefault();
      lenis.start();
      // Sem offset aqui: o Lenis já respeita o scroll-padding-top do <html>
      // (global.css), o mesmo que o navegador usa quando o Lenis está fora.
      lenis.scrollTo(alvo);
    };

    document.addEventListener('click', aoClicar);
    return () => document.removeEventListener('click', aoClicar);
  }, [lenis]);

  return null;
}

/**
 * Scroll suave no site inteiro (Lenis). Toque no celular continua nativo —
 * o Lenis só suaviza roda do mouse. Quem pediu menos movimento fica com o
 * scroll do navegador, sem interpolação nenhuma.
 */
export default function ScrollSuave({ children }) {
  const semMovimento = useReducedMotion();

  if (semMovimento) return children;

  return (
    <ReactLenis root options={{ lerp: 0.09, autoRaf: true }}>
      <AncorasSuaves />
      {children}
    </ReactLenis>
  );
}
