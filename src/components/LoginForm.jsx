import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Mail, Lock, CheckCircle, Eye, EyeOff } from 'lucide-react';
import { useForm } from '../hooks/useForm';

export default function LoginForm({ onSubmit, loading, error, justVerified }) {
  const [showPassword, setShowPassword] = useState(false);
  const { values, handleChange, handleBlur } = useForm({
    email: '',
    password: '',
    remember: false,
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(values.email, values.password, values.remember);
  };

  return (
    <div className="w-full max-w-md mx-auto">
      {/* Verification success banner */}
      {justVerified && (
        <div className="flex items-center gap-3 bg-emerald-50 text-emerald-800 text-sm font-medium p-4 rounded-xl mb-6 border border-emerald-200 shadow-sm">
          <div className="bg-emerald-100 rounded-full p-1.5 flex-shrink-0">
            <CheckCircle className="w-5 h-5 text-emerald-600" />
          </div>
          ¡Cuenta verificada correctamente! Ya puedes iniciar sesión.
        </div>
      )}

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

      <form className="space-y-5" onSubmit={handleSubmit} noValidate>
        {/* Email field */}
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

        {/* Password field */}
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
              type={showPassword ? "text" : "password"}
              autoComplete="current-password"
              required
              value={values.password}
              onChange={handleChange}
              onBlur={handleBlur}
              placeholder="••••••••"
              className="w-full border-2 border-gray-200 rounded-xl pl-11 pr-12 py-3 text-sm outline-none transition-all duration-200 focus:border-primary focus:ring-4 focus:ring-primary/10 bg-white"
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-600 transition-colors"
            >
              {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
            </button>
          </div>
          <div className="flex justify-end mt-2">
            <Link
              to="/forgot-password"
              className="text-xs font-medium text-primary hover:text-blue-700 transition-colors hover:underline"
            >
              ¿Olvidaste tu contraseña?
            </Link>
          </div>
        </div>

        {/* Remember me */}
        <div className="flex items-center gap-3">
          <div className="relative flex items-center">
            <input
              id="remember"
              name="remember"
              type="checkbox"
              checked={values.remember}
              onChange={handleChange}
              className="peer w-4 h-4 rounded border-gray-300 text-primary focus:ring-primary/30 cursor-pointer"
            />
          </div>
          <label htmlFor="remember" className="text-sm text-gray-600 select-none cursor-pointer">
            Recordarme en este dispositivo
          </label>
        </div>

        {/* Submit button */}
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
              Iniciando sesión...
            </span>
          ) : (
            <span className="flex items-center gap-2">
              Iniciar Sesión
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" strokeWidth="2.5" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
              </svg>
            </span>
          )}
        </button>
      </form>

      {/* Register link */}
      <p className="text-center text-sm text-gray-500 mt-6">
        ¿No tienes una cuenta?{' '}
        <Link
          to="/register"
          className="text-primary font-semibold hover:text-blue-700 transition-colors hover:underline"
        >
          Regístrate gratis
        </Link>
      </p>
    </div>
  );
}
