import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';

/* Fontes servidas pelo próprio site — sem chamada ao Google.
   Instrument Serif: títulos. Geist Sans: todo o resto.
   Só o subconjunto latino é carregado; é o que o português usa. */
import '@fontsource/instrument-serif/latin-400.css';
import '@fontsource/instrument-serif/latin-400-italic.css';
import '@fontsource/geist-sans/latin-400.css';
import '@fontsource/geist-sans/latin-500.css';

import './styles/global.css';
import App from './App';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>
);
