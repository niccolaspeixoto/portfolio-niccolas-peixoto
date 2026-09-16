import Reveal from '../components/Reveal';
import { hero } from '../data/conteudo';
import './Pilares.css';

/**
 * As três frentes de trabalho. O primeiro item ocupa o dobro de área dos
 * outros dois de propósito: três caixas idênticas seriam a estrutura
 * preguiçosa que o resto da página evita.
 */
export default function Pilares() {
  const [principal, ...demais] = hero.pilares;

  return (
    <section className="pilares">
      <div className="quadro">
        <ul className="pilares__grade">
          <Reveal como="li" className="pilar pilar--principal">
            <h2 className="d-bloco pilar__titulo">{principal.titulo}</h2>
            <p className="pilar__texto">{principal.texto}</p>
          </Reveal>

          {demais.map((pilar, i) => (
            <Reveal como="li" key={pilar.titulo} className="pilar" atraso={0.08 * (i + 1)}>
              <h2 className="d-bloco pilar__titulo">{pilar.titulo}</h2>
              <p className="pilar__texto">{pilar.texto}</p>
            </Reveal>
          ))}
        </ul>

        <Reveal className="pilares__selos" atraso={0.2}>
          <ul>
            {hero.selos.map((selo) => (
              <li key={selo} className="miudo">
                {selo}
              </li>
            ))}
          </ul>
        </Reveal>
      </div>
    </section>
  );
}
