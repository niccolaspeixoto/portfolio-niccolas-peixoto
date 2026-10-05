import { useRef } from 'react';
import { useBrilhoSeguidor } from '../lib/useBrilhoSeguidor';

/**
 * Superfície com o brilho que segue o cursor por dentro (mesma física do
 * botão do hero/nav e dos pilares — ver useBrilhoSeguidor). Reutilizável em
 * qualquer card que deva reagir ao mouse: a mecânica é sempre a mesma, só
 * o conteúdo de dentro muda. O CSS base mora em global.css (.superficie-
 * -brilho); cada seção só adiciona a classe própria pro padding/layout.
 */
export default function SuperficieComBrilho({ children, className = '', ...resto }) {
  const ref = useRef(null);
  useBrilhoSeguidor(ref);

  return (
    <div className={`superficie-brilho ${className}`} ref={ref} {...resto}>
      {children}
    </div>
  );
}
