import { AnimatePresence, motion } from 'framer-motion';
import { Search, Link2, CheckCheck } from 'lucide-react';
import { useCiclo } from '../../lib/useCiclo';
import { SUAVE } from '../../lib/animacoes';
import { problemas } from '../../data/conteudo';
import './Cenas.css';

const { whats, busca, caos } = problemas.ilustracoes;

const entra = {
  initial: { opacity: 0, y: 14, scale: 0.94 },
  animate: { opacity: 1, y: 0, scale: 1 },
  transition: { type: 'spring', stiffness: 320, damping: 26 },
};

/* --------------------------------------------------------------------------
   01 — A mesma pergunta chegando de novo e de novo. O negócio manda o link
   do site uma vez, as perguntas param, e a próxima mensagem já chega pronta
   pra marcar horário.
   Passos: 1–5 perguntas · 6 link do site · 7 a conversa se acalma.
   -------------------------------------------------------------------------- */
export function CenaWhats({ ativa }) {
  const passo = useCiclo(10, { intervalo: 620, pausa: 2600, ativo: ativa });
  const quantas = Math.min(passo, whats.perguntas.length);
  const calma = passo >= 7;

  return (
    <div className="cena cena-whats" aria-hidden="true">
      <header className="cena-whats__topo">
        <span className="cena-whats__avatar" />
        <span className="cena-whats__quem">
          <strong>{whats.contato}</strong>
          <small>{calma ? whats.online : `${quantas} ${whats.status}`}</small>
        </span>
        <AnimatePresence>
          {!calma && quantas > 0 && (
            <motion.span
              key={quantas}
              className="cena-whats__contador"
              initial={{ scale: 0.4 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0, opacity: 0 }}
              transition={{ type: 'spring', stiffness: 500, damping: 18 }}
            >
              {quantas}
            </motion.span>
          )}
        </AnimatePresence>
      </header>

      <div className="cena-whats__conversa">
        <AnimatePresence mode="popLayout">
          {!calma &&
            whats.perguntas.slice(0, quantas).map((pergunta, i) => (
              <motion.div
                key={pergunta}
                layout
                className="cena-whats__balao"
                {...entra}
                exit={{ opacity: 0, x: -40, transition: { duration: 0.3, delay: i * 0.04 } }}
              >
                {pergunta}
                <small>10:4{i}</small>
              </motion.div>
            ))}

          {passo >= 6 && (
            <motion.div
              key="site"
              layout
              className="cena-whats__balao cena-whats__balao--meu"
              {...entra}
              exit={{ opacity: 0, transition: { duration: 0.2 } }}
            >
              <span className="cena-whats__previa">
                <span className="cena-whats__previa-barra">
                  <Link2 size={11} strokeWidth={2.2} />
                  {whats.site.endereco}
                </span>
                <span className="cena-whats__previa-itens">
                  {whats.site.itens.map((item) => (
                    <span key={item}>{item}</span>
                  ))}
                </span>
              </span>
              <small>
                10:46 <CheckCheck size={12} strokeWidth={2} />
              </small>
            </motion.div>
          )}

          {calma && (
            <motion.div key="calma" layout className="cena-whats__balao cena-whats__balao--calmo" {...entra}>
              {whats.calma}
              <small>10:52</small>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}

/* --------------------------------------------------------------------------
   02 — Alguém procura no Google. Primeiro só aparece um perfil parado; aí
   entra o resultado com site, e o perfil solto fica pra trás.
   Passos: 1 digita a busca · 2 perfil vazio · 3 resultado com site.
   -------------------------------------------------------------------------- */
export function CenaBusca({ ativa }) {
  const passo = useCiclo(5, { intervalo: 900, pausa: 2800, ativo: ativa });

  return (
    <div className="cena cena-busca" aria-hidden="true">
      <div className="cena-busca__barra">
        <Search size={15} strokeWidth={2} />
        <span className="cena-busca__termo">
          {passo >= 1 &&
            [...busca.termo].map((letra, i) => (
              <motion.span
                key={i}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: i * 0.028, duration: 0.05 }}
              >
                {letra}
              </motion.span>
            ))}
          <span className="cena-busca__cursor" />
        </span>
      </div>

      <div className="cena-busca__resultados">
        <AnimatePresence mode="popLayout">
          {passo >= 3 && (
            <motion.div
              key="cheio"
              layout
              className="cena-busca__resultado cena-busca__resultado--cheio"
              initial={{ opacity: 0, y: -12, scale: 0.97 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.6, ease: SUAVE }}
            >
              <span className="cena-busca__url">{busca.cheio.endereco}</span>
              <strong className="cena-busca__nome">{busca.cheio.nome}</strong>
              <span className="cena-busca__resumo">{busca.cheio.resumo}</span>
              <span className="cena-busca__links">
                {busca.cheio.links.map((link) => (
                  <span key={link}>{link}</span>
                ))}
              </span>
            </motion.div>
          )}

          {passo >= 2 && (
            <motion.div
              key="vazio"
              layout
              className={`cena-busca__resultado cena-busca__resultado--vazio${
                passo >= 3 ? ' cena-busca__resultado--apagado' : ''
              }`}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: passo >= 3 ? 0.4 : 1, y: 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.5, ease: SUAVE }}
            >
              <strong className="cena-busca__nome">{busca.vazio.nome}</strong>
              <span className="cena-busca__resumo">{busca.vazio.detalhe}</span>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}

/* --------------------------------------------------------------------------
   03 — Papel solto, lembrete e print voando pela tela até se encaixarem
   numa tabela organizada.
   Passos: 0–1 bagunça · 2 os pedaços voam pra tabela · 3–4 segura.
   -------------------------------------------------------------------------- */
const ESPALHADOS = [
  { x: '6%', y: '10%', r: -9 },
  { x: '52%', y: '6%', r: 7 },
  { x: '14%', y: '46%', r: 5 },
  { x: '58%', y: '40%', r: -6 },
  { x: '30%', y: '72%', r: -3 },
];

export function CenaCaos({ ativa }) {
  const passo = useCiclo(4, { intervalo: 1100, pausa: 2800, ativo: ativa });
  const organizado = passo >= 2;

  return (
    <div className="cena cena-caos" aria-hidden="true">
      <div className="cena-caos__mesa">
        {caos.fragmentos.map((texto, i) => {
          const pos = ESPALHADOS[i % ESPALHADOS.length];
          return (
            <motion.span
              key={texto}
              className={`cena-caos__papel cena-caos__papel--${i % 3}`}
              style={{ left: pos.x, top: pos.y }}
              initial={false}
              animate={
                organizado
                  ? { opacity: 0, scale: 0.5, rotate: 0, y: 160 + i * 6, x: 40 }
                  : { opacity: 1, scale: 1, rotate: pos.r, y: 0, x: 0 }
              }
              transition={{ duration: organizado ? 0.7 : 0.6, delay: organizado ? i * 0.07 : i * 0.05, ease: SUAVE }}
            >
              {texto}
            </motion.span>
          );
        })}
      </div>

      <motion.div
        className="cena-caos__tabela"
        initial={false}
        animate={{ opacity: organizado ? 1 : 0.18 }}
        transition={{ duration: 0.6 }}
      >
        <div className="cena-caos__linha cena-caos__linha--cabeca">
          {caos.colunas.map((c) => (
            <span key={c}>{c}</span>
          ))}
        </div>
        {caos.linhas.map((linha, i) => (
          <motion.div
            key={linha[0]}
            className="cena-caos__linha"
            initial={false}
            animate={organizado ? { opacity: 1, x: 0 } : { opacity: 0, x: -12 }}
            transition={{ delay: organizado ? 0.45 + i * 0.12 : 0, duration: 0.5, ease: SUAVE }}
          >
            {linha.map((celula, j) => (
              <span key={j} className={j === 2 ? 'cena-caos__status' : undefined}>
                {celula}
              </span>
            ))}
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
}

export const CENAS = [CenaWhats, CenaBusca, CenaCaos];
