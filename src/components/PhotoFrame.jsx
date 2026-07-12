import { User } from 'lucide-react';
import './PhotoFrame.css';
import PerfilPhoto from '../assets/foto-perfil-larga.png';

/**
 * Placeholder para a foto profissional real.
 * Basta substituir o conteúdo por: <img src="/sua-foto.jpg" alt="Niccolas Peixoto" />
 */
export default function PhotoFrame() {
  return (
    <div className="photo-frame">
      <div className="photo-frame__glow" aria-hidden="true" />
      <div className="photo-frame__frame">
        <div className="photo-frame__placeholder">
          <img src={PerfilPhoto} alt="Niccolas Peixoto" />
        </div>
      </div>
    </div>
  );
}
