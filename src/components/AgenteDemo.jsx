import { useState, useRef, useEffect } from 'react';
import { useReducedMotion } from 'framer-motion';
import { demoAgente } from '../data/conteudo';
import './AgenteDemo.css';

/**
 * Demonstração real do agente de WhatsApp: o visitante toca numa pergunta e
 * recebe a resposta, com o atraso de digitação no meio.
 *
 * É interativo de propósito. Um print falso de conversa montado com divs
 * seria só decoração; aqui a pessoa usa a coisa e entende o produto.
 */
export default function AgenteDemo() {
  const semMovimento = useReducedMotion();
  const [mensagens, setMensagens] = useState([]);
  const [digitando, setDigitando] = useState(false);
  const [usadas, setUsadas] = useState([]);
  const temporizador = useRef(null);

  useEffect(() => () => clearTimeout(temporizador.current), []);

  const restantes = demoAgente.perguntas.filter(
    (p) => !usadas.includes(p.pergunta)
  );

  const perguntar = (item) => {
    if (digitando) return;

    setMensagens((atual) => [...atual, { de: 'cliente', texto: item.pergunta }]);
    setUsadas((atual) => [...atual, item.pergunta]);

    const responder = () => {
      setDigitando(false);
      setMensagens((atual) => [...atual, { de: 'agente', texto: item.resposta }]);
    };

    if (semMovimento) {
      responder();
      return;
    }

    setDigitando(true);
    temporizador.current = setTimeout(responder, 900);
  };

  const reiniciar = () => {
    clearTimeout(temporizador.current);
    setDigitando(false);
    setMensagens([]);
    setUsadas([]);
  };

  return (
    <div className="agente">
      <div className="agente__topo">
        <span className="agente__rotulo">{demoAgente.rotulo}</span>
        <span className="agente__hora">{demoAgente.horario}</span>
      </div>

      <div className="agente__thread" aria-live="polite">
        {mensagens.length === 0 && (
          <p className="agente__vazio">{demoAgente.titulo}</p>
        )}

        {mensagens.map((m, i) => (
          <p
            key={`${m.de}-${i}`}
            className={`agente__balao agente__balao--${m.de}`}
          >
            {m.texto}
          </p>
        ))}

        {digitando && (
          <p className="agente__balao agente__balao--agente agente__digitando">
            <span aria-hidden="true" />
            <span aria-hidden="true" />
            <span aria-hidden="true" />
            <span className="pular-visual">Respondendo</span>
          </p>
        )}
      </div>

      <div className="agente__acoes">
        {restantes.map((item) => (
          <button
            type="button"
            key={item.pergunta}
            className="agente__chip"
            onClick={() => perguntar(item)}
            disabled={digitando}
          >
            {item.pergunta}
          </button>
        ))}

        {restantes.length === 0 && (
          <button type="button" className="agente__chip" onClick={reiniciar}>
            {demoAgente.reiniciar}
          </button>
        )}
      </div>
    </div>
  );
}
