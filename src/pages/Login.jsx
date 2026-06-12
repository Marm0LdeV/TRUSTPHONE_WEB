import { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { ShieldCheck, Mail, Lock, CheckCircle } from 'lucide-react';

export default function Login() {
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || '/';
  const justVerified = location.state?.verified || false;

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      const res = await fetch('/api/loginClientes', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify({ correo: email, contrasena: password })
      });
      const data = await res.json();

      if (res.ok) {
        // Usar los datos del usuario directamente del response
        if (data.user) {
          localStorage.setItem('user', JSON.stringify(data.user));
        } else {
          localStorage.setItem('user', JSON.stringify({ correo: email, nombre: 'Cliente' }));
        }
        navigate(from, { replace: true });
      } else if (data.needsVerification) {
        // Redirigir a verificación si la cuenta no está verificada
        navigate('/verify-email', { state: { email } });
      } else {
        setError(data.message || 'Credenciales inválidas');
      }
    } catch (err) {
      console.error(err);
      setError('Error al conectar con el servidor');
    } finally {
      setLoading(false);
    }
  };

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
          
          {justVerified && (
            <div className="flex items-center gap-2 bg-green-50 text-green-700 text-xs font-semibold p-3 rounded-lg mb-4 text-left border border-green-100">
              <CheckCircle className="w-4 h-4 flex-shrink-0" />
              ¡Cuenta verificada correctamente! Ya puedes iniciar sesión.
            </div>
          )}

          {error && (
            <div className="bg-red-50 text-red-600 text-xs font-semibold p-3 rounded-lg mb-4 text-left border border-red-100">
              {error}
            </div>
          )}

          <form className="space-y-4 text-left" onSubmit={handleLogin}>
            <div>
              <label className="block text-xs font-semibold text-gray-600 mb-1">Correo electrónico</label>
              <div className="relative">
                <Mail className="w-4 h-4 absolute left-3 top-3 text-gray-400" />
                <input 
                  type="email" 
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="ejemplo@correo.com" 
                  className="w-full border rounded-lg pl-10 pr-4 py-2 text-sm outline-none focus:border-primary" 
                />
              </div>
            </div>
            
            <div>
              <div className="flex justify-between items-center mb-1">
                <label className="block text-xs font-semibold text-gray-600">Contraseña</label>
                <Link to="#" className="text-xs text-primary hover:underline">¿Olvidaste tu contraseña?</Link>
              </div>
              <div className="relative">
                <Lock className="w-4 h-4 absolute left-3 top-3 text-gray-400" />
                <input 
                  type="password" 
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••" 
                  className="w-full border rounded-lg pl-10 pr-4 py-2 text-sm outline-none focus:border-primary" 
                />
              </div>
            </div>

            <div className="flex items-center gap-2">
              <input type="checkbox" id="remember" className="rounded" />
              <label htmlFor="remember" className="text-xs text-gray-600">Recordarme en este dispositivo</label>
            </div>

            <button 
              type="submit" 
              disabled={loading}
              className="w-full bg-blue-500 text-white py-2 rounded-lg font-medium text-sm hover:bg-blue-600 transition flex justify-center items-center cursor-pointer disabled:bg-blue-300"
            >
              {loading ? 'Iniciando sesión...' : 'Iniciar Sesión →'}
            </button>
          </form>
        </div>

        <p className="text-center text-sm text-gray-600">
          ¿No tienes una cuenta? <Link to="/register" className="text-primary font-medium hover:underline">Regístrate</Link>
        </p>
      </div>
    </div>
  );
}

