import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { User, Mail, Lock, Phone } from 'lucide-react';
import { useForm } from '../hooks/useForm';
import { useAuth } from '../hooks/useAuth';
import LoginInfoPanel from '../components/LoginInfoPanel';

export default function Register() {
  const navigate = useNavigate();
  const { values, handleChange, handleBlur } = useForm({
    fullName: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: '',
  });

  const { register } = useAuth();
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleRegister = async (e) => {
    e.preventDefault();
    setError('');

    if (values.password !== values.confirmPassword) {
      setError('Las contraseñas no coinciden');
      return;
    }

    setLoading(true);

    const parts = values.fullName.trim().split(' ');
    const nombre = parts[0];
    const Apellido = parts.slice(1).join(' ') || ' ';

    const result = await register({
      nombre,
      Apellido,
      correo: values.email,
      contrasena: values.password,
      telefono: values.phone || '000000000',
    });

    if (result.ok) {
      navigate('/verify-email', {
        state: { email: values.email }
      });
    } else {
      setError(result.error);
    }
    setLoading(false);
  };

  return (
    <div className="min-h-screen flex bg-gray-50">
      {/* Left: Info Panel (hidden on mobile) */}
      <div className="hidden lg:flex lg:w-1/2 bg-gradient-to-br from-blue-700 via-blue-600 to-indigo-700 relative overflow-hidden">
        <div
          className="absolute inset-0 opacity-10"
          style={{
            backgroundImage:
              'linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)',
            backgroundSize: '60px 60px',
          }}
        />
        <LoginInfoPanel />
      </div>

      {/* Right: Form */}
      <div className="flex-1 flex items-center justify-center p-6 lg:p-12">
        <div className="w-full max-w-[440px]">
          {/* Mobile brand */}
          <div className="lg:hidden flex justify-center mb-10">
            <div className="flex items-center gap-2.5">
              <div className="bg-blue-100 rounded-xl p-2">
                <svg className="w-6 h-6 text-primary" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z" />
                </svg>
              </div>
              <span className="text-xl font-black text-gray-800">TRUSTPHONE</span>
            </div>
          </div>

          {/* Title */}
          <div className="mb-8">
            <h2 className="text-3xl font-black text-gray-900 mb-2">
              Crea tu cuenta
            </h2>
            <p className="text-gray-500 text-sm">
              Únete a nosotros para comprar de forma segura y sostenible.
            </p>
          </div>

          {/* Error banner */}
          {error && (
            <div className="flex items-center gap-3 bg-red-50 text-red-700 text-sm font-medium p-4 rounded-xl mb-6 border border-red-200 shadow-sm">
              <div className="bg-red-100 rounded-full p-1.5 flex-shrink-0">
                <svg className="w-5 h-5 text-red-600" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m9-.75a9 9 0 11-18 0 9 9 0 0118 0zm-9 3.75h.008v.008H12v-.008z" />
                </svg>
              </div>
              <span>{error}</span>
            </div>
          )}

          {/* Form */}
          <form className="space-y-4" onSubmit={handleRegister} noValidate>
            {/* Full Name */}
            <div>
              <label htmlFor="fullName" className="block text-sm font-semibold text-gray-700 mb-1.5">
                Nombre completo
              </label>
              <div className="relative group">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none">
                  <User className="w-5 h-5 text-gray-400 group-focus-within:text-primary transition-colors" />
                </div>
                <input
                  id="fullName"
                  name="fullName"
                  type="text"
                  autoComplete="name"
                  required
                  value={values.fullName}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  placeholder="Juan Pérez"
                  className="w-full border-2 border-gray-200 rounded-xl pl-11 pr-4 py-3 text-sm outline-none transition-all duration-200 focus:border-primary focus:ring-4 focus:ring-primary/10 bg-white"
                />
              </div>
            </div>

            {/* Email */}
            <div>
              <label htmlFor="email" className="block text-sm font-semibold text-gray-700 mb-1.5">
                Correo electrónico
              </label>
              <div className="relative group">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none">
                  <Mail className="w-5 h-5 text-gray-400 group-focus-within:text-primary transition-colors" />
                </div>
                <input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  value={values.email}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  placeholder="ejemplo@correo.com"
                  className="w-full border-2 border-gray-200 rounded-xl pl-11 pr-4 py-3 text-sm outline-none transition-all duration-200 focus:border-primary focus:ring-4 focus:ring-primary/10 bg-white"
                />
              </div>
            </div>

            {/* Phone */}
            <div>
              <label htmlFor="phone" className="block text-sm font-semibold text-gray-700 mb-1.5">
                Teléfono
              </label>
              <div className="relative group">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none">
                  <Phone className="w-5 h-5 text-gray-400 group-focus-within:text-primary transition-colors" />
                </div>
                <input
                  id="phone"
                  name="phone"
                  type="tel"
                  autoComplete="tel"
                  value={values.phone}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  placeholder="+34 600 000 000"
                  className="w-full border-2 border-gray-200 rounded-xl pl-11 pr-4 py-3 text-sm outline-none transition-all duration-200 focus:border-primary focus:ring-4 focus:ring-primary/10 bg-white"
                />
              </div>
            </div>

            {/* Password */}
            <div>
              <label htmlFor="password" className="block text-sm font-semibold text-gray-700 mb-1.5">
                Contraseña
              </label>
              <div className="relative group">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none">
                  <Lock className="w-5 h-5 text-gray-400 group-focus-within:text-primary transition-colors" />
                </div>
                <input
                  id="password"
                  name="password"
                  type="password"
                  autoComplete="new-password"
                  required
                  value={values.password}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  placeholder="••••••••"
                  className="w-full border-2 border-gray-200 rounded-xl pl-11 pr-4 py-3 text-sm outline-none transition-all duration-200 focus:border-primary focus:ring-4 focus:ring-primary/10 bg-white"
                />
              </div>
            </div>

            {/* Confirm Password */}
            <div>
              <label htmlFor="confirmPassword" className="block text-sm font-semibold text-gray-700 mb-1.5">
                Confirmar contraseña
              </label>
              <div className="relative group">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none">
                  <Lock className="w-5 h-5 text-gray-400 group-focus-within:text-primary transition-colors" />
                </div>
                <input
                  id="confirmPassword"
                  name="confirmPassword"
                  type="password"
                  autoComplete="new-password"
                  required
                  value={values.confirmPassword}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  placeholder="••••••••"
                  className="w-full border-2 border-gray-200 rounded-xl pl-11 pr-4 py-3 text-sm outline-none transition-all duration-200 focus:border-primary focus:ring-4 focus:ring-primary/10 bg-white"
                />
              </div>
            </div>

            {/* Submit */}
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-gradient-to-r from-blue-600 to-blue-500 text-white py-3.5 rounded-xl font-semibold text-sm tracking-wide transition-all duration-200 hover:from-blue-700 hover:to-blue-600 hover:shadow-lg hover:shadow-blue-200 active:scale-[0.98] flex justify-center items-center cursor-pointer disabled:opacity-60 disabled:cursor-not-allowed disabled:hover:shadow-none disabled:active:scale-100"
            >
              {loading ? (
                <span className="flex items-center gap-2">
                  <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                  </svg>
                  Registrando...
                </span>
              ) : (
                <span className="flex items-center gap-2">
                  Registrarse
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" strokeWidth="2.5" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
                  </svg>
                </span>
              )}
            </button>
          </form>

          {/* Login link */}
          <p className="text-center text-sm text-gray-500 mt-6">
            ¿Ya tienes una cuenta?{' '}
            <Link
              to="/login"
              className="text-primary font-semibold hover:text-blue-700 transition-colors hover:underline"
            >
              Inicia Sesión
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
