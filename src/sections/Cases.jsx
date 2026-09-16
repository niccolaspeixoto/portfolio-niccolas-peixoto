import { ArrowUpRight } from 'lucide-react';
import Reveal from '../components/Reveal';
import { cases } from '../data/conteudo';
import './Cases.css';

/**
 * Trilha horizontal com encaixe nativo. Não sequestra a rolagem vertical:
 * no celular vira swipe, no teclado vira scroll da região. Cada case fica
 * inteiro na tela em vez de virar uma coluna estreita de texto.
 */
export default function Cases() {
  return (
    <section id="cases" className="faixa cases">
      <div className="quadro">
        <div className="grade cases__cabecalho">
          <Reveal className="cases__cabecalho-texto">
            <h2 className="d-secao">{cases.titulo}</h2>
            <p className="lead cases__lead">{cases.texto}</p>
          </Reveal>
        </div>
      </div>

      <ol
        className="cases__trilha"
        tabIndex={0}
        role="region"
        aria-label="Cases, role para o lado para ver todos"
      >
        {cases.itens.map((item) => (
          <li className="caso" key={item.cliente}>
            <div className="caso__topo">
              <div>
                <h3 className="caso__cliente">{item.cliente}</h3>
                <p className="caso__nicho">{item.nicho}</p>
              </div>

              <span
                className={`etiqueta${item.status === 'No ar' ? ' etiqueta--ativo' : ''}`}
              >
                {item.status}
              </span>
            </div>

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
                <dt className="caso__rotulo">O que mudou</dt>
                <dd className="caso__valor caso__valor--fecho">{item.resultado}</dd>
              </div>
            </dl>

            {/* Só aparece quando houver citação real do cliente. */}
            {item.depoimento && (
              <blockquote className="caso__citacao">
                <p>“{item.depoimento.texto}”</p>
                <footer className="miudo">
                  {item.depoimento.autor}, {item.depoimento.cargo}
                </footer>
              </blockquote>
            )}

            <div className="caso__pe">
              {item.url ? (
                <a
                  href={item.url}
                  target="_blank"
                  rel="noreferrer"
                  className="link-risco"
                >
                  {item.site}
                  <ArrowUpRight size={14} strokeWidth={1.8} />
                </a>
              ) : (
                <span className="miudo">{item.site}</span>
              )}
            </div>
          </li>
        ))}
      </ol>
    </section>
  );
}
