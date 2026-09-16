import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';

/* Fontes servidas pelo próprio site, sem chamada ao Google.
   Archivo Variable: títulos, usando o eixo de largura (font-stretch) para a
   voz de display expandida. Geist Sans: todo o resto.
   O unicode-range de cada subconjunto faz o navegador baixar só o latino. */
import '@fontsource-variable/archivo/wdth.css';
import '@fontsource/geist-sans/latin-400.css';
import '@fontsource/geist-sans/latin-500.css';

import './styles/global.css';
import App from './App';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>
);
