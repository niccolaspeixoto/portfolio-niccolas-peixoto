import { useRef } from 'react';
import { motion, useReducedMotion, useScroll, useTransform } from 'framer-motion';
import { ArrowUpRight, ArrowUp } from 'lucide-react';
import Letreiro from './Letreiro';
import Adiado from './Adiado';
import { marca, rodape, navegacao } from '../data/conteudo';
import './Rodape.css';

/**
 * O rodapé fica atrás da chamada final (z-index menor) e o conteúdo dele
 * sobe mais devagar que a página: parece estar sendo revelado por baixo
 * da seção de cima, que "levanta" (ela tem fundo opaco e cantos
 * arredondados embaixo — ver Chamada.css).
 */
export default function Rodape() {
  const ref = useRef(null);
  const semMovimento = useReducedMotion();
  const ano = new Date().getFullYear();

  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end end'] });
  const sobe = useTransform(scrollYProgress, [0, 1], ['-28%', '0%']);

  return (
    <footer className="rodape" ref={ref}>
      <motion.div className="rodape__interno" style={semMovimento ? undefined : { y: sobe }}>
        <div className="quadro grade rodape__grade">
          <div className="rodape__marca">
            <span className="rodape__nome">{marca.nome}</span>
            <p className="rodape__frase">{rodape.frase}</p>
          </div>

          <nav className="rodape__coluna rodape__coluna--secoes" aria-label="Seções do site">
            <h2 className="rodape__titulo">{rodape.navegar}</h2>
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

        <Adiado className="rodape__letreiro" margem="400px 0px">
          <Letreiro texto={rodape.letreiro} />
        </Adiado>

        <div className="quadro rodape__base">
          <span className="miudo">
            © {ano} {marca.nome}
          </span>

          <a href="#topo" className="rodape__topo miudo">
            {rodape.voltarTopo}
            <ArrowUp size={13} strokeWidth={1.8} />
          </a>
        </div>
      </motion.div>
    </footer>
  );
}
