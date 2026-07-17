import { Link, useNavigate, useLocation } from 'react-router-dom';
import { ShoppingCart, User, Search, ShieldCheck, LogOut, ChevronDown } from 'lucide-react';
import { useState, useEffect, useRef } from 'react';
import { useAuth } from '../hooks/useAuth';

export default function Navbar() {
  const navigate = useNavigate();
  const location = useLocation();
  const path = location.pathname;
  const { user, logout } = useAuth();
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);

  // Real cart count from localStorage
  const [cartCount, setCartCount] = useState(0);
  useEffect(() => {
    const updateCount = () => {
      try {
        const stored = localStorage.getItem('cart');
        if (stored) {
          const items = JSON.parse(stored);
          setCartCount(items.reduce((acc, item) => acc + (item.quantity || 1), 0));
        } else {
          setCartCount(0);
        }
      } catch { setCartCount(0); }
    };
    updateCount();
    window.addEventListener('cartUpdated', updateCount);
    window.addEventListener('storage', updateCount);
    return () => {
      window.removeEventListener('cartUpdated', updateCount);
      window.removeEventListener('storage', updateCount);
    };
  }, []);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handler = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, []);

  const handleLogout = async () => {
    setDropdownOpen(false);
    navigate('/', { replace: true });
    await logout();
  };

  const displayName = user ? `${user.nombre || ''}`.trim() || 'Mi Cuenta' : null;

  return (
    <nav className="bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-between sticky top-0 z-50 shadow-sm">
      <Link to="/" className="flex items-center gap-2 text-xl font-bold text-gray-800">
        <ShieldCheck className="text-primary w-8 h-8" />
        <span>TRUSTPHONE</span>
      </Link>



      <div className="flex items-center gap-8 text-sm font-medium ml-auto mr-12">
        <Link to="/" className={path === '/' ? "text-primary font-bold hover:text-blue-800" : "text-gray-600 hover:text-primary"}>Inicio</Link>
        <Link to="/catalogo" className={path === '/catalogo' ? "text-primary font-bold hover:text-blue-800" : "text-gray-600 hover:text-primary"}>Catálogo</Link>
        <Link to="/contacto" className={path === '/contacto' ? "text-primary font-bold hover:text-blue-800" : "text-gray-600 hover:text-primary"}>Contáctanos</Link>
      </div>

      <div className="flex items-center gap-4 ml-8">
        {/* Cart icon with badge */}
        <Link to="/carrito" className={`${path === '/carrito' ? 'text-primary' : 'text-gray-800'} hover:text-primary relative`}>
          <ShoppingCart className="w-6 h-6" />
          {cartCount > 0 && (
            <span className="absolute -top-2 -right-2 bg-blue-600 text-white text-[9px] font-bold rounded-full w-4 h-4 flex items-center justify-center border border-white">
              {cartCount > 99 ? '99+' : cartCount}
            </span>
          )}
        </Link>

        {/* User section */}
        {user ? (
          <div className="relative" ref={dropdownRef}>
            <button
              onClick={() => setDropdownOpen(prev => !prev)}
              className="flex items-center gap-2 text-sm font-semibold text-gray-700 hover:text-primary transition"
            >
              <div className={`w-8 h-8 rounded-full flex items-center justify-center transition-colors ${path === '/perfil' ? 'bg-primary text-white' : 'bg-blue-100 text-primary'}`}>
                <User className="w-4 h-4" />
              </div>
              <span className="hidden sm:block max-w-[100px] truncate">{displayName}</span>
              <ChevronDown className={`w-4 h-4 transition-transform ${dropdownOpen ? 'rotate-180' : ''}`} />
            </button>

            {dropdownOpen && (
              <div className="absolute right-0 mt-2 w-48 bg-white rounded-xl border border-gray-100 shadow-lg py-2 z-50">
                <Link
                  to="/perfil"
                  onClick={() => setDropdownOpen(false)}
                  className="flex items-center gap-3 px-4 py-2.5 text-sm text-gray-700 hover:bg-gray-50"
                >
                  <User className="w-4 h-4 text-gray-400" /> Mi Perfil
                </Link>
                <Link
                  to="/carrito"
                  onClick={() => setDropdownOpen(false)}
                  className="flex items-center gap-3 px-4 py-2.5 text-sm text-gray-700 hover:bg-gray-50"
                >
                  <ShoppingCart className="w-4 h-4 text-gray-400" /> Mi Carrito
                </Link>
                <hr className="my-1 border-gray-100" />
                <button
                  onClick={handleLogout}
                  className="w-full flex items-center gap-3 px-4 py-2.5 text-sm text-red-600 hover:bg-red-50 text-left"
                >
                  <LogOut className="w-4 h-4" /> Cerrar Sesión
                </button>
              </div>
            )}
          </div>
        ) : (
          <Link
            to="/login"
            className="flex items-center gap-2 bg-primary text-white px-4 py-2 rounded-lg text-sm font-semibold hover:bg-blue-700 transition"
          >
            <User className="w-4 h-4" /> Iniciar Sesión
          </Link>
        )}
      </div>
    </nav>
  );
}
