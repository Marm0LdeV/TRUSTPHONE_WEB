import { useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import LoginForm from '../components/LoginForm';
import LoginInfoPanel from '../components/LoginInfoPanel';

export default function LoginPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const { loading, error, login, clearError } = useAuth();

  const from = location.state?.from?.pathname || '/';
  const justVerified = location.state?.verified || false;

  const handleSubmit = async (email, password, remember) => {
    clearError();
    const result = await login(email, password);
    if (result.ok) {
      navigate(from, { replace: true });
    } else if (result.needsVerification) {
      navigate('/verify-email', { state: { email: result.email } });
    }
  };

  return (
    <div className="flex-1 flex">

      {/* Left: Info Panel (full height) */}
      <div className="hidden lg:flex lg:w-5/12 bg-gradient-to-br from-blue-700 via-blue-600 to-indigo-700 relative overflow-hidden">
        {/* Decorative grid pattern */}
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

      {/* Right: Form (full height, scrollable if needed) */}
      <div className="flex-1 flex items-center justify-center p-8 lg:p-16 bg-white">
        <div className="w-full max-w-[420px]">
          {/* Mobile brand */}
          <div className="lg:hidden flex justify-center mb-8">
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
              Bienvenido de nuevo
            </h2>
            <p className="text-gray-500 text-sm">
              Inicia sesión para continuar comprando de forma segura y sostenible.
            </p>
          </div>

          {/* Form */}
          <LoginForm
            onSubmit={handleSubmit}
            loading={loading}
            error={error}
            justVerified={justVerified}
          />
        </div>
      </div>

    </div>
  );
}
