import { Link } from 'react-router-dom';
import { ShieldCheck } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-white border-t border-gray-200 pt-12 pb-6 mt-12">
      <div className="max-w-7xl mx-auto px-6 flex justify-center mb-8">
        <div className="text-center flex flex-col items-center">
          <Link to="/" className="flex items-center gap-2 text-xl font-bold text-gray-800 mb-4">
            <ShieldCheck className="text-primary w-6 h-6" />
            <span>TRUSTPHONE</span>
          </Link>
          <p className="text-gray-500 text-sm max-w-md">
            Expertos en smartphones reacondicionados con los más altos estándares de calidad en el mercado.
          </p>
        </div>
      </div>
      
      <div className="max-w-7xl mx-auto px-6 border-t border-gray-100 pt-6 flex justify-between text-xs text-gray-400">
        <p>© 2024 TRUSTPHONE. Todos los derechos reservados.</p>
        <div className="flex gap-4">
          <Link to="#">Privacidad</Link>
          <Link to="#">Términos</Link>
        </div>
      </div>
    </footer>
  );
}
