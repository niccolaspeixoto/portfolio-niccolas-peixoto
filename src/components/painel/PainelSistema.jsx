import { AnimatePresence, motion } from 'framer-motion';
import { CalendarDays, Users, Package, Wallet, Check, BellRing } from 'lucide-react';
import { useCiclo } from '../../lib/useCiclo';
import { SUAVE } from '../../lib/animacoes';
import { demonstracao as d } from '../../data/conteudo';
import { GraficoLinha, BarraEstoque } from './Modulos';
import './painel.css';

const ICONES = [CalendarDays, Users, Package, Wallet];

const reais = (valor) =>
  valor.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL', maximumFractionDigits: 0 });

/* Roteiro do painel, um passo por vez:
   1–5  a agenda do dia vai sendo preenchida, um horário por passo
   6    chega a notificação: o horário pendente acabou de ser confirmado
   7    o estoque baixa e o esmalte acende "repor"
   8    o gráfico de entradas da semana se desenha
   9–10 segura tudo na tela; 11 a notificação sai
   Depois de uma pausa, recomeça do zero. */
const TOTAL = 11;

function Indicador({ rotulo, valor, destaque = false }) {
  return (
    <div className={`painel__indicador${destaque ? ' painel__indicador--destaque' : ''}`}>
      <span className="painel__indicador-rotulo">{rotulo}</span>
      <AnimatePresence mode="popLayout" initial={false}>
        <motion.strong
          key={valor}
          className="painel__indicador-valor"
          initial={{ y: 12, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: -12, opacity: 0 }}
          transition={{ duration: 0.35, ease: SUAVE }}
        >
          {valor}
        </motion.strong>
      </AnimatePresence>
    </div>
  );
}

/**
 * Painel de gestão de um negócio fictício, montado em React e animado em
 * loop enquanto está na tela. `estatico` mostra o estado final, parado
 * (usado no lado "com sistema" do comparador).
 */
export default function PainelSistema({ ativo = true, estatico = false }) {
  const ciclo = useCiclo(TOTAL, { intervalo: 720, pausa: 3400, ativo: ativo && !estatico });
  const passo = estatico ? TOTAL : ciclo;

  const horarios = d.agenda.slice(0, Math.min(passo, d.agenda.length));
  const confirmouAgora = passo >= 6;
  const estaConfirmado = (linha, i) => linha.confirmado || (i === d.confirmacaoAoVivo && confirmouAgora);
  const confirmados = horarios.filter(estaConfirmado).length;
  const previsto = horarios.reduce((soma, h) => soma + h.valor, 0);
  const estoqueBaixou = passo >= 7;
  const menuAtivo = passo >= 8 ? 3 : passo >= 7 ? 2 : 0;
  const notificando = passo >= 6 && passo < TOTAL;

  return (
    <div className="painel-conteiner">
      <div className="painel" aria-hidden="true">
        <aside className="painel__lateral">
          <div className="painel__marca">
            <span className="painel__logo">{d.negocio.charAt(0)}</span>
            {d.negocio}
          </div>
          <nav className="painel__menu">
            {d.menu.map((item, i) => {
              const Icone = ICONES[i];
              return (
                <span
                  key={item}
                  className={`painel__menu-item${i === menuAtivo ? ' painel__menu-item--ativo' : ''}`}
                >
                  <Icone size={14} strokeWidth={1.8} />
                  {item}
                </span>
              );
            })}
          </nav>
        </aside>

        <div className="painel__principal">
          <header className="painel__topo">
            <div>
              <span className="painel__data">{d.data}</span>
              <strong className="painel__titulo">{d.negocio}</strong>
            </div>
            <span className="painel__selo">{d.selo}</span>
          </header>

          <div className="painel__resumo">
            <Indicador rotulo={d.resumo.atendimentos} valor={horarios.length} />
            <Indicador rotulo={d.resumo.confirmados} valor={confirmados} destaque />
            <Indicador rotulo={d.resumo.caixa} valor={reais(previsto)} />
          </div>

          <div className="painel__grade">
            <section className="painel__cartao painel__agenda">
              <h4 className="painel__cartao-titulo">{d.tituloAgenda}</h4>
              <ul className="painel__horarios">
                <AnimatePresence initial={false}>
                  {horarios.map((h, i) => {
                    const ok = estaConfirmado(h, i);
                    return (
                      <motion.li
                        key={h.hora}
                        className="painel__horario"
                        initial={{ opacity: 0, x: -16 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, transition: { duration: 0.2 } }}
                        transition={{ duration: 0.45, ease: SUAVE }}
                      >
                        <span className="painel__hora">{h.hora}</span>
                        <span className="painel__cliente">
                          {h.cliente}
                          <small>{h.servico}</small>
                        </span>
                        <span className={`painel__status${ok ? ' painel__status--ok' : ''}`}>
                          {ok && <Check size={10} strokeWidth={3} />}
                          {ok ? d.statusConfirmado : d.statusAguardando}
                        </span>
                      </motion.li>
                    );
                  })}
                </AnimatePresence>
              </ul>
            </section>

            <section className="painel__cartao painel__estoque">
              <h4 className="painel__cartao-titulo">{d.tituloEstoque}</h4>
              <ul className="mod-estoque">
                {d.estoque.map((e) => (
                  <BarraEstoque
                    key={e.item}
                    item={e.item}
                    nivel={estoqueBaixou ? e.nivel : 1}
                    repor={estoqueBaixou && Boolean(e.repor)}
                  />
                ))}
              </ul>
            </section>

            <section className="painel__cartao painel__financeiro">
              <h4 className="painel__cartao-titulo">
                {d.tituloFinanceiro}
                <AnimatePresence>
                  {passo >= 8 && (
                    <motion.span
                      className="painel-pilula"
                      initial={{ opacity: 0, x: 8 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.4, delay: 1, ease: SUAVE }}
                    >
                      {d.rotuloFinanceiro}
                    </motion.span>
                  )}
                </AnimatePresence>
              </h4>
              <GraficoLinha desenhado={passo >= 8} />
            </section>
          </div>
        </div>

        <AnimatePresence>
          {notificando && (
            <motion.div
              className="painel__notificacao"
              initial={{ opacity: 0, y: 24, scale: 0.94 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 12, scale: 0.97 }}
              transition={{ type: 'spring', stiffness: 260, damping: 22 }}
            >
              <span className="painel__notificacao-icone">
                <BellRing size={14} strokeWidth={2} />
              </span>
              <span>
                <strong>{d.notificacao.titulo}</strong>
                <small>{d.notificacao.texto}</small>
              </span>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
