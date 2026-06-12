import { useState, useRef, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { ShieldCheck, Mail, ArrowLeft, CheckCircle, AlertCircle, Clock, Loader2 } from 'lucide-react';

export default function VerifyEmail() {
  const navigate = useNavigate();
  const location = useLocation();
  const emailFromState = location.state?.email || '';

  const [code, setCode] = useState(['', '', '', '', '', '']);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [loading, setLoading] = useState(false);
  const [timeLeft, setTimeLeft] = useState(15 * 60); // 15 minutes in seconds
  const [isExpired, setIsExpired] = useState(false);
  const [shakeError, setShakeError] = useState(false);
  const [successAnim, setSuccessAnim] = useState(false);

  const inputRefs = useRef([]);

  // Countdown timer
  useEffect(() => {
    if (timeLeft <= 0) {
      setIsExpired(true);
      return;
    }
    const timer = setInterval(() => {
      setTimeLeft(prev => {
        if (prev <= 1) {
          setIsExpired(true);
          clearInterval(timer);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const formatTime = (seconds) => {
    const m = Math.floor(seconds / 60).toString().padStart(2, '0');
    const s = (seconds % 60).toString().padStart(2, '0');
    return `${m}:${s}`;
  };

  const handleChange = (index, value) => {
    // Only allow hex characters
    const hexChar = value.replace(/[^a-fA-F0-9]/g, '').slice(-1);
    const newCode = [...code];
    newCode[index] = hexChar;
    setCode(newCode);
    setError('');

    // Auto-focus next input
    if (hexChar && index < 5) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (index, e) => {
    if (e.key === 'Backspace' && !code[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  const handlePaste = (e) => {
    e.preventDefault();
    const pasted = e.clipboardData.getData('text').replace(/[^a-fA-F0-9]/g, '').slice(0, 6);
    const newCode = [...code];
    for (let i = 0; i < 6; i++) {
      newCode[i] = pasted[i] || '';
    }
    setCode(newCode);
    // Focus the next empty or last input
    const nextEmpty = newCode.findIndex(c => !c);
    inputRefs.current[nextEmpty === -1 ? 5 : nextEmpty]?.focus();
  };

  const handleVerify = async (e) => {
    e.preventDefault();
    const fullCode = code.join('');

    if (fullCode.length < 6) {
      setError('Ingresa el código completo de 6 caracteres');
      setShakeError(true);
      setTimeout(() => setShakeError(false), 600);
      return;
    }

    if (isExpired) {
      setError('El código ha expirado. Regístrate nuevamente.');
      return;
    }

    setError('');
    setLoading(true);

    try {
      const res = await fetch('/api/registroClientes/verifyCodeEmail', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify({ correo: emailFromState, verificationCodeRequest: fullCode })
      });

      const data = await res.json();

      if (res.ok) {
        setSuccess('¡Cuenta verificada correctamente!');
        setSuccessAnim(true);
        setTimeout(() => {
          navigate('/login', { state: { verified: true } });
        }, 2000);
      } else {
        setError(data.message || 'Código incorrecto o expirado');
        setShakeError(true);
        setTimeout(() => setShakeError(false), 600);
        // Clear the code inputs
        setCode(['', '', '', '', '', '']);
        inputRefs.current[0]?.focus();
      }
    } catch (err) {
      console.error(err);
      setError('Error al conectar con el servidor');
    } finally {
      setLoading(false);
    }
  };

  const timerPercentage = (timeLeft / (15 * 60)) * 100;

  return (
    <div className="min-h-screen flex items-center justify-center p-6" style={{
      background: 'linear-gradient(135deg, #0f172a 0%, #1e293b 50%, #0f172a 100%)'
    }}>
      {/* Animated background elements */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-72 h-72 rounded-full opacity-10" style={{
          background: 'radial-gradient(circle, #3b82f6, transparent)',
          animation: 'pulse 4s ease-in-out infinite'
        }} />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 rounded-full opacity-8" style={{
          background: 'radial-gradient(circle, #8b5cf6, transparent)',
          animation: 'pulse 5s ease-in-out infinite 1s'
        }} />
      </div>

      <div className={`relative w-full max-w-md transition-all duration-500 ${successAnim ? 'scale-105' : ''}`}>
        {/* Main card with glassmorphism */}
        <div className="relative rounded-3xl p-8 border overflow-hidden" style={{
          background: 'rgba(255, 255, 255, 0.05)',
          backdropFilter: 'blur(20px)',
          WebkitBackdropFilter: 'blur(20px)',
          borderColor: 'rgba(255, 255, 255, 0.1)',
          boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.5), inset 0 1px 0 rgba(255, 255, 255, 0.1)'
        }}>
          {/* Gradient border top */}
          <div className="absolute top-0 left-0 right-0 h-1" style={{
            background: 'linear-gradient(90deg, #3b82f6, #8b5cf6, #ec4899)'
          }} />

          {/* Logo */}
          <div className="flex justify-center mb-6">
            <div className="flex items-center gap-2 text-xl font-bold text-white">
              <ShieldCheck className="w-7 h-7" style={{ color: '#60a5fa' }} />
              <span>TRUSTPHONE</span>
            </div>
          </div>

          {/* Email icon animation */}
          <div className="flex justify-center mb-6">
            <div className="relative">
              <div className="w-20 h-20 rounded-2xl flex items-center justify-center" style={{
                background: 'linear-gradient(135deg, rgba(59, 130, 246, 0.2), rgba(139, 92, 246, 0.2))',
                border: '1px solid rgba(59, 130, 246, 0.3)',
                animation: 'float 3s ease-in-out infinite'
              }}>
                {successAnim ? (
                  <CheckCircle className="w-10 h-10 text-green-400" style={{ animation: 'scaleIn 0.5s ease-out' }} />
                ) : (
                  <Mail className="w-10 h-10" style={{ color: '#60a5fa' }} />
                )}
              </div>
              {/* Notification badge */}
              {!successAnim && (
                <div className="absolute -top-1 -right-1 w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold text-white" style={{
                  background: 'linear-gradient(135deg, #ec4899, #f43f5e)',
                  animation: 'bounce 2s infinite'
                }}>
                  1
                </div>
              )}
            </div>
          </div>

          {/* Title */}
          <div className="text-center mb-6">
            <h2 className="text-2xl font-bold text-white mb-2">
              {successAnim ? '¡Verificación Exitosa!' : 'Verifica tu correo'}
            </h2>
            <p className="text-sm" style={{ color: 'rgba(255, 255, 255, 0.6)' }}>
              {successAnim ? (
                'Redirigiendo al inicio de sesión...'
              ) : emailFromState ? (
                <>Enviamos un código de 6 caracteres a <span className="font-semibold" style={{ color: '#60a5fa' }}>{emailFromState}</span></>
              ) : (
                'Ingresa el código hexadecimal que enviamos a tu correo electrónico'
              )}
            </p>
          </div>

          {/* Timer */}
          {!successAnim && (
            <div className="mb-6">
              <div className="flex items-center justify-center gap-2 mb-2">
                <Clock className="w-4 h-4" style={{ color: isExpired ? '#f87171' : 'rgba(255, 255, 255, 0.5)' }} />
                <span className="text-sm font-mono font-semibold" style={{
                  color: isExpired ? '#f87171' : timeLeft < 120 ? '#fbbf24' : 'rgba(255, 255, 255, 0.7)'
                }}>
                  {isExpired ? 'Código expirado' : formatTime(timeLeft)}
                </span>
              </div>
              {/* Progress bar */}
              <div className="w-full h-1 rounded-full overflow-hidden" style={{ background: 'rgba(255, 255, 255, 0.1)' }}>
                <div
                  className="h-full rounded-full transition-all duration-1000 ease-linear"
                  style={{
                    width: `${timerPercentage}%`,
                    background: isExpired
                      ? '#f87171'
                      : timeLeft < 120
                        ? 'linear-gradient(90deg, #f59e0b, #fbbf24)'
                        : 'linear-gradient(90deg, #3b82f6, #8b5cf6)'
                  }}
                />
              </div>
            </div>
          )}

          {/* Error message */}
          {error && (
            <div className={`flex items-center gap-2 p-3 rounded-xl mb-4 text-sm ${shakeError ? 'animate-shake' : ''}`} style={{
              background: 'rgba(239, 68, 68, 0.1)',
              border: '1px solid rgba(239, 68, 68, 0.3)',
              color: '#fca5a5'
            }}>
              <AlertCircle className="w-4 h-4 flex-shrink-0" style={{ color: '#f87171' }} />
              {error}
            </div>
          )}

          {/* Success message */}
          {success && (
            <div className="flex items-center gap-2 p-3 rounded-xl mb-4 text-sm" style={{
              background: 'rgba(34, 197, 94, 0.1)',
              border: '1px solid rgba(34, 197, 94, 0.3)',
              color: '#86efac'
            }}>
              <CheckCircle className="w-4 h-4 flex-shrink-0" style={{ color: '#4ade80' }} />
              {success}
            </div>
          )}

          {/* OTP Code inputs */}
          {!successAnim && (
            <form onSubmit={handleVerify}>
              <div className="flex justify-center gap-2 sm:gap-3 mb-6">
                {code.map((digit, index) => (
                  <input
                    key={index}
                    ref={(el) => (inputRefs.current[index] = el)}
                    type="text"
                    maxLength={1}
                    value={digit}
                    onChange={(e) => handleChange(index, e.target.value)}
                    onKeyDown={(e) => handleKeyDown(index, e)}
                    onPaste={index === 0 ? handlePaste : undefined}
                    disabled={loading || isExpired}
                    className={`w-12 h-14 sm:w-14 sm:h-16 text-center text-xl sm:text-2xl font-bold uppercase rounded-xl outline-none transition-all duration-200 ${shakeError ? 'animate-shake' : ''}`}
                    style={{
                      background: digit
                        ? 'rgba(59, 130, 246, 0.15)'
                        : 'rgba(255, 255, 255, 0.05)',
                      border: digit
                        ? '2px solid rgba(59, 130, 246, 0.5)'
                        : '2px solid rgba(255, 255, 255, 0.1)',
                      color: '#fff',
                      caretColor: '#60a5fa'
                    }}
                    onFocus={(e) => {
                      e.target.style.borderColor = 'rgba(59, 130, 246, 0.7)';
                      e.target.style.boxShadow = '0 0 20px rgba(59, 130, 246, 0.2)';
                    }}
                    onBlur={(e) => {
                      e.target.style.borderColor = digit ? 'rgba(59, 130, 246, 0.5)' : 'rgba(255, 255, 255, 0.1)';
                      e.target.style.boxShadow = 'none';
                    }}
                  />
                ))}
              </div>

              {/* Verify button */}
              <button
                type="submit"
                disabled={loading || isExpired || code.join('').length < 6}
                className="w-full py-3.5 rounded-xl font-semibold text-sm text-white transition-all duration-300 flex items-center justify-center gap-2 cursor-pointer disabled:cursor-not-allowed disabled:opacity-50"
                style={{
                  background: loading || isExpired || code.join('').length < 6
                    ? 'rgba(255, 255, 255, 0.1)'
                    : 'linear-gradient(135deg, #3b82f6, #8b5cf6)',
                  boxShadow: loading || isExpired || code.join('').length < 6
                    ? 'none'
                    : '0 10px 30px -5px rgba(59, 130, 246, 0.4)'
                }}
              >
                {loading ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    Verificando...
                  </>
                ) : (
                  'Verificar código →'
                )}
              </button>
            </form>
          )}

          {/* Footer links */}
          {!successAnim && (
            <div className="mt-6 space-y-3 text-center">
              {isExpired && (
                <Link
                  to="/register"
                  className="block w-full py-3 rounded-xl font-semibold text-sm transition-all duration-300 text-center"
                  style={{
                    background: 'rgba(255, 255, 255, 0.05)',
                    border: '1px solid rgba(255, 255, 255, 0.1)',
                    color: 'rgba(255, 255, 255, 0.7)'
                  }}
                >
                  Registrarse de nuevo →
                </Link>
              )}

              <div className="flex items-center justify-center gap-1 text-sm" style={{ color: 'rgba(255, 255, 255, 0.4)' }}>
                <ArrowLeft className="w-3 h-3" />
                <Link to="/login" className="hover:underline" style={{ color: 'rgba(255, 255, 255, 0.6)' }}>
                  Volver al inicio de sesión
                </Link>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Animations CSS */}
      <style>{`
        @keyframes float {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-8px); }
        }
        @keyframes pulse {
          0%, 100% { transform: scale(1); opacity: 0.1; }
          50% { transform: scale(1.1); opacity: 0.15; }
        }
        @keyframes scaleIn {
          0% { transform: scale(0); }
          50% { transform: scale(1.2); }
          100% { transform: scale(1); }
        }
        @keyframes bounce {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-4px); }
        }
        .animate-shake {
          animation: shake 0.5s ease-in-out;
        }
        @keyframes shake {
          0%, 100% { transform: translateX(0); }
          20% { transform: translateX(-8px); }
          40% { transform: translateX(8px); }
          60% { transform: translateX(-4px); }
          80% { transform: translateX(4px); }
        }
      `}</style>
    </div>
  );
}
