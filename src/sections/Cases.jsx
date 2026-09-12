import { ArrowUpRight } from 'lucide-react';
import Reveal from '../components/Reveal';
import { cases } from '../data/conteudo';
import './Cases.css';

export default function Cases() {
  return (
    <section id="cases" className="faixa cases">
      <div className="quadro">
        <div className="grade cases__cabecalho">
          <Reveal className="cases__cabecalho-texto">
            <p className="olho">{cases.olho}</p>
            <h2 className="d-secao cases__titulo">{cases.titulo}</h2>
            <p className="lead cases__lead">{cases.texto}</p>
          </Reveal>
        </div>

        <div className="cases__lista">
          {cases.itens.map((item, i) => (
            <Reveal
              como="article"
              key={item.cliente}
              className={`caso${i % 2 === 1 ? ' caso--invertido' : ''}`}
            >
              {/* --- Identidade do cliente --- */}
              <div className="caso__identidade">
                <span
                  className={`etiqueta${item.status === 'No ar' ? ' etiqueta--ativo' : ''}`}
                >
                  {item.status}
                </span>

                <h3 className="d-bloco caso__cliente">{item.cliente}</h3>
                <p className="caso__nicho">{item.nicho}</p>

                {item.url ? (
                  <a
                    href={item.url}
                    target="_blank"
                    rel="noreferrer"
                    className="link-risco caso__link"
                  >
                    {item.site}
                    <ArrowUpRight size={14} strokeWidth={1.8} />
                  </a>
                ) : (
                  <span className="caso__dominio miudo">{item.site}</span>
                )}
              </div>

              {/* --- O caso em três tempos --- */}
              <dl className="caso__detalhe">
                <div className="caso__par">
                  <dt className="caso__rotulo">O problema</dt>
                  <dd className="caso__valor">{item.problema}</dd>
                </div>

                <div className="caso__par">
                  <dt className="caso__rotulo">O que foi construído</dt>
                  <dd className="caso__valor">{item.solucao}</dd>
                </div>

                <div className="caso__par caso__par--fecho">
                  <dt className="caso__rotulo caso__rotulo--fecho">O que mudou</dt>
                  <dd className="caso__valor caso__valor--fecho">{item.resultado}</dd>
                </div>
              </dl>

              {/* Só aparece quando houver citação real do cliente. */}
              {item.depoimento && (
                <blockquote className="caso__citacao">
                  <p className="d-bloco">“{item.depoimento.texto}”</p>
                  <footer className="miudo">
                    {item.depoimento.autor} — {item.depoimento.cargo}
                  </footer>
                </blockquote>
              )}
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
