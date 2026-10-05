import { useEffect, useState } from 'react';

/* Breakpoint lido em JS só quando a decisão precisa acontecer antes de
   renderizar (prender uma seção, ligar parallax de ponteiro). Layout em si
   continua resolvido em CSS. */
export function useMidia(consulta) {
  const [corresponde, setCorresponde] = useState(
    () => typeof window !== 'undefined' && window.matchMedia(consulta).matches
  );

  useEffect(() => {
    const mql = window.matchMedia(consulta);
    const atualizar = () => setCorresponde(mql.matches);
    atualizar();
    mql.addEventListener('change', atualizar);
    return () => mql.removeEventListener('change', atualizar);
  }, [consulta]);

  return corresponde;
}

export const DESKTOP = '(min-width: 900px)';
export const PONTEIRO_FINO = '(hover: hover) and (pointer: fine)';
