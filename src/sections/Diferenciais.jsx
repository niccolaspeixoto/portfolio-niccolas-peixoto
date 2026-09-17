import { motion, useReducedMotion } from 'framer-motion';
import Reveal from '../components/Reveal';
import SecaoComTransicao from '../components/SecaoComTransicao';
import { fioCresce, janela } from '../lib/animacoes';
import { diferenciais } from '../data/conteudo';
import './Diferenciais.css';

/**
 * Lista editorial em coluna única, separada por fios. Sai o grid de duas
 * colunas iguais: a seção precisava de uma família de layout própria.
 */
export default function Diferenciais() {
  const semMovimento = useReducedMotion();

  return (
    <SecaoComTransicao className="faixa diferenciais" comEscala={false}>
      <div className="quadro grade diferenciais__grade">
        {/* O título acompanha a rolagem enquanto os pontos passam ao lado. */}
        <div className="diferenciais__titulo-area">
          <Reveal className="diferenciais__fixo">
            <h2 className="d-secao">{diferenciais.titulo}</h2>
          </Reveal>
        </div>

        <ul className="diferenciais__lista">
          {diferenciais.itens.map((item, i) => (
            <Reveal como="li" key={item.titulo} className="diferencial">
              {/* O fio "desenha" da esquerda pra direita ao entrar na tela,
                  em vez de já existir parado. O primeiro item não tem fio
                  em cima, igual antes. */}
              {i > 0 && (
                <motion.span
                  className="diferencial__fio"
                  aria-hidden="true"
                  variants={semMovimento ? undefined : fioCresce}
                  initial={semMovimento ? undefined : 'oculto'}
                  whileInView={semMovimento ? undefined : 'visivel'}
                  viewport={janela}
                />
              )}

              <h3 className="diferencial__titulo">{item.titulo}</h3>
              <p className="diferencial__texto">{item.texto}</p>
            </Reveal>
          ))}
        </ul>
      </div>
    </SecaoComTransicao>
  );
}
