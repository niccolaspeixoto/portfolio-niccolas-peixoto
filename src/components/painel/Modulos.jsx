import { useId } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { Search, TrendingUp } from 'lucide-react';
import { useCiclo } from '../../lib/useCiclo';
import { SUAVE } from '../../lib/animacoes';
import { demonstracao as d } from '../../data/conteudo';
import './painel.css';

/* Peças do sistema fictício. Usadas no painel da Demonstração, nas
   células da seção Sistema e no lado "com sistema" do comparador. Todas
   com dados de `demonstracao` (conteudo.js) — negócio inventado, rotulado
   como demonstração onde aparece. */

// --- Gráfico de linha ------------------------------------------------------

function caminhoSuave(pontos) {
  // Catmull-Rom convertido em curvas de Bézier: linha que passa por todos
  // os pontos sem quinas.
  return pontos.reduce((acc, [x, y], i, arr) => {
    if (i === 0) return `M${x},${y}`;
    const [x0, y0] = arr[i - 2] ?? arr[i - 1];
    const [x1, y1] = arr[i - 1];
    const [x3, y3] = arr[i + 1] ?? [x, y];
    const c1x = x1 + (x - x0) / 6;
    const c1y = y1 + (y - y0) / 6;
    const c2x = x - (x3 - x1) / 6;
    const c2y = y - (y3 - y1) / 6;
    return `${acc} C${c1x},${c1y} ${c2x},${c2y} ${x},${y}`;
  }, '');
}

export function GraficoLinha({ valores = d.financeiro, rotulos = d.diasSemana, desenhado }) {
  const id = useId().replace(/:/g, '');
  const L = 300;
  const A = 110;
  const pontos = valores.map((v, i) => [(i / (valores.length - 1)) * L, A - 8 - v * (A - 22)]);
  const linha = caminhoSuave(pontos);
  const area = `${linha} L${L},${A} L0,${A} Z`;
  const [ux, uy] = pontos[pontos.length - 1];

  return (
    <div className="grafico">
      <svg viewBox={`0 0 ${L} ${A}`} preserveAspectRatio="none" className="grafico__svg" aria-hidden="true">
        <defs>
          <linearGradient id={`area-${id}`} x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#e8763b" stopOpacity="0.32" />
            <stop offset="100%" stopColor="#e8763b" stopOpacity="0" />
          </linearGradient>
        </defs>
        {[0.25, 0.5, 0.75].map((f) => (
          <line key={f} x1="0" x2={L} y1={A * f} y2={A * f} className="grafico__guia" />
        ))}
        <motion.path
          d={area}
          fill={`url(#area-${id})`}
          initial={false}
          animate={{ opacity: desenhado ? 1 : 0 }}
          transition={{ duration: 0.9, delay: desenhado ? 0.5 : 0 }}
        />
        {/* Opacidade junto: com pathLength 0 e ponta arredondada, o SVG
            ainda pinta um ponto solto no começo da linha. */}
        <motion.path
          d={linha}
          className="grafico__linha"
          initial={false}
          animate={{ pathLength: desenhado ? 1 : 0, opacity: desenhado ? 1 : 0 }}
          transition={{ duration: desenhado ? 1.3 : 0.3, ease: SUAVE }}
        />
      </svg>
      <motion.span
        className="grafico__ponto"
        style={{ left: `${(ux / L) * 100}%`, top: `${(uy / A) * 100}%` }}
        initial={false}
        animate={{ scale: desenhado ? 1 : 0, opacity: desenhado ? 1 : 0 }}
        transition={{ delay: desenhado ? 1.1 : 0, type: 'spring', stiffness: 300, damping: 18 }}
      />
      <div className="grafico__rotulos" aria-hidden="true">
        {rotulos.map((r) => (
          <span key={r}>{r}</span>
        ))}
      </div>
    </div>
  );
}

// --- Barra de estoque ------------------------------------------------------

export function BarraEstoque({ item, nivel, repor }) {
  return (
    <li className={`estoque-linha${repor ? ' estoque-linha--repor' : ''}`}>
      <span className="estoque-linha__nome">{item}</span>
      <span className="estoque-linha__trilho">
        <motion.span
          className="estoque-linha__nivel"
          initial={false}
          animate={{ scaleX: nivel }}
          transition={{ duration: 1.1, ease: SUAVE }}
        />
      </span>
      <AnimatePresence>
        {repor && (
          <motion.span
            className="estoque-linha__selo"
            initial={{ opacity: 0, scale: 0.6 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.6 }}
            transition={{ type: 'spring', stiffness: 380, damping: 20 }}
          >
            {d.rotuloRepor}
          </motion.span>
        )}
      </AnimatePresence>
    </li>
  );
}

// --- Módulos da seção Sistema ---------------------------------------------

/* Ordem em que os horários da semana vão sendo marcados (índice da célula
   numa grade de 6 dias × 4 horários, lida linha a linha). */
const ORDEM_AGENDA = [0, 7, 2, 13, 9, 4, 18, 15, 21, 11, 6, 23];

export function ModuloAgenda({ ativo, estatico = false }) {
  const total = ORDEM_AGENDA.length;
  const ciclo = useCiclo(total, { intervalo: 420, pausa: 2600, ativo: ativo && !estatico });
  const passo = estatico ? total : ciclo;
  const marcadas = new Set(ORDEM_AGENDA.slice(0, passo));
  const ultima = passo > 0 ? ORDEM_AGENDA[passo - 1] : -1;

  return (
    <div className="mod-agenda" aria-hidden="true">
      <div className="mod-agenda__dias">
        {d.diasSemana.map((dia) => (
          <span key={dia}>{dia}</span>
        ))}
      </div>
      <div className="mod-agenda__grade">
        {Array.from({ length: 24 }, (_, i) => (
          <span
            key={i}
            className={`mod-agenda__celula${marcadas.has(i) ? ' mod-agenda__celula--marcada' : ''}${
              i === ultima && !estatico ? ' mod-agenda__celula--nova' : ''
            }`}
          />
        ))}
      </div>
    </div>
  );
}

export function ModuloEstoque({ ativo, estatico = false }) {
  const total = 6;
  const ciclo = useCiclo(total, { intervalo: 650, pausa: 2400, ativo: ativo && !estatico });
  const passo = estatico ? total : ciclo;
  const fracao = Math.min(passo / 4, 1);

  return (
    <ul className="mod-estoque" aria-hidden="true">
      {d.estoque.map((e) => {
        const nivel = 1 - (1 - e.nivel) * fracao;
        return (
          <BarraEstoque key={e.item} item={e.item} nivel={nivel} repor={Boolean(e.repor) && nivel < 0.25} />
        );
      })}
    </ul>
  );
}

export function ModuloFinanceiro({ ativo, estatico = false }) {
  const ciclo = useCiclo(3, { intervalo: 900, pausa: 3600, ativo: ativo && !estatico });
  const passo = estatico ? 3 : ciclo;

  return (
    <div className="mod-financeiro" aria-hidden="true">
      <GraficoLinha desenhado={passo >= 1} />
      <AnimatePresence>
        {passo >= 2 && (
          <motion.span
            className="painel-pilula"
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4, ease: SUAVE }}
          >
            <TrendingUp size={12} strokeWidth={2.2} />
            {d.rotuloFinanceiro}
          </motion.span>
        )}
      </AnimatePresence>
    </div>
  );
}

export function ModuloClientes({ ativo, estatico = false }) {
  const busca = d.buscaClientes;
  const total = busca.length + 2;
  const ciclo = useCiclo(total, { intervalo: 520, pausa: 2600, ativo: ativo && !estatico });
  const passo = estatico ? 0 : ciclo;
  const digitado = busca.slice(0, Math.min(passo, busca.length));
  const lista = digitado
    ? d.clientes.filter((c) => c.nome.toLowerCase().startsWith(digitado.toLowerCase()))
    : d.clientes;

  return (
    <div className="mod-clientes" aria-hidden="true">
      <div className="mod-clientes__busca">
        <Search size={12} strokeWidth={2} />
        {digitado ? (
          <span className="mod-clientes__digitado">{digitado}</span>
        ) : (
          <span className="mod-clientes__placeholder">{d.placeholderBusca}</span>
        )}
        {!estatico && <span className="mod-clientes__cursor" />}
      </div>
      <ul className="mod-clientes__lista">
        <AnimatePresence initial={false}>
          {lista.map((c) => (
            <motion.li
              key={c.nome}
              className="mod-clientes__item"
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.35, ease: SUAVE }}
            >
              <span className="mod-clientes__avatar">{c.nome.charAt(0)}</span>
              <span className="mod-clientes__dados">
                {c.nome}
                <small>{c.detalhe}</small>
              </span>
            </motion.li>
          ))}
        </AnimatePresence>
      </ul>
    </div>
  );
}
