import { startTransition, useEffect, useState } from 'react';
import ScrollSuave from './components/ScrollSuave';
import Atmosfera from './components/Atmosfera';
import Nav from './components/Nav';
import Hero from './sections/Hero';
import Demonstracao from './sections/Demonstracao';
import Problemas from './sections/Problemas';
import PorQueSistema from './sections/PorQueSistema';
import Sistema from './sections/Sistema';
import Projetos from './sections/Projetos';
import FaixaCinetica from './sections/FaixaCinetica';
import Diferenciais from './sections/Diferenciais';
import Processo from './sections/Processo';
import Chamada from './sections/Chamada';
import Rodape from './components/Rodape';

/* A primeira tela (nav, hero, demonstração) monta na hora. O resto entra
   num segundo render, em transição: o React fatia esse trabalho em
   pedaços pequenos e devolve a vez pro navegador entre eles, em vez de
   travar o celular num bloco só no carregamento. Tudo continua no mesmo
   pacote — dividir em arquivos custou uma ida a mais à rede e piorou. */
function useRestoDaPagina() {
  const [pronto, setPronto] = useState(false);
  useEffect(() => {
    startTransition(() => setPronto(true));
  }, []);
  return pronto;
}

/* Link com #âncora aberto de fora (ex.: alguém compartilhou .../#contato):
   a seção ainda não existe quando o navegador tenta rolar até ela. Espera
   ela aparecer e rola. */
function useAncoraInicial() {
  useEffect(() => {
    const { hash } = window.location;
    if (!hash || hash === '#topo') return undefined;
    let tentativas = 0;
    const id = setInterval(() => {
      const alvo = document.querySelector(hash);
      tentativas += 1;
      if (alvo) {
        clearInterval(id);
        requestAnimationFrame(() => alvo.scrollIntoView());
      } else if (tentativas > 40) {
        clearInterval(id);
      }
    }, 100);
    return () => clearInterval(id);
  }, []);
}

export default function App() {
  const resto = useRestoDaPagina();
  useAncoraInicial();

  return (
    <ScrollSuave>
      <a href="#conteudo" className="pular">
        Pular para o conteúdo
      </a>

      <Atmosfera />
      <Nav />

      <main id="conteudo">
        <Hero />
        <Demonstracao />
        {resto ? (
          <>
            <Problemas />
            <PorQueSistema />
            <Sistema />
            <Projetos />
            <FaixaCinetica />
            <Diferenciais />
            <Processo />
            <Chamada />
          </>
        ) : (
          <div className="secao-chegando" />
        )}
      </main>

      {resto && <Rodape />}
    </ScrollSuave>
  );
}
