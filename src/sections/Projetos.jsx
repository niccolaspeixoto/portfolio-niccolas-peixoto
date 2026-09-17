import { ArrowUpRight } from 'lucide-react';
import { motion, useReducedMotion } from 'framer-motion';
import Reveal from '../components/Reveal';
import SecaoComTransicao from '../components/SecaoComTransicao';
import { janela, SUAVE } from '../lib/animacoes';
import { projetos } from '../data/conteudo';
import './Projetos.css';

export default function Projetos() {
  const semMovimento = useReducedMotion();

  return (
    <SecaoComTransicao id="projetos" className="faixa projetos">
      <div className="quadro">
        <div className="grade projetos__cabecalho">
          <Reveal className="projetos__cabecalho-titulo">
            <h2 className="d-secao projetos__titulo">{projetos.titulo}</h2>
          </Reveal>

          <Reveal className="projetos__cabecalho-texto" atraso={0.12}>
            <p className="lead">{projetos.texto}</p>
          </Reveal>
        </div>

        <div className="projetos__galeria">
          {projetos.itens.map((item, i) => {
            const Envoltorio = item.url ? 'a' : 'div';
            const props = item.url
              ? { href: item.url, target: '_blank', rel: 'noreferrer' }
              : {};

            return (
              <Reveal
                como="article"
                key={item.cliente}
                className={`projeto projeto--${item.tamanho}`}
                atraso={i % 2 === 1 ? 0.1 : 0}
              >
                <Envoltorio className="projeto__alvo" {...props}>
                  <div className="projeto__moldura">
                    {/* Sem width/height: a moldura já reserva o espaço pelo
                        aspect-ratio, e os prints têm proporções diferentes
                        entre si. */}
                    <img
                      src={item.imagem}
                      alt={`Tela inicial do site de ${item.cliente}`}
                      loading="lazy"
                    />

                    {/* Cortina opaca que se recolhe por cima da imagem ao
                        entrar na tela — visualmente é o mesmo wipe de cima
                        pra baixo que um clip-path faria, mas via `scaleY`
                        (transform), que o Framer Motion detecta de forma
                        confiável com whileInView. clipPath não disparava o
                        onViewportEnter deste elemento em nenhum teste,
                        isolado ou não — parece uma limitação da versão
                        instalada da biblioteca com essa propriedade
                        especificamente. */}
                    {!semMovimento && (
                      <motion.span
                        className="projeto__cortina"
                        aria-hidden="true"
                        initial={{ scaleY: 1 }}
                        whileInView={{ scaleY: 0 }}
                        transition={{ duration: 0.9, ease: SUAVE }}
                        viewport={janela}
                      />
                    )}
                  </div>

                  <div className="projeto__pe">
                    <div className="projeto__info">
                      <h3 className="projeto__cliente">{item.cliente}</h3>
                      <p className="projeto__meta miudo">
                        {item.nicho} <span aria-hidden="true">·</span> {item.tipo}
                      </p>
                    </div>

                    <span
                      className={`etiqueta projeto__status${
                        item.status === 'No ar' ? ' etiqueta--ativo' : ''
                      }`}
                    >
                      {item.status}
                      {item.url && <ArrowUpRight size={13} strokeWidth={1.8} />}
                    </span>
                  </div>
                </Envoltorio>
              </Reveal>
            );
          })}
        </div>
      </div>
    </SecaoComTransicao>
  );
}
