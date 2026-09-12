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
  { rotulo: 'Cases', href: '#cases' },
  { rotulo: 'Projetos', href: '#projetos' },
  { rotulo: 'Como funciona', href: '#processo' },
];

// --- 1. Hero -------------------------------------------------------------
export const hero = {
  olho: 'Desenvolvimento de software para negócios locais',
  // O título é montado em pedaços para destacar uma parte em terracota.
  titulo: [
    { texto: 'Seu negócio atendendo melhor,' },
    { texto: 'vendendo mais', destaque: true },
    { texto: 'e perdendo menos tempo.' },
  ],
  texto:
    'Eu construo e cuido da parte técnica do seu negócio para você poder cuidar do que faz ele girar. Do diagnóstico à manutenção, falando direto comigo.',
  cta: 'Falar no WhatsApp',
  ctaSecundario: { rotulo: 'Ver projetos', href: '#projetos' },
  selos: [
    'Resposta no mesmo dia',
    'Sem intermediário',
    'Manutenção inclusa',
  ],
  legendaFoto: 'Niccolas Peixoto — quem conversa com você é quem constrói.',
  // Os três pilares viram uma faixa no pé do hero, como índice de revista.
  pilares: [
    {
      n: '01',
      titulo: 'Sites institucionais',
      texto: 'Presença que aparece no Google e transforma visita em conversa.',
    },
    {
      n: '02',
      titulo: 'Sistemas sob medida',
      texto: 'Agenda, estoque e financeiro no formato do seu negócio.',
    },
    {
      n: '03',
      titulo: 'Agentes de IA no WhatsApp',
      texto: 'Atendimento que responde em segundos, a qualquer hora do dia.',
    },
  ],
};

// --- 2. Onde eu resolvo o problema ---------------------------------------
export const problemas = {
  olho: 'Onde eu entro',
  titulo: 'Três coisas que custam caro todo mês',
  texto:
    'Nenhuma delas parece urgente no dia a dia. Somadas no fim do ano, são clientes que foram para o concorrente e horas que você nunca recupera.',
  itens: [
    {
      n: '01',
      dor: 'O cliente manda mensagem às 22h e só recebe resposta no dia seguinte.',
      custo: 'Quem responde primeiro fecha a venda. Quando a resposta demora, ela já fechou com outro.',
      solucao: 'Agente de IA no WhatsApp',
      comoResolve:
        'Responde em segundos, a qualquer hora. Explica serviço, informa preço e horário, tira as dúvidas de sempre e te passa a conversa só quando ela vale o seu tempo.',
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
      custo: 'O controle do negócio mora na sua cabeça — e some junto com ela num dia corrido.',
      solucao: 'Sistema sob medida',
      comoResolve:
        'Cadastro, agenda, estoque, financeiro. Construído em cima do jeito que o seu negócio já funciona, não do jeito que um software genérico exige.',
    },
  ],
};

// --- 3. Prova social -----------------------------------------------------
// `resultado` descreve o que o projeto entrega. Troque por número real assim
// que o cliente te passar um. `depoimento` fica null até existir citação real.
export const cases = {
  olho: 'Prova real',
  titulo: 'O que mudou na prática',
  texto:
    'Cada projeto começou com um problema concreto de um negócio que já existia. Abaixo, o que estava travando e o que foi construído para destravar.',
  itens: [
    {
      cliente: 'Arena Pro Beach',
      nicho: 'Complexo esportivo · Beach tennis, society e lanchonete',
      status: 'No ar',
      site: 'arenaprobeach.com',
      url: 'https://arenaprobeach.com/',
      problema:
        'A arena existia só no Instagram. Quem queria reservar quadra precisava perguntar preço, horário, endereço e o que tinha na lanchonete — uma conversa inteira antes de qualquer reserva.',
      solucao:
        'Site institucional com quadras, aulas, cardápio, diferenciais e localização, e um botão de reserva que já abre o WhatsApp.',
      resultado:
        'A arena passou a ter endereço próprio na internet. A conversa no WhatsApp agora começa com o cliente já sabendo o que quer reservar.',
      depoimento: null,
    },
    {
      cliente: 'Thalita Kuesteis Studio',
      nicho: 'Estúdio de beleza · Maquiagem e piercing em Diadema, SP',
      status: 'Em implantação',
      site: 'thalitakuesteis.com.br',
      url: null,
      problema:
        'Cada cliente nova chegava perguntando as mesmas coisas: quais serviços existem, quanto custa cada um e como é o atendimento. Explicar tudo de novo, uma pessoa por vez, tomava o tempo que deveria ser de atendimento.',
      solucao:
        'Site com serviços, faixas de preço, galeria de trabalhos e agendamento que abre o WhatsApp com a mensagem já escrita.',
      resultado:
        'A cliente chega à conversa sabendo o serviço que quer e a faixa de preço, e o estúdio recebe pedido de horário em vez de pergunta inicial.',
      depoimento: null,
    },
    {
      cliente: 'Alexandra Marques',
      nicho: 'Consultoria tributária e financeira',
      status: 'Em implantação',
      site: 'alexandramarques.com.br',
      url: null,
      problema:
        'Um serviço técnico e difícil de explicar em uma conversa solta. Quem chegava não entendia o tamanho do trabalho oferecido, e a consultoria virava uma explicação repetida a cada contato.',
      solucao:
        'Site que apresenta as cinco frentes da consultoria em linguagem que o dono de empresa entende, com agendamento de diagnóstico pelo WhatsApp.',
      resultado:
        'A consultoria passou a ser apresentada por inteiro antes do primeiro contato, e a conversa começa no ponto que importa.',
      depoimento: null,
    },
  ],
};

// --- 4. Projetos ---------------------------------------------------------
// `tamanho` controla a altura do card na galeria: 'alto' | 'medio' | 'baixo'.
export const projetos = {
  olho: 'Vitrine',
  titulo: 'Projetos construídos',
  texto:
    'Trabalhos entregues do primeiro rascunho ao site no ar, incluindo hospedagem, domínio e a manutenção que vem depois.',
  itens: [
    {
      cliente: 'Arena Pro Beach',
      nicho: 'Complexo esportivo',
      tipo: 'Site institucional',
      imagem: '/projetos/arena-pro-beach.jpg',
      url: 'https://arenaprobeach.com/',
      status: 'No ar',
      tamanho: 'alto',
    },
    {
      cliente: 'Thalita Kuesteis Studio',
      nicho: 'Estúdio de beleza',
      tipo: 'Site institucional + agendamento',
      imagem: '/projetos/thalita-kuesteis.jpg',
      url: null,
      status: 'Em implantação',
      tamanho: 'medio',
    },
    {
      cliente: 'Alexandra Marques',
      nicho: 'Consultoria tributária',
      tipo: 'Site institucional',
      imagem: '/projetos/alexandra-marques.jpg',
      url: null,
      status: 'Em implantação',
      tamanho: 'alto',
    },
    {
      cliente: 'Elite Boots Store',
      nicho: 'Varejo esportivo',
      tipo: 'Sistema de catálogo e estoque',
      imagem: '/projetos/elite-boots.jpg',
      url: 'https://elite-boots-store.vercel.app/',
      status: 'Projeto próprio',
      tamanho: 'alto',
    },
  ],
};

// --- 5. Diferenciais -----------------------------------------------------
export const diferenciais = {
  olho: 'Por que comigo',
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
  olho: 'Como funciona',
  titulo: 'Do primeiro oi ao site no ar',
  itens: [
    {
      n: '01',
      titulo: 'Diagnóstico',
      texto:
        'Uma conversa para entender como o negócio funciona hoje e onde está travando. Sem custo e sem compromisso.',
      prazo: '30 minutos',
    },
    {
      n: '02',
      titulo: 'Proposta',
      texto:
        'Escopo, prazo e valor por escrito. Você aprova antes de qualquer coisa começar a ser construída.',
      prazo: 'até 2 dias',
    },
    {
      n: '03',
      titulo: 'Construção',
      texto:
        'Você acompanha o projeto tomando forma e ajusta no caminho, em vez de ver o resultado só no final.',
      prazo: '2 a 4 semanas',
    },
    {
      n: '04',
      titulo: 'Suporte contínuo',
      texto:
        'Depois da entrega eu continuo por perto para manter, corrigir e evoluir conforme o negócio muda.',
      prazo: 'sem prazo',
    },
  ],
};

// --- 7. Chamada final ----------------------------------------------------
export const chamada = {
  olho: 'Próximo passo',
  titulo: [
    { texto: 'Seu negócio pode começar a' },
    { texto: 'atender melhor', destaque: true },
    { texto: 'ainda esta semana.' },
  ],
  texto:
    'Me conte em uma mensagem o que está travando hoje. Eu respondo com um diagnóstico honesto — inclusive se a resposta for que você ainda não precisa contratar nada.',
  cta: 'Falar no WhatsApp',
};

// --- 8. Rodapé -----------------------------------------------------------
export const rodape = {
  frase: 'Sites, sistemas e agentes de IA para negócios que querem crescer sem contratar mais gente.',
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
