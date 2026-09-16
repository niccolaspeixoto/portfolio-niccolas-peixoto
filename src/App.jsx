import Nav from './components/Nav';
import Hero from './sections/Hero';
import Pilares from './sections/Pilares';
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

      <Nav />

      <main id="conteudo">
        <Hero />
        <Pilares />
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
