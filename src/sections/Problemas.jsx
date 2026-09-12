import Reveal from '../components/Reveal';
import { problemas } from '../data/conteudo';
import './Problemas.css';

export default function Problemas() {
  return (
    <section id="solucoes" className="faixa problemas">
      <div className="quadro">
        {/* Cabeçalho: título à esquerda, texto de apoio deslocado à direita
            e alinhado pela base. */}
        <div className="grade problemas__cabecalho">
          <Reveal className="problemas__cabecalho-titulo">
            <p className="olho">{problemas.olho}</p>
            <h2 className="d-secao problemas__titulo">{problemas.titulo}</h2>
          </Reveal>

          <Reveal className="problemas__cabecalho-texto" atraso={0.12}>
            <p className="lead">{problemas.texto}</p>
          </Reveal>
        </div>

        <ol className="problemas__lista">
          {problemas.itens.map((item, i) => (
            <Reveal
              como="li"
              key={item.n}
              className={`problema${i % 2 === 1 ? ' problema--desloca' : ''}`}
            >
              <span className="numeral problema__n" aria-hidden="true">
                {item.n}
              </span>

              <div className="problema__dor">
                <h3 className="d-bloco problema__frase">{item.dor}</h3>
                <p className="problema__custo">{item.custo}</p>
              </div>

              <div className="problema__solucao">
                <p className="problema__rotulo">O que resolve</p>
                <h4 className="problema__solucao-titulo">{item.solucao}</h4>
                <p className="problema__solucao-texto">{item.comoResolve}</p>
              </div>
            </Reveal>
          ))}
        </ol>
      </div>
    </section>
  );
}
