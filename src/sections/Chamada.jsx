import { MessageCircle } from 'lucide-react';
import Reveal from '../components/Reveal';
import TituloLinhas from '../components/TituloLinhas';
import { SocialHighlightCards } from '../components/microkit/social-highlight-cards';
import { chamada, contato } from '../data/conteudo';
import './Chamada.css';

export default function Chamada() {
  return (
    <section id="contato" className="faixa chamada">
      <div className="quadro">
        <div className="chamada__caixa">
          {/* Contorno terracota deslocado atrás da caixa. */}
          <span className="chamada__eco" aria-hidden="true" />

          <TituloLinhas
            linhas={chamada.titulo}
            como="h2"
            className="d-secao chamada__titulo"
          />

          <Reveal className="chamada__rodape-interno" atraso={0.15}>
            <p className="lead chamada__lead">{chamada.texto}</p>

            <div className="chamada__acao">
              <a
                href={contato.whatsapp}
                target="_blank"
                rel="noreferrer"
                className="botao botao--cheio chamada__botao"
              >
                <MessageCircle size={17} strokeWidth={1.8} />
                {chamada.cta}
              </a>
              <span className="miudo chamada__numero">{contato.whatsappVisivel}</span>
            </div>
          </Reveal>

          <Reveal className="chamada__socials" atraso={0.25}>
            <p className="miudo chamada__socials-legenda">Ou encontre-me por aqui</p>
            <SocialHighlightCards />
          </Reveal>
        </div>
      </div>
    </section>
  );
}
