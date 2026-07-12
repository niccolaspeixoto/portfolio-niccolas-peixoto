# Portfólio — Niccolas Peixoto

Site pessoal desenvolvido com **React + Vite**, **Framer Motion** e CSS puro (sem framework de UI), no tema dark solicitado no briefing.

## Rodando localmente

```bash
npm install
npm run dev
```

Acesse `http://localhost:5173`.

## Build de produção

```bash
npm run build
npm run preview
```

Os arquivos finais ficam em `dist/`.

## O que ainda falta personalizar

1. **Foto de perfil** — em `src/components/PhotoFrame.jsx`, troque o placeholder pela sua foto real:
   ```jsx
   <img src="/sua-foto.jpg" alt="Niccolas Peixoto" loading="lazy" />
   ```
   Coloque o arquivo em `public/`. Recomendado: 900×1100px, fundo neutro.

2. **Prints dos projetos** — em `src/sections/Projects.jsx`, cada `.project-card__media` está com um placeholder tracejado. Substitua pelo `<img>` do print real do projeto (`loading="lazy"`).

3. **Links reais** — atualize os `href` de GitHub, LinkedIn, e-mail e WhatsApp em:
   - `src/sections/Hero.jsx`
   - `src/sections/Contact.jsx`
   - `src/sections/Projects.jsx` (`liveUrl` / `repoUrl` de cada projeto)

4. **Imagem de Open Graph** — adicione um `og-image.png` (1200×630px) em `public/` para o preview correto ao compartilhar o link no LinkedIn/WhatsApp.

5. **Domínio** — troque `https://niccolaspeixoto.dev/` em `index.html` pela URL final depois do deploy.

## Deploy (Vercel)

```bash
npm install -g vercel
vercel
```

Ou conecte o repositório diretamente pelo painel da Vercel — o projeto já está configurado como Vite padrão, sem necessidade de configuração extra.

## Estrutura

```
src/
  components/   # Navbar, Footer, PhotoFrame (elementos reutilizáveis)
  sections/     # Hero, About, Skills, Projects, Process, Contact
  styles/       # tokens.css — variáveis de cor, tipografia e espaçamento
```

Todas as cores, fontes e espaçamentos centrais estão em `src/styles/tokens.css` — é o primeiro lugar para ajustar a identidade visual.
