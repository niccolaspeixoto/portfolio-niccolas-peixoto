import Reveal from '../components/Reveal';
import AgenteDemo from '../components/AgenteDemo';
import SecaoComTransicao from '../components/SecaoComTransicao';
import { problemas } from '../data/conteudo';
import './Problemas.css';

/**
 * Um problema por vez, cada um revelando ao entrar na tela.
 *
 * Antes os três cards usavam uma pilha fixa (position: sticky, um cobrindo
 * o outro). A altura deles é bem diferente (o primeiro tem a demo do
 * agente embutida, os outros dois não), e essa técnica só fica limpa
 * quando os itens têm altura parecida: com essa diferença, a troca de um
 * card pro outro ficava torta e sobrava fragmento de texto sobreposto na
 * tela. Revelação simples aqui, sem pin, resolve sem esse risco.
 */
export default function Problemas() {
  return (
    <SecaoComTransicao id="solucoes" className="faixa problemas">
      <div className="quadro">
        <div className="grade problemas__cabecalho">
          <Reveal className="problemas__cabecalho-titulo">
            <h2 className="d-secao">{problemas.titulo}</h2>
          </Reveal>

          <Reveal className="problemas__cabecalho-texto" atraso={0.12}>
            <p className="lead">{problemas.texto}</p>
          </Reveal>
        </div>

        <ul className="problemas__pilha">
          {problemas.itens.map((item, i) => (
            <Reveal como="li" key={item.dor} className="problema">
              <div className="problema__cartao">
                <div className="problema__dor">
                  <h3 className="d-bloco problema__frase">{item.dor}</h3>
                  <p className="problema__custo">{item.custo}</p>
                </div>

                <div className="problema__resposta">
                  <h4 className="problema__solucao">{item.solucao}</h4>
                  <p className="problema__solucao-texto">{item.comoResolve}</p>

                  {/* Só a primeira dor ganha a demonstração: é a que dá
                      para mostrar funcionando em vez de descrever. */}
                  {i === 0 && <AgenteDemo />}
                </div>
              </div>
            </Reveal>
          ))}
        </ul>
      </div>
    </SecaoComTransicao>
  );
}
