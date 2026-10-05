import { useEffect, useRef, useState } from 'react';

/**
 * Só monta o conteúdo quando ele chega perto da tela. As peças vivas do
 * site (painel do sistema, cenas, módulos, comparador) são pesadas de
 * montar de uma vez no carregamento — e quase nenhuma está visível ali.
 *
 * O envoltório fica no lugar desde o início, com a altura reservada pelo
 * CSS de quem usa (className), pra página não pular quando o conteúdo
 * entra. Uma vez montado, não desmonta mais.
 *
 * @param {string} margem - rootMargin do IntersectionObserver
 */
export default function Adiado({ children, margem = '600px 0px', className, como: Tag = 'div' }) {
  const ref = useRef(null);
  const [montado, setMontado] = useState(false);

  useEffect(() => {
    if (montado) return undefined;
    const el = ref.current;
    if (!el) return undefined;
    const observador = new IntersectionObserver(
      ([entrada]) => {
        if (entrada.isIntersecting) {
          setMontado(true);
          observador.disconnect();
        }
      },
      { rootMargin: margem }
    );
    observador.observe(el);
    return () => observador.disconnect();
  }, [montado, margem]);

  return (
    <Tag ref={ref} className={className}>
      {montado ? children : null}
    </Tag>
  );
}
