import { Link } from 'react-router-dom';
import { ShoppingCart, User, Search, ShieldCheck } from 'lucide-react';

export default function Navbar() {
  return (
    <nav className="bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-between sticky top-0 z-50">
      <Link to="/" className="flex items-center gap-2 text-xl font-bold text-gray-800">
        <ShieldCheck className="text-primary w-8 h-8" />
        <span>TRUSTPHONE</span>
      </Link>

      <div className="flex-1 max-w-md mx-8">
        <div className="relative">
          <Search className="absolute left-3 top-2.5 text-gray-400 w-5 h-5" />
          <input 
            type="text" 
            placeholder="Buscar celulares..." 
            className="w-full bg-gray-100 rounded-full py-2 pl-10 pr-4 outline-none focus:ring-2 focus:ring-primary/20"
          />
        </div>
      </div>

      <div className="flex items-center gap-8 text-sm font-medium">
        <Link to="/" className="text-primary hover:text-blue-800">Inicio</Link>
        <Link to="/catalogo" className="text-gray-600 hover:text-primary">Catálogo</Link>
        <Link to="/contacto" className="text-gray-600 hover:text-primary">Contáctanos</Link>
      </div>

      <div className="flex items-center gap-4 ml-8">
        <Link to="/carrito" className="text-gray-800 hover:text-primary">
          <ShoppingCart className="w-6 h-6" />
        </Link>
        <Link to="/login" className="text-gray-800 hover:text-primary">
          <User className="w-6 h-6" />
        </Link>
      </div>
    </nav>
  );
}
