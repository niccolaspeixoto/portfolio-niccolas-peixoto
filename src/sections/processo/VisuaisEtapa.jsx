import { AnimatePresence, motion } from 'framer-motion';
import { MessageCircle } from 'lucide-react';
import { useCiclo } from '../../lib/useCiclo';
import { SUAVE } from '../../lib/animacoes';
import './VisuaisEtapa.css';

/* Uma cena pequena por etapa do processo. Todas rodam só na tela. */

function Mensagem({ visual, ativo }) {
  const passo = useCiclo(3, { intervalo: 1100, pausa: 2800, ativo });
  return (
    <div className="visual visual-mensagem" aria-hidden="true">
      <AnimatePresence mode="wait">
        {passo === 1 && (
          <motion.span
            key="digitando"
            className="visual-mensagem__digitando"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
          >
            <span />
            <span />
            <span />
          </motion.span>
        )}
        {passo >= 2 && (
          <motion.span
            key="balao"
            className="visual-mensagem__balao"
            initial={{ opacity: 0, y: 12, scale: 0.92 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0 }}
            transition={{ type: 'spring', stiffness: 320, damping: 24 }}
          >
            <MessageCircle size={14} strokeWidth={2} />
            {visual.texto}
          </motion.span>
        )}
      </AnimatePresence>
    </div>
  );
}

function Proposta({ visual, ativo }) {
  const passo = useCiclo(2, { intervalo: 1300, pausa: 2600, ativo });
  return (
    <div className="visual visual-proposta" aria-hidden="true">
      <span className="visual-proposta__titulo">{visual.titulo}</span>
      {[0.92, 0.78, 0.86, 0.6, 0.72].map((largura, i) => (
        <span key={i} className="visual-proposta__linha" style={{ width: `${largura * 100}%` }} />
      ))}
      <AnimatePresence>
        {passo >= 1 && (
          <motion.span
            className="visual-proposta__carimbo"
            initial={{ opacity: 0, scale: 2.2, rotate: -4 }}
            animate={{ opacity: 1, scale: 1, rotate: -14 }}
            exit={{ opacity: 0 }}
            transition={{ type: 'spring', stiffness: 420, damping: 18 }}
          >
            {visual.carimbo}
          </motion.span>
        )}
      </AnimatePresence>
    </div>
  );
}

function Construcao({ visual, ativo }) {
  const passo = useCiclo(4, { intervalo: 750, pausa: 2600, ativo });
  const bloco = (n, classe) => (
    <motion.span
      className={`visual-construcao__bloco ${classe}${passo >= n ? ' visual-construcao__bloco--pronto' : ''}`}
      initial={false}
      animate={{ opacity: passo >= n ? 1 : 0.5 }}
      transition={{ duration: 0.5, ease: SUAVE }}
    />
  );
  return (
    <div className="visual visual-construcao" aria-hidden="true">
      <div className="visual-construcao__barra">
        <span className="visual-construcao__bolinhas">
          <i />
          <i />
          <i />
        </span>
        <span className="visual-construcao__url">{visual.endereco}</span>
      </div>
      <div className="visual-construcao__pagina">
        {bloco(1, 'visual-construcao__bloco--titulo')}
        {bloco(2, 'visual-construcao__bloco--texto')}
        {bloco(2, 'visual-construcao__bloco--texto-curto')}
        <div className="visual-construcao__linha">
          {bloco(3, 'visual-construcao__bloco--botao')}
          {bloco(4, 'visual-construcao__bloco--imagem')}
        </div>
      </div>
    </div>
  );
}

function Suporte({ visual, ativo }) {
  return (
    <div className={`visual visual-suporte${ativo ? ' visual-suporte--vivo' : ''}`} aria-hidden="true">
      <svg viewBox="0 0 240 60" className="visual-suporte__pulso" preserveAspectRatio="none">
        <polyline
          points="0,32 60,32 74,32 84,12 96,50 108,22 118,32 160,32 172,32 180,20 190,42 198,32 240,32"
          fill="none"
        />
      </svg>
      <span className="visual-suporte__rotulo">
        <span className="visual-suporte__ponto" />
        {visual.texto}
      </span>
    </div>
  );
}

const VISUAIS = { mensagem: Mensagem, proposta: Proposta, construcao: Construcao, suporte: Suporte };

export default function VisualEtapa({ visual, ativo }) {
  const Visual = VISUAIS[visual.tipo];
  return Visual ? <Visual visual={visual} ativo={ativo} /> : null;
}
