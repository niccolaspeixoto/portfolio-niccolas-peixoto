# Niccolas Peixoto — site institucional

Landing page de página única para uma operação de desenvolvimento de software
que atende pequenos e médios negócios locais: sites institucionais, sistemas
sob medida e agentes de IA para atendimento no WhatsApp.

Feito em **React + Vite + Framer Motion**, com CSS puro (sem framework de
estilo). As fontes são servidas pelo próprio site, sem chamada ao Google.

---

## Rodando

```bash
npm install
npm run dev      # http://localhost:5173
npm run build    # gera a pasta dist/
npm run preview  # testa o build antes de publicar
npm run lint     # oxlint
```

---

## Onde mexer

### Para trocar qualquer texto do site

Tudo mora em **`src/data/conteudo.js`**. Nenhum componente tem texto escrito
dentro dele. Telefone, e-mail, redes, títulos, cases, projetos, etapas do
processo: tudo sai desse arquivo.

Trocar o número do WhatsApp, por exemplo, é mudar uma linha:

```js
const TELEFONE = '5511952397051';   // 55 (país) + 11 (DDD) + número
```

O link é montado com uma mensagem inicial já preenchida, para a conversa não
começar em branco. Ela está em `MENSAGEM_PADRAO`, logo abaixo.

### Para trocar as cores ou a tipografia

**`src/styles/global.css`**, no bloco `:root` do topo. A paleta inteira e a
escala de tamanhos de texto estão ali como variáveis.

### Para trocar a sua foto

Substitua **`public/niccolas.jpg`**. A moldura corta em 4:5 a partir do topo,
então uma foto vertical funciona melhor. Se trocar o arquivo, ajuste também os
atributos `width` e `height` em `src/sections/Hero.jsx` para as dimensões reais
da nova imagem.

### Para adicionar um projeto na vitrine

1. Ponha o print em `public/projetos/` (JPEG, no máximo 1200px de largura).
2. Acrescente o item em `projetos.itens`, em `src/data/conteudo.js`.
3. O campo `tamanho` (`alto` | `medio` | `baixo`) define a proporção do card.

A galeria é propositalmente irregular: o posicionamento de cada card na grade
está em `src/sections/Projetos.css`, nos seletores `:nth-child()`. Ao passar de
quatro projetos, acrescente as regras dos novos índices lá.

---

## Antes de publicar

Três pontos que ficaram em aberto de propósito:

1. **Nenhum depoimento é real ainda.** Os cases descrevem o que cada site
   entrega, não resultado medido. Quando um cliente te mandar uma frase ou um
   número (volume de mensagens, tempo de resposta, faturamento), preencha o
   campo `depoimento` do case — o bloco de citação já está pronto e só aparece
   quando existe conteúdo. Troque também o campo `resultado`.
2. **Dois projetos estão marcados como "Em implantação"** porque os domínios
   `thalitakuesteis.com.br` e `alexandramarques.com.br` ainda não respondem.
   Quando entrarem no ar, mude `status` para `'No ar'` e preencha a `url`.
3. **O domínio do site não está definido.** Quando existir, acrescente a tag
   `<link rel="canonical">` e as URLs absolutas de `og:url` e `og:image` no
   `index.html`.

---

## Estrutura

```
public/
├─ niccolas.jpg              foto do hero
├─ og.jpg                    imagem de compartilhamento (WhatsApp, LinkedIn)
└─ projetos/                 prints da vitrine

src/
├─ data/conteudo.js          >>> TODO O TEXTO DO SITE <<<
├─ styles/global.css         tokens, reset e primitivas (.quadro .grade .olho .botao)
├─ lib/animacoes.js          variantes do Framer Motion
├─ components/
│  ├─ Nav.jsx                topo fixo + menu de celular
│  ├─ Reveal.jsx             entrada dos blocos ao rolar
│  ├─ TituloLinhas.jsx       título grande com revelação por linha
│  └─ Rodape.jsx
└─ sections/                 uma pasta de arquivos por seção, na ordem da página
   ├─ Hero.jsx               1. foto + promessa + três pilares
   ├─ Problemas.jsx          2. dor → solução
   ├─ Cases.jsx              3. prova social
   ├─ Projetos.jsx           4. vitrine
   ├─ Diferenciais.jsx       5. por que comigo
   ├─ Processo.jsx           6. como funciona
   └─ Chamada.jsx            7. fechamento
```

---

## Decisões de projeto

- **Nada de grade simétrica.** Todas as seções ocupam faixas desiguais de uma
  grade de 12 colunas. Se você mexer nos `grid-column`, mantenha a assimetria:
  é ela que diferencia o site de um template.
- **Um único recurso de destaque.** A palavra em terracota itálico aparece só
  nos dois títulos maiores (hero e fechamento). Espalhar cor pelo resto tira a
  força dela.
- **Movimento discreto.** Entradas suaves ao rolar e um parallax leve na foto.
  Quem liga "reduzir movimento" no sistema recebe a página parada, sem nenhum
  bloco invisível.
- **Sem ícone decorativo.** Os poucos ícones existentes marcam ação (WhatsApp,
  link externo, seta). Cartões com ícone centralizado e sombra suave foram
  evitados de propósito.
