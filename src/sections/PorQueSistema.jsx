import { useRef } from 'react';
import { motion, useInView, useReducedMotion } from 'framer-motion';
import { X, MessageCircle } from 'lucide-react';
import Reveal from '../components/Reveal';
import Adiado from '../components/Adiado';
import SecaoComTransicao from '../components/SecaoComTransicao';
import Comparador from '../components/efeitos/Comparador';
import PainelSistema from '../components/painel/PainelSistema';
import { SUAVE } from '../lib/animacoes';
import { porQueSistema } from '../data/conteudo';
import './PorQueSistema.css';

const { caos } = porQueSistema;

/* O lado "sem sistema": caderno, lembrete colado, conversa solta e
   planilha pela metade, tudo tremendo de leve na mesa. */
function MesaBaguncada() {
  return (
    <div className="mesa" aria-hidden="true">
      <div className="mesa__caderno mesa__tremor">
        {caos.caderno.map((linha, i) => (
          <span key={linha} className={i % 2 === 1 ? 'mesa__riscado' : undefined}>
            {linha}
          </span>
        ))}
      </div>

      {caos.lembretes.map((texto, i) => (
        <span key={texto} className={`mesa__lembrete mesa__lembrete--${i} mesa__tremor`}>
          {texto}
        </span>
      ))}

      <div className="mesa__mensagem mesa__tremor">
        <MessageCircle size={13} strokeWidth={2} />
        {caos.mensagem}
      </div>

      <div className="mesa__planilha mesa__tremor">
        {caos.planilha.map((linha, i) => (
          <div key={i} className={`mesa__celulas${i === 0 ? ' mesa__celulas--cabeca' : ''}`}>
            {linha.map((celula, j) => (
              <span key={j}>{celula}</span>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}

function Linha({ item, indice }) {
  const ref = useRef(null);
  const semMovimento = useReducedMotion();
  const naTela = useInView(ref, { once: true, amount: 0.7 });
  const feito = naTela || semMovimento;

  return (
    <Reveal como="div" className={`porque__linha${feito ? ' porque__linha--feita' : ''}`} atraso={indice * 0.05}>
      <p ref={ref} className="porque__celula porque__celula--sem">
        <X className="porque__icone" size={15} strokeWidth={2.2} aria-hidden="true" />
        <span className="porque__etiqueta">{porQueSistema.rotuloSem}: </span>
        {/* Envoltório porque o pai é flex: filho direto de flex vira bloco,
            e o risco precisa de um inline pra repetir em cada linha. */}
        <span>
          <span className="porque__texto-sem">{item.sem}</span>
        </span>
      </p>
      <p className="porque__celula porque__celula--com">
        <svg className="porque__icone porque__check" viewBox="0 0 24 24" width="16" height="16" aria-hidden="true">
          <motion.path
            d="M4 12.5l5 5L20 6.5"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.4"
            strokeLinecap="round"
            strokeLinejoin="round"
            initial={false}
            animate={{ pathLength: feito ? 1 : 0, opacity: feito ? 1 : 0 }}
            transition={{ duration: 0.6, delay: 0.45, ease: SUAVE }}
          />
        </svg>
        <span className="porque__etiqueta">{porQueSistema.rotuloCom}: </span>
        {item.com}
      </p>
    </Reveal>
  );
}

/**
 * Argumento em vez de prova: o mesmo dia de trabalho, com e sem sistema.
 * Primeiro em imagem (comparador arrastável), depois item a item — o lado
 * ruim é riscado na hora em que a linha entra na tela.
 */
export default function PorQueSistema() {
  return (
    <SecaoComTransicao id="porque" data-brasa="porque" className="faixa porque">
      <div className="quadro">
        <div className="grade porque__cabecalho">
          <Reveal className="porque__cabecalho-titulo">
            <h2 className="d-secao">{porQueSistema.titulo}</h2>
          </Reveal>

          <Reveal className="porque__cabecalho-texto" atraso={0.12}>
            <p className="lead">{porQueSistema.texto}</p>
          </Reveal>
        </div>

        <Adiado className="porque__comparador">
          <Comparador
            antes={<MesaBaguncada />}
            depois={<PainelSistema estatico />}
            rotuloAntes={porQueSistema.rotuloSem}
            rotuloDepois={porQueSistema.rotuloCom}
            rotuloAlca={porQueSistema.rotuloAlca}
            instrucao={porQueSistema.instrucao}
          />
        </Adiado>

        <div className="porque__tabela">
          <div className="porque__linha porque__linha--cabecalho" aria-hidden="true">
            <span className="porque__rotulo porque__rotulo--sem">{porQueSistema.rotuloSem}</span>
            <span className="porque__rotulo porque__rotulo--com">{porQueSistema.rotuloCom}</span>
          </div>

          {porQueSistema.itens.map((item, i) => (
            <Linha key={item.sem} item={item} indice={i} />
          ))}
        </div>
      </div>
    </SecaoComTransicao>
  );
}
