import { Link } from 'react-router-dom';
import { ShieldCheck, Mail, Lock } from 'lucide-react';

export default function Login() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 p-6">
      <div className="bg-white w-full max-w-md p-8 rounded-2xl shadow-sm border border-gray-100">
        <div className="flex justify-center mb-6">
          <div className="flex items-center gap-2 text-xl font-bold text-gray-800">
            <ShieldCheck className="text-primary w-6 h-6" />
            <span>TRUSTPHONE</span>
          </div>
        </div>
        
        <div className="text-center mb-8 border border-blue-400 border-dashed p-6 rounded-xl">
          <h2 className="text-2xl font-bold mb-2">Bienvenido de nuevo</h2>
          <p className="text-sm text-gray-500 mb-6">Inicia sesión para continuar comprando de forma sostenible.</p>
          
          <form className="space-y-4 text-left" onSubmit={(e) => e.preventDefault()}>
            <div>
              <label className="block text-xs font-semibold text-gray-600 mb-1">Correo electrónico</label>
              <div className="relative">
                <Mail className="w-4 h-4 absolute left-3 top-3 text-gray-400" />
                <input type="email" placeholder="ejemplo@correo.com" className="w-full border rounded-lg pl-10 pr-4 py-2 text-sm outline-none focus:border-primary" />
              </div>
            </div>
            
            <div>
              <div className="flex justify-between items-center mb-1">
                <label className="block text-xs font-semibold text-gray-600">Contraseña</label>
                <Link to="#" className="text-xs text-primary hover:underline">¿Olvidaste tu contraseña?</Link>
              </div>
              <div className="relative">
                <Lock className="w-4 h-4 absolute left-3 top-3 text-gray-400" />
                <input type="password" placeholder="••••••••" className="w-full border rounded-lg pl-10 pr-4 py-2 text-sm outline-none focus:border-primary" />
              </div>
            </div>

            <div className="flex items-center gap-2">
              <input type="checkbox" id="remember" className="rounded" />
              <label htmlFor="remember" className="text-xs text-gray-600">Recordarme en este dispositivo</label>
            </div>

            <Link to="/" className="w-full bg-blue-500 text-white py-2 rounded-lg font-medium text-sm hover:bg-blue-600 transition flex justify-center">
              Iniciar Sesión &rarr;
            </Link>
          </form>


        </div>

        <p className="text-center text-sm text-gray-600">
          ¿No tienes una cuenta? <Link to="/register" className="text-primary font-medium hover:underline">Regístrate</Link>
        </p>
      </div>
    </div>
  );
}
