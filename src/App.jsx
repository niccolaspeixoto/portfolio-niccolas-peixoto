import Nav from './components/Nav';
import Hero from './sections/Hero';
import Problemas from './sections/Problemas';
import Cases from './sections/Cases';
import Projetos from './sections/Projetos';
import Diferenciais from './sections/Diferenciais';
import Processo from './sections/Processo';
import Chamada from './sections/Chamada';
import Rodape from './components/Rodape';

export default function App() {
  return (
    <>
      <a href="#conteudo" className="pular">
        Pular para o conteúdo
      </a>

      {/* Grão de filme sobre a página inteira. */}
      <div className="grao" aria-hidden="true" />

      <Nav />

      <main id="conteudo">
        <Hero />
        <Problemas />
        <Cases />
        <Projetos />
        <Diferenciais />
        <Processo />
        <Chamada />
      </main>

      <Rodape />
    </>
  );
}
