import { useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';
import { motion } from 'framer-motion';
import { useLenis } from 'lenis/react';
import { ArrowUpRight, X } from 'lucide-react';
import { SUAVE } from '../../lib/animacoes';
import { projetos } from '../../data/conteudo';

/**
 * Case completo de um projeto (Animated Modal — Manu Arora / Aceternity,
 * MIT: https://21st.dev/@manuarora700/components/animated-modal).
 *
 * Vai por portal direto no <body>: a galeria anda com transform, e um
 * position: fixed dentro de um ancestral com transform passa a ser
 * relativo a ele, não à janela.
 */
export default function ModalCase({ item, aoFechar }) {
  const lenis = useLenis();
  const botaoFechar = useRef(null);
  const { rotulosCase } = projetos;

  useEffect(() => {
    const focoAnterior = document.activeElement;
    lenis?.stop();
    document.body.style.overflow = 'hidden';
    botaoFechar.current?.focus();

    const aoTeclar = (e) => {
      if (e.key === 'Escape') aoFechar();
    };
    window.addEventListener('keydown', aoTeclar);

    return () => {
      window.removeEventListener('keydown', aoTeclar);
      document.body.style.overflow = '';
      lenis?.start();
      focoAnterior?.focus?.({ preventScroll: true });
    };
  }, [lenis, aoFechar]);

  const pares = [
    [rotulosCase.problema, item.caso.problema],
    [rotulosCase.solucao, item.caso.solucao],
    [rotulosCase.resultado, item.caso.resultado],
  ];

  return createPortal(
    <motion.div
      className="modal-case"
      onClick={aoFechar}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
    >
      <motion.div
        className="modal-case__painel"
        role="dialog"
        aria-modal="true"
        aria-labelledby="modal-case-titulo"
        data-lenis-prevent
        onClick={(e) => e.stopPropagation()}
        initial={{ opacity: 0, y: 48, scale: 0.95 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: 32, scale: 0.97 }}
        transition={{ type: 'spring', stiffness: 260, damping: 26 }}
      >
        <button
          ref={botaoFechar}
          type="button"
          className="modal-case__fechar"
          onClick={aoFechar}
          aria-label={projetos.fechar}
        >
          <X size={18} strokeWidth={1.8} />
        </button>

        <div className="modal-case__imagem">
          <img src={item.imagem} alt={`Tela inicial do site de ${item.cliente}`} />
        </div>

        <div className="modal-case__corpo">
          <p className="modal-case__meta">
            {item.nicho} <span aria-hidden="true">·</span> {item.tipo}
          </p>
          <h3 id="modal-case-titulo" className="d-bloco modal-case__titulo">
            {item.cliente}
          </h3>

          <dl className="modal-case__lista">
            {pares.map(([rotulo, texto], i) => (
              <motion.div
                key={rotulo}
                className={`modal-case__par${i === pares.length - 1 ? ' modal-case__par--fecho' : ''}`}
                initial={{ opacity: 0, y: 14 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 + i * 0.1, duration: 0.5, ease: SUAVE }}
              >
                <dt>{rotulo}</dt>
                <dd>{texto}</dd>
              </motion.div>
            ))}
          </dl>

          {item.url && (
            <a href={item.url} target="_blank" rel="noreferrer" className="link-risco modal-case__link">
              {projetos.verSite}
              <ArrowUpRight size={14} strokeWidth={1.8} />
            </a>
          )}
        </div>
      </motion.div>
    </motion.div>,
    document.body
  );
}
