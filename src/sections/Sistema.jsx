import { useRef } from 'react';
import { useInView, useReducedMotion } from 'framer-motion';
import Reveal from '../components/Reveal';
import Adiado from '../components/Adiado';
import SecaoComTransicao from '../components/SecaoComTransicao';
import {
  ModuloAgenda,
  ModuloClientes,
  ModuloEstoque,
  ModuloFinanceiro,
} from '../components/painel/Modulos';
import { useBordaBrilhante } from '../lib/useBordaBrilhante';
import { useMidia, PONTEIRO_FINO } from '../lib/useMidia';
import { sistema } from '../data/conteudo';
import './Sistema.css';

/* Posição de cada módulo no bento. `indice` aponta pro item de
   sistema.itens (texto); `Modulo` é a peça animada que mostra o módulo
   funcionando. */
const CELULAS = [
  { indice: 1, Modulo: ModuloAgenda, tamanho: 'larga' },
  { indice: 0, Modulo: ModuloClientes, tamanho: 'estreita' },
  { indice: 2, Modulo: ModuloEstoque, tamanho: 'estreita' },
  { indice: 3, Modulo: ModuloFinanceiro, tamanho: 'larga' },
];

function Celula({ item, Modulo, tamanho, atraso }) {
  const ref = useRef(null);
  const semMovimento = useReducedMotion();
  const ponteiroFino = useMidia(PONTEIRO_FINO);
  const naTela = useInView(ref, { amount: 0.35 });
  useBordaBrilhante(ref, ponteiroFino && !semMovimento);

  return (
    <Reveal como="li" className={`modulo modulo--${tamanho}`} atraso={atraso}>
      <div ref={ref} className="modulo__cartao borda-brilhante">
        <Adiado className="modulo__visual">
          <Modulo ativo={naTela} />
        </Adiado>
        <div className="modulo__texto">
          <h3 className="modulo__titulo">{item.titulo}</h3>
          <p className="modulo__descricao">{item.texto}</p>
        </div>
      </div>
    </Reveal>
  );
}

/**
 * Os quatro módulos num bento assimétrico (Bento Grid — Manu Arora /
 * Aceternity, MIT: https://21st.dev/@manuarora700/components/bento-grid).
 * Cada célula mostra o módulo trabalhando em vez de descrever o módulo, e
 * a borda acende apontando pro cursor (Glowing Effect, mesma fonte).
 */
export default function Sistema() {
  return (
    <SecaoComTransicao data-brasa="sistema" className="faixa sistema">
      <div className="quadro">
        <div className="grade sistema__cabecalho">
          <Reveal className="sistema__cabecalho-titulo">
            <h2 className="d-secao">{sistema.titulo}</h2>
          </Reveal>

          <Reveal className="sistema__cabecalho-texto" atraso={0.12}>
            <p className="lead">{sistema.texto}</p>
          </Reveal>
        </div>

        <ul className="sistema__bento">
          {CELULAS.map(({ indice, Modulo, tamanho }, i) => (
            <Celula
              key={sistema.itens[indice].titulo}
              item={sistema.itens[indice]}
              Modulo={Modulo}
              tamanho={tamanho}
              atraso={(i % 2) * 0.08}
            />
          ))}
        </ul>
      </div>
    </SecaoComTransicao>
  );
}
