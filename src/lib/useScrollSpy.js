import { useEffect, useState } from 'react';

/**
 * Descobre qual seção está mais visível na tela agora, pra saber qual link
 * do menu marcar como ativo. Usa IntersectionObserver, não um listener de
 * scroll cru: aquilo dispara a cada pixel rolado e força o React a
 * recalcular sem parar, mesmo quando nada relevante mudou.
 *
 * @param {string[]} ids - ids das seções, sem o #
 * @returns {string|null} id da seção ativa
 */
export function useScrollSpy(ids) {
  const [ativo, setAtivo] = useState(null);

  useEffect(() => {
    const elementos = ids.map((id) => document.getElementById(id)).filter(Boolean);
    if (elementos.length === 0) return;

    const visiveis = new Map();

    const observador = new IntersectionObserver(
      (entradas) => {
        entradas.forEach((entrada) => {
          if (entrada.isIntersecting) {
            visiveis.set(entrada.target.id, entrada.intersectionRatio);
          } else {
            visiveis.delete(entrada.target.id);
          }
        });

        if (visiveis.size === 0) return;

        // Entre as seções parcialmente visíveis, a que ocupa mais tela vence.
        const [idMaisVisivel] = [...visiveis.entries()].sort((a, b) => b[1] - a[1])[0];
        setAtivo(idMaisVisivel);
      },
      {
        // Faixa central da tela: a seção só conta como "ativa" quando
        // cruza essa região, não assim que a borda de baixo aparece.
        rootMargin: '-35% 0px -55% 0px',
        threshold: [0, 0.25, 0.5, 0.75, 1],
      }
    );

    elementos.forEach((el) => observador.observe(el));
    return () => observador.disconnect();
  }, [ids]);

  return ativo;
}
