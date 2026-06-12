import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ShieldCheck, User, Mail, Lock, Phone } from 'lucide-react';

export default function Register() {
  const navigate = useNavigate();
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [phone, setPhone] = useState('');
  
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleRegister = async (e) => {
    e.preventDefault();
    setError('');

    if (password !== confirmPassword) {
      setError('Las contraseñas no coinciden');
      return;
    }

    setLoading(true);

    // Split fullName into nombre and Apellido
    const parts = fullName.trim().split(' ');
    const nombre = parts[0];
    const Apellido = parts.slice(1).join(' ') || ' ';

    try {
      const res = await fetch('/api/registroClientes', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify({
          nombre,
          Apellido,
          correo: email,
          contraseña: password,
          telefono: phone || '000000000'
        })
      });
      const data = await res.json();
      if (res.ok) {
        // Redirigir a la página de verificación con el email
        navigate('/verify-email', { state: { email } });
      } else {
        setError(data.message || 'Error en el registro');
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
        
        <div className="text-center mb-6">
          <h2 className="text-2xl font-bold mb-2">Crea tu cuenta</h2>
          <p className="text-sm text-gray-500">Únete a nosotros para comprar de forma sostenible.</p>
        </div>

        {error && (
          <div className="bg-red-50 text-red-600 text-xs font-semibold p-3 rounded-lg mb-4 text-left border border-red-100">
            {error}
          </div>
        )}

        <form className="space-y-4" onSubmit={handleRegister}>
          <div className="relative">
            <User className="w-4 h-4 absolute left-3 top-3 text-gray-400" />
            <input 
              type="text" 
              required
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              placeholder="Nombre completo" 
              className="w-full bg-gray-50 border rounded-lg pl-10 pr-4 py-2 text-sm outline-none focus:border-primary" 
            />
          </div>

          <div className="relative">
            <Mail className="w-4 h-4 absolute left-3 top-3 text-gray-400" />
            <input 
              type="email" 
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Correo electrónico" 
              className="w-full bg-gray-50 border rounded-lg pl-10 pr-4 py-2 text-sm outline-none focus:border-primary" 
            />
          </div>

          <div className="relative">
            <Phone className="w-4 h-4 absolute left-3 top-3 text-gray-400" />
            <input 
              type="tel" 
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              placeholder="Número de teléfono (ej. +34 600000000)" 
              className="w-full bg-gray-50 border rounded-lg pl-10 pr-4 py-2 text-sm outline-none focus:border-primary" 
            />
          </div>
          
          <div className="relative">
            <Lock className="w-4 h-4 absolute left-3 top-3 text-gray-400" />
            <input 
              type="password" 
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Contraseña" 
              className="w-full bg-gray-50 border rounded-lg pl-10 pr-4 py-2 text-sm outline-none focus:border-primary" 
            />
          </div>

          <div className="relative">
            <Lock className="w-4 h-4 absolute left-3 top-3 text-gray-400" />
            <input 
              type="password" 
              required
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              placeholder="Confirmar contraseña" 
              className="w-full bg-gray-50 border rounded-lg pl-10 pr-4 py-2 text-sm outline-none focus:border-primary" 
            />
          </div>

          <button 
            type="submit" 
            disabled={loading}
            className="w-full bg-blue-600 text-white py-3 rounded-lg font-medium text-sm hover:bg-blue-700 transition flex justify-center mt-6 cursor-pointer disabled:bg-blue-300"
          >
            {loading ? 'Registrando...' : 'Registrarse →'}
          </button>
        </form>

        <p className="text-center text-sm text-gray-600 mt-8">
          ¿Ya tienes una cuenta? <Link to="/login" className="text-primary font-medium hover:underline">Inicia Sesión</Link>
        </p>
      </div>
    </div>
  );
}

