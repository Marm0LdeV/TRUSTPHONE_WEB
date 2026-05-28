import { Link } from 'react-router-dom';
import { ShieldCheck, User, Mail, Lock } from 'lucide-react';

export default function Register() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 p-6">
      <div className="bg-white w-full max-w-md p-8 rounded-2xl shadow-sm border border-gray-100">
        <div className="flex justify-center mb-6">
          <div className="flex items-center gap-2 text-xl font-bold text-gray-800">
            <ShieldCheck className="text-primary w-6 h-6" />
            <span>TRUSTPHONE</span>
          </div>
        </div>
        
        <div className="text-center mb-6">
          <h2 className="text-2xl font-bold mb-2">Crea tu cuenta</h2>
          <p className="text-sm text-gray-500">Únete a nosotros para comprar de forma sostenible.</p>
        </div>
          
        <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
          <div className="relative">
            <User className="w-4 h-4 absolute left-3 top-3 text-gray-400" />
            <input type="text" placeholder="Nombre completo" className="w-full bg-gray-50 border rounded-lg pl-10 pr-4 py-2 text-sm outline-none focus:border-primary" />
          </div>

          <div className="relative">
            <Mail className="w-4 h-4 absolute left-3 top-3 text-gray-400" />
            <input type="email" placeholder="Correo electrónico" className="w-full bg-gray-50 border rounded-lg pl-10 pr-4 py-2 text-sm outline-none focus:border-primary" />
          </div>
          
          <div className="relative">
            <Lock className="w-4 h-4 absolute left-3 top-3 text-gray-400" />
            <input type="password" placeholder="Contraseña" className="w-full bg-gray-50 border rounded-lg pl-10 pr-4 py-2 text-sm outline-none focus:border-primary" />
          </div>

          <div className="relative">
            <Lock className="w-4 h-4 absolute left-3 top-3 text-gray-400" />
            <input type="password" placeholder="Confirmar contraseña" className="w-full bg-gray-50 border rounded-lg pl-10 pr-4 py-2 text-sm outline-none focus:border-primary" />
          </div>

          <Link to="/" className="w-full bg-blue-600 text-white py-3 rounded-lg font-medium text-sm hover:bg-blue-700 transition flex justify-center mt-6">
            Registrarse &rarr;
          </Link>
        </form>

        <p className="text-center text-sm text-gray-600 mt-8">
          ¿Ya tienes una cuenta? <Link to="/login" className="text-primary font-medium hover:underline">Inicia Sesión</Link>
        </p>
      </div>
    </div>
  );
}
