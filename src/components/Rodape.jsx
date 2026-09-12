import { ArrowUpRight, ArrowUp } from 'lucide-react';
import { marca, rodape, navegacao } from '../data/conteudo';
import './Rodape.css';

export default function Rodape() {
  const ano = new Date().getFullYear();

  return (
    <footer className="rodape">
      <div className="quadro grade rodape__grade">
        <div className="rodape__marca">
          <span className="rodape__nome">{marca.nome}</span>
          <p className="rodape__frase">{rodape.frase}</p>
        </div>

        <nav className="rodape__coluna rodape__coluna--secoes" aria-label="Seções do site">
          <h2 className="rodape__titulo">Navegar</h2>
          <ul>
            {navegacao.map((item) => (
              <li key={item.href}>
                <a href={item.href} className="rodape__link">
                  {item.rotulo}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        {rodape.colunas.map((coluna) => (
          <div className="rodape__coluna" key={coluna.titulo}>
            <h2 className="rodape__titulo">{coluna.titulo}</h2>
            <ul>
              {coluna.links.map((link) => (
                <li key={link.rotulo}>
                  <a
                    href={link.href}
                    target={link.href.startsWith('http') ? '_blank' : undefined}
                    rel={link.href.startsWith('http') ? 'noreferrer' : undefined}
                    className="rodape__link rodape__link--par"
                  >
                    <span className="rodape__link-rotulo">{link.rotulo}</span>
                    <span className="rodape__link-valor">
                      {link.valor}
                      <ArrowUpRight size={12} strokeWidth={1.8} />
                    </span>
                  </a>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      <div className="quadro rodape__base">
        <span className="miudo">
          © {ano} {marca.nome}
        </span>

        <a href="#topo" className="rodape__topo miudo">
          Voltar ao topo
          <ArrowUp size={13} strokeWidth={1.8} />
        </a>
      </div>
    </footer>
  );
}
