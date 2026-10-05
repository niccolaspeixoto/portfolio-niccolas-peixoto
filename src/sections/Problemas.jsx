import { useEffect, useRef, useState } from 'react';
import { AnimatePresence, motion, useInView, useReducedMotion } from 'framer-motion';
import Reveal from '../components/Reveal';
import Adiado from '../components/Adiado';
import SecaoComTransicao from '../components/SecaoComTransicao';
import TextoRolagem from '../components/efeitos/TextoRolagem';
import { CENAS } from './problemas/Cenas';
import { useMidia, DESKTOP } from '../lib/useMidia';
import { SUAVE } from '../lib/animacoes';
import { problemas } from '../data/conteudo';
import './Problemas.css';

function Item({ item, indice, ativo, aoAtivar, cenaNoFluxo }) {
  const ref = useRef(null);
  // Faixa fina no meio da tela: o item vira o ativo quando cruza o centro.
  const noCentro = useInView(ref, { margin: '-48% 0px -48% 0px' });
  const naTela = useInView(ref, { amount: 0.25 });

  useEffect(() => {
    if (noCentro) aoAtivar(indice);
  }, [noCentro, indice, aoAtivar]);

  const Cena = CENAS[indice];

  return (
    <li ref={ref} className={`problema${ativo ? ' problema--ativo' : ''}`}>
      <span className="problema__n">{item.n}</span>
      <h3 className="d-bloco problema__frase">{item.dor}</h3>
      <p className="problema__custo">{item.custo}</p>

      <div className="problema__resposta">
        <h4 className="problema__solucao">{item.solucao}</h4>
        <p className="problema__solucao-texto">{item.comoResolve}</p>
      </div>

      {cenaNoFluxo && (
        <Adiado className="problema__cena-fluxo">
          <Cena ativa={naTela} />
        </Adiado>
      )}
    </li>
  );
}

/**
 * Os três problemas passam à esquerda; à direita, um único painel preso
 * (sticky) troca de cena conforme o item ativo — mecânica do Sticky Scroll
 * Reveal (Manu Arora / Aceternity, MIT:
 * https://21st.dev/@manuarora700/components/sticky-scroll-reveal).
 *
 * Um painel só, nunca uma pilha de cards sticky: a pilha antiga, com cards
 * de alturas diferentes, sobrepunha fragmentos de texto na troca.
 * No celular e com movimento reduzido não há painel preso — cada item
 * leva a própria cena logo abaixo.
 */
export default function Problemas() {
  const desktop = useMidia(DESKTOP);
  const semMovimento = useReducedMotion();
  const painelPreso = desktop && !semMovimento;
  const [ativo, setAtivo] = useState(0);
  const Cena = CENAS[ativo];

  return (
    <SecaoComTransicao id="solucoes" data-brasa="solucoes" className="faixa problemas" comEscala={false}>
      <div className="quadro">
        <div className="grade problemas__cabecalho">
          <Reveal className="problemas__cabecalho-titulo">
            <h2 className="d-secao">{problemas.titulo}</h2>
          </Reveal>

          <div className="problemas__cabecalho-texto">
            <TextoRolagem texto={problemas.texto} className="problemas__intro" />
          </div>
        </div>

        <div className={`problemas__corpo${painelPreso ? ' problemas__corpo--preso' : ''}`}>
          <ol className="problemas__lista">
            {problemas.itens.map((item, i) => (
              <Item
                key={item.n}
                item={item}
                indice={i}
                ativo={!painelPreso || ativo === i}
                aoAtivar={setAtivo}
                cenaNoFluxo={!painelPreso}
              />
            ))}
          </ol>

          {painelPreso && (
            <div className="problemas__painel">
              <div className="problemas__painel-fixo">
                <Adiado className="problemas__tela">
                  <AnimatePresence mode="wait" initial={false}>
                    <motion.div
                      key={ativo}
                      className="problemas__cena"
                      initial={{ opacity: 0, y: 30, scale: 0.97 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: -30, scale: 0.97 }}
                      transition={{ duration: 0.5, ease: SUAVE }}
                    >
                      <Cena ativa />
                    </motion.div>
                  </AnimatePresence>
                </Adiado>

                <div className="problemas__marcador" aria-hidden="true">
                  {problemas.itens.map((item, i) => (
                    <span
                      key={item.n}
                      className={`problemas__marca${i === ativo ? ' problemas__marca--ativa' : ''}`}
                    />
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </SecaoComTransicao>
  );
}
