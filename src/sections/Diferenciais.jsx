import Reveal from '../components/Reveal';
import { diferenciais } from '../data/conteudo';
import './Diferenciais.css';

/**
 * Lista editorial em coluna única, separada por fios. Sai o grid de duas
 * colunas iguais: a seção precisava de uma família de layout própria.
 */
export default function Diferenciais() {
  return (
    <section className="faixa diferenciais">
      <div className="quadro grade diferenciais__grade">
        {/* O título acompanha a rolagem enquanto os pontos passam ao lado. */}
        <div className="diferenciais__titulo-area">
          <Reveal className="diferenciais__fixo">
            <h2 className="d-secao">{diferenciais.titulo}</h2>
          </Reveal>
        </div>

        <ul className="diferenciais__lista">
          {diferenciais.itens.map((item) => (
            <Reveal como="li" key={item.titulo} className="diferencial">
              <h3 className="diferencial__titulo">{item.titulo}</h3>
              <p className="diferencial__texto">{item.texto}</p>
            </Reveal>
          ))}
        </ul>
      </div>
    </section>
  );
}
