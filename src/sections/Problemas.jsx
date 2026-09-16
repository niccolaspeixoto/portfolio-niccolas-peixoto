import { useRef } from 'react';
import { motion, useScroll, useTransform, useReducedMotion } from 'framer-motion';
import Reveal from '../components/Reveal';
import AgenteDemo from '../components/AgenteDemo';
import { problemas } from '../data/conteudo';
import './Problemas.css';

/**
 * Um problema por vez, preso no topo da tela enquanto o próximo sobe por
 * cima. É o único momento da página em que a animação conduz a leitura em
 * vez de só acompanhar: as três dores se empilham como custo acumulando.
 */
function Problema({ item, indice, total }) {
  const alvo = useRef(null);
  const semMovimento = useReducedMotion();

  /* De "preso no topo" até "empurrado para fora": usado para encolher e
     apagar a carta conforme a de baixo toma a tela. */
  const { scrollYProgress } = useScroll({
    target: alvo,
    offset: ['start start', 'end start'],
  });
  const escala = useTransform(scrollYProgress, [0, 1], [1, 0.93]);
  const opacidade = useTransform(scrollYProgress, [0, 1], [1, 0.35]);

  const ultima = indice === total - 1;
  const estilo = semMovimento || ultima ? undefined : { scale: escala, opacity: opacidade };

  return (
    <li className="problema" ref={alvo}>
      <motion.article className="problema__cartao" style={estilo}>
        <div className="problema__dor">
          <h3 className="d-bloco problema__frase">{item.dor}</h3>
          <p className="problema__custo">{item.custo}</p>
        </div>

        <div className="problema__resposta">
          <h4 className="problema__solucao">{item.solucao}</h4>
          <p className="problema__solucao-texto">{item.comoResolve}</p>

          {/* Só a primeira dor ganha a demonstração: é a que dá para mostrar
              funcionando em vez de descrever. */}
          {indice === 0 && <AgenteDemo />}
        </div>
      </motion.article>
    </li>
  );
}

export default function Problemas() {
  return (
    <section id="solucoes" className="faixa problemas">
      <div className="quadro">
        <div className="grade problemas__cabecalho">
          <Reveal className="problemas__cabecalho-titulo">
            <h2 className="d-secao">{problemas.titulo}</h2>
          </Reveal>

          <Reveal className="problemas__cabecalho-texto" atraso={0.12}>
            <p className="lead">{problemas.texto}</p>
          </Reveal>
        </div>

        <ol className="problemas__pilha">
          {problemas.itens.map((item, i) => (
            <Problema
              key={item.dor}
              item={item}
              indice={i}
              total={problemas.itens.length}
            />
          ))}
        </ol>
      </div>
    </section>
  );
}
