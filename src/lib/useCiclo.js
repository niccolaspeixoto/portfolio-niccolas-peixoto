import { useEffect, useState } from 'react';
import { useReducedMotion } from 'framer-motion';

/**
 * Contador de passos para as micro-animações em loop (painel do sistema,
 * cenas de Problemas, módulos). Avança um passo a cada `intervalo`, segura
 * no último por `pausa` e recomeça do zero.
 *
 * Fora da tela (`ativo` false) congela onde está, pra não gastar CPU com
 * algo que ninguém vê. Com movimento reduzido, devolve direto o último
 * passo: a cena aparece pronta, sem loop.
 */
export function useCiclo(total, { intervalo = 750, pausa = 2800, ativo = true } = {}) {
  const semMovimento = useReducedMotion();
  const [passo, setPasso] = useState(0);

  useEffect(() => {
    if (semMovimento || !ativo) return undefined;
    const espera = passo >= total ? pausa : intervalo;
    const t = setTimeout(() => setPasso((p) => (p >= total ? 0 : p + 1)), espera);
    return () => clearTimeout(t);
  }, [passo, ativo, semMovimento, total, intervalo, pausa]);

  return semMovimento ? total : passo;
}
