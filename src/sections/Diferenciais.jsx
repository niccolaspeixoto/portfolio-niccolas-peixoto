import Reveal from '../components/Reveal';
import { diferenciais } from '../data/conteudo';
import './Diferenciais.css';

export default function Diferenciais() {
  return (
    <section className="faixa diferenciais">
      <div className="quadro grade diferenciais__grade">
        {/* O título acompanha a rolagem enquanto os pontos passam ao lado. */}
        <div className="diferenciais__titulo-area">
          <Reveal className="diferenciais__fixo">
            <p className="olho">{diferenciais.olho}</p>
            <h2 className="d-secao diferenciais__titulo">{diferenciais.titulo}</h2>
          </Reveal>
        </div>

        <ul className="diferenciais__lista">
          {diferenciais.itens.map((item, i) => (
            <Reveal como="li" key={item.titulo} className="diferencial" atraso={(i % 2) * 0.1}>
              <span className="diferencial__marca" aria-hidden="true" />
              <h3 className="diferencial__titulo">{item.titulo}</h3>
              <p className="diferencial__texto">{item.texto}</p>
            </Reveal>
          ))}
        </ul>
      </div>
    </section>
  );
}
