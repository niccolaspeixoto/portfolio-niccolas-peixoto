/* ============================================================================
   TODO O TEXTO DO SITE MORA AQUI.

   Para mudar qualquer palavra do site, edite este arquivo — nenhum componente
   tem texto escrito dentro dele.

   >>> ANTES DE PUBLICAR, LEIA ISTO <<<
   Nenhum número, percentual ou depoimento foi inventado neste arquivo.
   Os cases descrevem o que cada site entrega, não resultados medidos.
   Quando você tiver depoimento real ou número real do cliente (faturamento,
   volume de mensagens, tempo de resposta), troque o campo `resultado` e
   preencha `depoimento`. Está marcado com DEPOIMENTO: null onde falta.
   ========================================================================== */

// --- Contato -------------------------------------------------------------
// O link do WhatsApp precisa do código do país (55) + DDD + número.
const TELEFONE = '5511952397051';
const MENSAGEM_PADRAO =
  'Olá, Niccolas! Vi o seu site e quero conversar sobre um projeto para o meu negócio.';

export const contato = {
  whatsapp: `https://wa.me/${TELEFONE}?text=${encodeURIComponent(MENSAGEM_PADRAO)}`,
  whatsappVisivel: '(11) 95239-7051',
  email: 'niccolaspeixotodev@gmail.com',
  linkedin: 'https://www.linkedin.com/in/niccolas-peixoto/',
  github: 'https://github.com/niccolaspeixoto',
};

export const marca = {
  nome: 'Niccolas Peixoto',
  descritor: 'Software para negócios locais',
};

export const navegacao = [
  { rotulo: 'Onde eu entro', href: '#solucoes' },
  { rotulo: 'Por que sistema', href: '#porque' },
  { rotulo: 'Projetos', href: '#projetos' },
  { rotulo: 'Como funciona', href: '#processo' },
];

// --- 1. Hero -------------------------------------------------------------
export const hero = {
  /* Duas batidas curtas. A palavra final da segunda linha troca em loop
     (organiza → agenda → lembra → confirma): cada uma é uma coisa que o
     sistema faz pelo dono do negócio. Todas têm o mesmo tamanho de
     propósito — uma palavra mais longa empurraria o título por cima do
     olho na foto. A primeira da lista é a que fica parada pra quem pediu
     menos movimento, e é a que o leitor de tela lê. */
  titulo: {
    linha1: 'Site que vende.',
    linha2: 'Sistema que',
    palavras: ['organiza.', 'agenda.', 'lembra.', 'confirma.'],
  },
  indicadorRolagem: 'Role',
  // Teto de 20 palavras: o hero é um momento, não um parágrafo.
  texto:
    'Eu cuido da parte técnica do seu negócio para você cuidar do que faz ele girar.',
  cta: 'Falar no WhatsApp',
  ctaSecundario: { rotulo: 'Ver projetos', href: '#projetos' },
  legendaFoto: 'Niccolas Peixoto. Quem conversa com você é quem constrói.',
};

/* --- Demonstração do sistema ---------------------------------------------
   Painel de um negócio FICTÍCIO, montado em React (não é print). Mostra o
   tipo de ferramenta que o Niccolas constrói, não o resultado de nenhum
   cliente real — por isso o selo de "dados fictícios" fica sempre visível.
   Os mesmos dados alimentam os módulos da seção Sistema e o lado "com
   sistema" do comparador em Por que sistema. */
export const demonstracao = {
  rotulo: 'Na prática',
  titulo: 'É isso que você abre todo dia de manhã.',
  texto:
    'Agenda, clientes, estoque e financeiro na mesma tela, feito em cima do jeito que o seu negócio já funciona.',
  selo: 'Demonstração ilustrativa · dados fictícios',
  negocio: 'Studio Exemplo',
  data: 'Terça, 14 de outubro',
  menu: ['Agenda', 'Clientes', 'Estoque', 'Financeiro'],
  resumo: {
    atendimentos: 'Atendimentos hoje',
    confirmados: 'Confirmados',
    caixa: 'Previsto para hoje',
  },
  tituloAgenda: 'Agenda de hoje',
  statusConfirmado: 'Confirmado',
  statusAguardando: 'Aguardando',
  agenda: [
    { hora: '09:00', cliente: 'Camila R.', servico: 'Corte e escova', valor: 160, confirmado: true },
    { hora: '10:30', cliente: 'Juliana M.', servico: 'Coloração', valor: 290, confirmado: true },
    { hora: '13:00', cliente: 'Rafael S.', servico: 'Corte masculino', valor: 70, confirmado: true },
    { hora: '14:30', cliente: 'Beatriz L.', servico: 'Manicure', valor: 55, confirmado: false },
    { hora: '16:00', cliente: 'Marcos T.', servico: 'Barba', valor: 45, confirmado: true },
  ],
  /* Índice (em `agenda`) do horário que é confirmado ao vivo na animação. */
  confirmacaoAoVivo: 3,
  notificacao: { titulo: 'Horário confirmado', texto: 'Beatriz L. · 14:30 · Manicure' },
  tituloEstoque: 'Estoque',
  rotuloRepor: 'repor',
  estoque: [
    { item: 'Shampoo profissional', nivel: 0.72 },
    { item: 'Esmalte nude', nivel: 0.14, repor: true },
    { item: 'Tintura 6.0', nivel: 0.48 },
    { item: 'Luvas descartáveis', nivel: 0.61 },
  ],
  tituloFinanceiro: 'Entradas da semana',
  rotuloFinanceiro: 'Semana no azul',
  diasSemana: ['Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb'],
  /* Altura relativa de cada ponto do gráfico (0 a 1), só pra desenhar. */
  financeiro: [0.28, 0.42, 0.36, 0.58, 0.66, 0.9],
  tituloClientes: 'Clientes',
  buscaClientes: 'Cam',
  placeholderBusca: 'Buscar cliente',
  clientes: [
    { nome: 'Camila Ribeiro', detalhe: '12 visitas · última há 3 semanas' },
    { nome: 'Camila Souza', detalhe: '4 visitas · última há 2 meses' },
    { nome: 'Juliana Martins', detalhe: '7 visitas · última há 10 dias' },
    { nome: 'Rafael Santos', detalhe: '9 visitas · última há 1 mês' },
  ],
};

// --- 2. Onde eu resolvo o problema ---------------------------------------
export const problemas = {
  titulo: 'Três coisas que custam caro todo mês',
  texto:
    'Nenhuma delas parece urgente no dia a dia. Somadas no fim do ano, são clientes que foram para o concorrente e horas que você nunca recupera.',
  itens: [
    {
      n: '01',
      dor: 'O cliente te manda a mesma pergunta que o site já deveria responder.',
      custo: 'Você repete preço, horário e serviço pra cada pessoa nova, um por um, em vez de fechar a venda.',
      solucao: 'Site institucional',
      comoResolve:
        'Preço, horário, serviços e diferenciais já visíveis na página. Quem chega já sabe o que quer, e a conversa no WhatsApp começa no ponto que importa.',
    },
    {
      n: '02',
      dor: 'Quem procura seu negócio no Google encontra um perfil parado e mais nada.',
      custo: 'Sem um endereço próprio na internet, você parece menor e menos sério do que realmente é.',
      solucao: 'Site institucional',
      comoResolve:
        'Uma página que apresenta seu trabalho do jeito certo, aparece nas buscas e transforma quem chegou curioso em conversa no WhatsApp.',
    },
    {
      n: '03',
      dor: 'Caderno, planilha e print de conversa fazendo o trabalho de um sistema.',
      custo: 'O controle do negócio mora na sua cabeça, e some junto com ela num dia corrido.',
      solucao: 'Sistema sob medida',
      comoResolve:
        'Cadastro, agenda, estoque, financeiro. Construído em cima do jeito que o seu negócio já funciona, não do jeito que um software genérico exige.',
    },
  ],
  /* Cenas animadas que acompanham cada item, na mesma ordem de `itens`.
     Negócio e conversas fictícios — ilustram a situação, não um cliente. */
  ilustracoes: {
    whats: {
      contato: 'WhatsApp do seu negócio',
      online: 'online',
      status: 'mensagens novas',
      perguntas: [
        'Oi, quanto custa?',
        'Qual o horário de vocês?',
        'Atende sábado?',
        'Quanto é o corte?',
        'Onde fica?',
      ],
      site: { endereco: 'seunegocio.com.br', itens: ['Preços', 'Horários', 'Endereço'] },
      calma: 'Oi! Vi os preços no site. Quero marcar sábado às 10h.',
    },
    busca: {
      termo: 'estúdio de beleza perto de mim',
      vazio: { nome: 'Studio Exemplo', detalhe: 'Perfil no Instagram · sem site' },
      cheio: {
        nome: 'Studio Exemplo — corte, cor e manicure',
        endereco: 'studioexemplo.com.br',
        resumo: 'Serviços, preços, horários e agendamento pelo WhatsApp.',
        links: ['Serviços', 'Preços', 'Agendar'],
      },
    },
    caos: {
      fragmentos: [
        'Camila 15h??',
        'pagar fornecedor',
        'estoque: ver depois',
        'R$ 80 — pix?',
        'print da conversa',
      ],
      colunas: ['Cliente', 'Horário', 'Status'],
      linhas: [
        ['Camila R.', '15:00', 'Confirmado'],
        ['Fornecedor', 'dia 10', 'Agendado'],
        ['Esmalte nude', '—', 'Repor'],
        ['Juliana M.', 'R$ 80', 'Pago'],
      ],
    },
  },
};

/* --- Por que um sistema -------------------------------------------------
   Contraste direto em vez de prova: o que muda no dia a dia com e sem
   sistema, pareado item a item. Os cases reais (Thalita Kuesteis, Arena
   Pro Beach) moraram aqui antes; agora vivem dentro de
   cada card em Projetos, com problema/solução/resultado completos — a
   prova não sumiu, só trocou de endereço. Aqui é argumento puro sobre a
   ferramenta, sem se apoiar em nenhum cliente específico. */
export const porQueSistema = {
  titulo: 'O que muda no dia a dia com um sistema',
  texto:
    'Não é sobre ter mais uma tela pra abrir. É sobre o que para de depender só de você.',
  rotuloSem: 'Sem sistema',
  rotuloCom: 'Com sistema',
  instrucao: 'Arraste para comparar',
  rotuloAlca: 'Comparar sem sistema e com sistema',
  /* O lado bagunçado do comparador: o que o controle do negócio vira
     quando mora em caderno, papel solto e conversa de WhatsApp. */
  caos: {
    caderno: ['Camila — 15h (confirmar)', 'Rafael ligou??', 'esmalte acabando', 'pagar luz dia 10'],
    lembretes: ['cobrar Juliana', 'repor tintura'],
    mensagem: 'Oi, ainda tem horário amanhã?',
    planilha: [
      ['Cliente', 'Valor'],
      ['Camila', 'R$ ???'],
      ['Rafael', 'pago?'],
    ],
  },
  itens: [
    {
      sem: 'Cada agendamento é uma troca de mensagem manual, e só você lembra o que já foi combinado.',
      com: 'Agendamento com confirmação automática, sem trocar mensagem pra cada horário.',
    },
    {
      sem: 'Só descobre que o estoque acabou quando o cliente já está esperando na sua frente.',
      com: 'Estoque atualizado a cada venda, sem contar tudo de novo toda semana.',
    },
    {
      sem: 'O financeiro mora em três lugares: caderno, extrato do banco e memória.',
      com: 'Entrada e saída num lugar só, sempre atualizado, sem abrir três planilhas.',
    },
    {
      sem: 'Se você tira uma folga ou fica doente, o negócio para de responder.',
      com: 'Qualquer pessoa da equipe acompanha o andamento, sem precisar te ligar toda hora.',
    },
  ],
};

/* --- Sistema sob medida: onde ajuda, como ajuda --------------------------
   Assim como a seção Por que sistema acima, não existe ainda um case
   completo (problema/solução/resultado) de sistema com número real de
   cliente — só de site. Em vez de forçar uma prova que não existe, esta
   seção argumenta a partir da ferramenta em si: onde ela entra no dia a
   dia e o que cada parte faz. O "por que escolher" já mora na seção
   Diferenciais — aqui é só o "onde" e o "como". */
export const sistema = {
  titulo: 'O que um sistema faz que uma planilha não faz',
  texto:
    'Não é sobre ter mais uma tela pra abrir. É sobre parar de carregar o controle do negócio na cabeça.',
  itens: [
    {
      titulo: 'Cadastro de clientes',
      texto: 'Nome, contato e histórico num lugar só, não espalhado entre o caderno e a memória.',
    },
    {
      titulo: 'Agenda com confirmação',
      texto: 'O cliente marca e recebe a confirmação sem você precisar responder na hora.',
    },
    {
      titulo: 'Controle de estoque',
      texto: 'Sabe o que tem, o que acabou e o que já era hora de repor, sem contar tudo de novo toda semana.',
    },
    {
      titulo: 'Financeiro',
      texto: 'Entrada e saída num lugar só, pra saber se o mês fechou no azul sem abrir três planilhas.',
    },
  ],
};

/* --- 4. Projetos ----------------------------------------------------------
   `tamanho` controla a altura do card na galeria: 'alto' | 'medio' | 'baixo'.
   `caso`, quando existe, é o problema/solução/resultado real desse projeto
   (antes morava numa seção própria de cases) — fica escondido atrás de um
   "ver o case completo" pra não pesar a galeria visual por padrão. A ordem
   da lista é a ordem na tela: o projeto mais forte vai primeiro. */
export const projetos = {
  rotulo: 'Portfólio',
  titulo: 'Projetos construídos',
  texto:
    'Trabalhos entregues do primeiro rascunho ao site no ar, incluindo hospedagem, domínio e a manutenção que vem depois.',
  dica: 'Continue rolando',
  verCase: 'Ver o case completo',
  verSite: 'Ver site no ar',
  fechar: 'Fechar',
  rotulosCase: { problema: 'O problema', solucao: 'O que foi construído', resultado: 'O que mudou' },
  itens: [
    {
      cliente: 'Thalita Kuesteis Studio',
      nicho: 'Estúdio de beleza',
      tipo: 'Site institucional + agendamento',
      imagem: '/projetos/thalita-kuesteis.jpg',
      url: 'https://thalitakuesteis.com.br/',
      status: 'No ar',
      tamanho: 'medio',
      caso: {
        problema:
          'Cada cliente nova chegava perguntando as mesmas coisas: quais serviços existem, quanto custa cada um e como é o atendimento. Explicar tudo de novo, uma pessoa por vez, tomava o tempo que deveria ser de atendimento.',
        solucao:
          'Site com serviços, faixas de preço, galeria de trabalhos e agendamento que abre o WhatsApp com a mensagem já escrita.',
        resultado:
          'A cliente chega à conversa sabendo o serviço que quer e a faixa de preço, e o estúdio recebe pedido de horário em vez de pergunta inicial.',
        depoimento: null,
      },
    },
    {
      cliente: 'Arena Pro Beach',
      nicho: 'Complexo esportivo',
      tipo: 'Site institucional',
      imagem: '/projetos/arena-pro-beach.jpg',
      url: 'https://arenaprobeach.com/',
      status: 'No ar',
      tamanho: 'alto',
      caso: {
        problema:
          'A arena existia só no Instagram. Quem queria reservar quadra precisava perguntar preço, horário, endereço e o que tinha na lanchonete: uma conversa inteira antes de qualquer reserva.',
        solucao:
          'Site institucional com quadras, aulas, cardápio, diferenciais e localização, e um botão de reserva que já abre o WhatsApp.',
        resultado:
          'A arena passou a ter endereço próprio na internet. A conversa no WhatsApp agora começa com o cliente já sabendo o que quer reservar.',
        depoimento: null,
      },
    },
  ],
};

/* --- Faixa cinética (entre Projetos e Diferenciais) -----------------------
   Duas linhas de texto gigante que andam em sentidos opostos e aceleram
   com a velocidade do scroll. Só frases que o resto do site já afirma. */
export const faixaCinetica = {
  linhas: [
    ['Você fala comigo', 'Sem template', 'Manutenção inclusa', 'Prazo combinado antes'],
    ['Sites institucionais', 'Sistemas sob medida', 'Suporte contínuo', 'Negócios locais'],
  ],
};

// --- 5. Diferenciais -----------------------------------------------------
export const diferenciais = {
  titulo: 'O que uma agência grande não te dá',
  itens: [
    {
      titulo: 'Você fala comigo, não com um atendente',
      texto:
        'Quem escreve o código é quem senta com você. Nada se perde no caminho entre o que você pediu e o que foi entregue.',
    },
    {
      titulo: 'Manutenção contínua já inclusa',
      texto:
        'Site no ar não é projeto encerrado. Trocar uma foto, corrigir um texto, ajustar um preço: continua comigo depois da entrega.',
    },
    {
      titulo: 'Nada de modelo pronto',
      texto:
        'Cada projeto parte do jeito que o seu negócio funciona de verdade, e não de um template adaptado às pressas para caber.',
    },
    {
      titulo: 'Escopo e prazo combinados antes',
      texto:
        'Você sabe o que vai receber, quanto custa e quando fica pronto antes da primeira linha de código ser escrita.',
    },
  ],
};

// --- 6. Como funciona ----------------------------------------------------
export const processo = {
  titulo: 'Do primeiro oi ao site no ar',
  itens: [
    {
      n: '01',
      titulo: 'Diagnóstico',
      texto:
        'Uma conversa para entender como o negócio funciona hoje e onde está travando. Sem custo e sem compromisso.',
      prazo: '30 minutos',
      visual: { tipo: 'mensagem', texto: 'Oi! Quero entender como funciona.' },
    },
    {
      n: '02',
      titulo: 'Proposta',
      texto:
        'Escopo, prazo e valor por escrito. Você aprova antes de qualquer coisa começar a ser construída.',
      prazo: 'até 2 dias',
      visual: { tipo: 'proposta', titulo: 'Proposta', carimbo: 'Aprovado' },
    },
    {
      n: '03',
      titulo: 'Construção',
      texto:
        'Você acompanha o projeto tomando forma e ajusta no caminho, em vez de ver o resultado só no final.',
      prazo: '2 a 4 semanas',
      visual: { tipo: 'construcao', endereco: 'seunegocio.com.br' },
    },
    {
      n: '04',
      titulo: 'Suporte contínuo',
      texto:
        'Depois da entrega eu continuo por perto para manter, corrigir e evoluir conforme o negócio muda.',
      prazo: 'sem prazo',
      visual: { tipo: 'suporte', texto: 'Suporte ativo' },
    },
  ],
};

// --- 7. Chamada final ----------------------------------------------------
export const chamada = {
  titulo: [
    { texto: 'Seu negócio pode' },
    { texto: 'atender melhor', destaque: true },
    { texto: 'já esta semana.' },
  ],
  texto:
    'Me conte em uma mensagem o que está travando hoje. Eu respondo com um diagnóstico honesto, inclusive se a resposta for que você ainda não precisa contratar nada.',
  cta: 'Falar no WhatsApp',
  legendaRedes: 'Ou encontre-me por aqui',
  /* Só redes com endereço real. Instagram volta pra cá quando houver link
     (o card antigo apontava pra "#" e só rolava a página pro topo). */
  redes: [
    { rotulo: 'Niccolas Peixoto no LinkedIn', href: contato.linkedin, cor: '#0a66c2', icone: 'linkedin' },
    { rotulo: 'Niccolas Peixoto no GitHub', href: contato.github, cor: 'var(--areia)', icone: 'github' },
  ],
};

// --- 8. Rodapé -----------------------------------------------------------
export const rodape = {
  frase: 'Sites e sistemas para negócios que querem crescer sem contratar mais gente.',
  letreiro: 'Niccolas',
  voltarTopo: 'Voltar ao topo',
  navegar: 'Navegar',
  colunas: [
    {
      titulo: 'Conversar',
      links: [
        { rotulo: 'WhatsApp', valor: contato.whatsappVisivel, href: contato.whatsapp },
        { rotulo: 'E-mail', valor: contato.email, href: `mailto:${contato.email}` },
      ],
    },
    {
      titulo: 'Acompanhar',
      links: [
        { rotulo: 'LinkedIn', valor: 'niccolas-peixoto', href: contato.linkedin },
        { rotulo: 'GitHub', valor: 'niccolaspeixoto', href: contato.github },
      ],
    },
  ],
};
