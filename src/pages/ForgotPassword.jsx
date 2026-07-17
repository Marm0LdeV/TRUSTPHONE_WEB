import { useState, useRef, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ShieldCheck, Mail, ArrowLeft, CheckCircle, AlertCircle, Clock, Loader2, KeyRound, Lock, Eye, EyeOff } from 'lucide-react';
import { useAuth } from '../hooks/useAuth';

export default function ForgotPassword() {
  const navigate = useNavigate();
  const { requestPasswordReset, verifyPasswordResetCode, resetPassword } = useAuth();

  const [step, setStep] = useState(1); // 1: Email, 2: Code, 3: New Password
  
  // Step 1: Email
  const [email, setEmail] = useState('');
  
  // Step 2: Code
  const [code, setCode] = useState(['', '', '', '', '', '']);
  const [timeLeft, setTimeLeft] = useState(15 * 60);
  const [isExpired, setIsExpired] = useState(false);
  const inputRefs = useRef([]);

  // Step 3: New Password
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  // Global state
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [shakeError, setShakeError] = useState(false);
  const [successAnim, setSuccessAnim] = useState(false);

  // Countdown timer for Step 2
  useEffect(() => {
    let timer;
    if (step === 2) {
      if (timeLeft <= 0) {
        setIsExpired(true);
        return;
      }
      timer = setInterval(() => {
        setTimeLeft(prev => {
          if (prev <= 1) {
            setIsExpired(true);
            clearInterval(timer);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }
    return () => {
      if (timer) clearInterval(timer);
    };
  }, [step, timeLeft]);

  const formatTime = (seconds) => {
    const m = Math.floor(seconds / 60).toString().padStart(2, '0');
    const s = (seconds % 60).toString().padStart(2, '0');
    return `${m}:${s}`;
  };

  const timerPercentage = (timeLeft / (15 * 60)) * 100;

  const triggerError = (msg) => {
    setError(msg);
    setShakeError(true);
    setTimeout(() => setShakeError(false), 600);
  };

  // Handlers
  const handleRequestCode = async (e) => {
    e.preventDefault();
    if (!email) {
      triggerError('Por favor ingresa tu correo electrónico');
      return;
    }
    setError('');
    setLoading(true);
    const result = await requestPasswordReset(email);
    setLoading(false);
    
    if (result.ok) {
      setSuccess('Código enviado exitosamente');
      setTimeout(() => {
        setSuccess('');
        setStep(2);
        setTimeLeft(15 * 60); // Reset timer
        setIsExpired(false);
      }, 1500);
    } else {
      triggerError(result.error);
    }
  };

  const handleVerifyCode = async (e) => {
    e.preventDefault();
    const fullCode = code.join('');

    if (fullCode.length < 6) {
      triggerError('Ingresa el código completo de 6 caracteres');
      return;
    }

    if (isExpired) {
      triggerError('El código ha expirado. Solicita uno nuevo.');
      return;
    }

    setError('');
    setLoading(true);
    const result = await verifyPasswordResetCode(email, fullCode);
    setLoading(false);

    if (result.ok) {
      setSuccess('Código verificado correctamente');
      setTimeout(() => {
        setSuccess('');
        setStep(3);
      }, 1500);
    } else {
      triggerError(result.error);
      setCode(['', '', '', '', '', '']);
      inputRefs.current[0]?.focus();
    }
  };

  const handleResetPassword = async (e) => {
    e.preventDefault();
    if (newPassword.length < 6) {
      triggerError('La contraseña debe tener al menos 6 caracteres');
      return;
    }
    if (newPassword !== confirmPassword) {
      triggerError('Las contraseñas no coinciden');
      return;
    }

    setError('');
    setLoading(true);
    const fullCode = code.join('');
    const result = await resetPassword(email, fullCode, newPassword);
    setLoading(false);

    if (result.ok) {
      setSuccess('¡Contraseña actualizada exitosamente!');
      setSuccessAnim(true);
      setTimeout(() => {
        navigate('/login');
      }, 2500);
    } else {
      triggerError(result.error);
    }
  };

  // Code input handlers
  const handleCodeChange = (index, value) => {
    const hexChar = value.replace(/[^a-fA-F0-9]/g, '').slice(-1);
    const newCode = [...code];
    newCode[index] = hexChar;
    setCode(newCode);
    setError('');
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
    const nextEmpty = newCode.findIndex(c => !c);
    inputRefs.current[nextEmpty === -1 ? 5 : nextEmpty]?.focus();
  };

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

          {/* Icon animation */}
          <div className="flex justify-center mb-6">
            <div className="relative">
              <div className="w-20 h-20 rounded-2xl flex items-center justify-center" style={{
                background: 'linear-gradient(135deg, rgba(59, 130, 246, 0.2), rgba(139, 92, 246, 0.2))',
                border: '1px solid rgba(59, 130, 246, 0.3)',
                animation: 'float 3s ease-in-out infinite'
              }}>
                {successAnim ? (
                  <CheckCircle className="w-10 h-10 text-green-400" style={{ animation: 'scaleIn 0.5s ease-out' }} />
                ) : step === 1 ? (
                  <KeyRound className="w-10 h-10" style={{ color: '#60a5fa' }} />
                ) : step === 2 ? (
                  <Mail className="w-10 h-10" style={{ color: '#60a5fa' }} />
                ) : (
                  <Lock className="w-10 h-10" style={{ color: '#60a5fa' }} />
                )}
              </div>
            </div>
          </div>

          {/* Title */}
          <div className="text-center mb-6">
            <h2 className="text-2xl font-bold text-white mb-2">
              {successAnim ? '¡Contraseña actualizada!' : 
               step === 1 ? 'Recuperar contraseña' : 
               step === 2 ? 'Verifica el código' : 
               'Nueva contraseña'}
            </h2>
            <p className="text-sm" style={{ color: 'rgba(255, 255, 255, 0.6)' }}>
              {successAnim ? 'Redirigiendo al inicio de sesión...' : 
               step === 1 ? 'Ingresa el correo asociado a tu cuenta para enviarte un código de recuperación.' : 
               step === 2 ? <>Enviamos un código de recuperación a <span className="font-semibold text-blue-400">{email}</span></> : 
               'Crea una nueva contraseña segura para tu cuenta.'}
            </p>
          </div>

          {/* Timer for Step 2 */}
          {step === 2 && !successAnim && (
            <div className="mb-6">
              <div className="flex items-center justify-center gap-2 mb-2">
                <Clock className="w-4 h-4" style={{ color: isExpired ? '#f87171' : 'rgba(255, 255, 255, 0.5)' }} />
                <span className="text-sm font-mono font-semibold" style={{
                  color: isExpired ? '#f87171' : timeLeft < 120 ? '#fbbf24' : 'rgba(255, 255, 255, 0.7)'
                }}>
                  {isExpired ? 'Código expirado' : formatTime(timeLeft)}
                </span>
              </div>
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

          {/* Messages */}
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

          {/* Forms */}
          {!successAnim && (
            <div>
              {/* STEP 1: Email Form */}
              {step === 1 && (
                <form onSubmit={handleRequestCode} className="space-y-4">
                  <div className="relative group">
                    <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none">
                      <Mail className="w-5 h-5 text-gray-400 group-focus-within:text-blue-400 transition-colors" />
                    </div>
                    <input
                      type="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="ejemplo@correo.com"
                      className="w-full border-2 border-gray-600/50 rounded-xl pl-11 pr-4 py-3 text-sm outline-none transition-all duration-200 focus:border-blue-500 focus:bg-white/5 bg-white/5 text-white placeholder-gray-500"
                    />
                  </div>
                  <button
                    type="submit"
                    disabled={loading || !email}
                    className="w-full py-3.5 rounded-xl font-semibold text-sm text-white transition-all duration-300 flex items-center justify-center gap-2 disabled:opacity-50"
                    style={{
                      background: loading || !email ? 'rgba(255, 255, 255, 0.1)' : 'linear-gradient(135deg, #3b82f6, #8b5cf6)',
                      boxShadow: loading || !email ? 'none' : '0 10px 30px -5px rgba(59, 130, 246, 0.4)'
                    }}
                  >
                    {loading ? <><Loader2 className="w-4 h-4 animate-spin" /> Enviando...</> : 'Enviar código →'}
                  </button>
                </form>
              )}

              {/* STEP 2: Code Form */}
              {step === 2 && (
                <form onSubmit={handleVerifyCode} className="space-y-6">
                  <div className="flex justify-center gap-2 sm:gap-3 mb-2">
                    {code.map((digit, index) => (
                      <input
                        key={index}
                        ref={(el) => (inputRefs.current[index] = el)}
                        type="text"
                        maxLength={1}
                        value={digit}
                        onChange={(e) => handleCodeChange(index, e.target.value)}
                        onKeyDown={(e) => handleKeyDown(index, e)}
                        onPaste={index === 0 ? handlePaste : undefined}
                        disabled={loading || isExpired}
                        className={`w-12 h-14 sm:w-14 sm:h-16 text-center text-xl sm:text-2xl font-bold uppercase rounded-xl outline-none transition-all duration-200 ${shakeError ? 'animate-shake' : ''}`}
                        style={{
                          background: digit ? 'rgba(59, 130, 246, 0.15)' : 'rgba(255, 255, 255, 0.05)',
                          border: digit ? '2px solid rgba(59, 130, 246, 0.5)' : '2px solid rgba(255, 255, 255, 0.1)',
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
                  <button
                    type="submit"
                    disabled={loading || isExpired || code.join('').length < 6}
                    className="w-full py-3.5 rounded-xl font-semibold text-sm text-white transition-all duration-300 flex items-center justify-center gap-2 disabled:opacity-50"
                    style={{
                      background: loading || isExpired || code.join('').length < 6 ? 'rgba(255, 255, 255, 0.1)' : 'linear-gradient(135deg, #3b82f6, #8b5cf6)',
                      boxShadow: loading || isExpired || code.join('').length < 6 ? 'none' : '0 10px 30px -5px rgba(59, 130, 246, 0.4)'
                    }}
                  >
                    {loading ? <><Loader2 className="w-4 h-4 animate-spin" /> Verificando...</> : 'Verificar código →'}
                  </button>
                </form>
              )}

              {/* STEP 3: Reset Password Form */}
              {step === 3 && (
                <form onSubmit={handleResetPassword} className="space-y-4">
                  <div className="relative group">
                    <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none">
                      <Lock className="w-5 h-5 text-gray-400 group-focus-within:text-blue-400 transition-colors" />
                    </div>
                    <input
                      type={showPassword ? "text" : "password"}
                      required
                      value={newPassword}
                      onChange={(e) => setNewPassword(e.target.value)}
                      placeholder="Nueva contraseña"
                      className="w-full border-2 border-gray-600/50 rounded-xl pl-11 pr-12 py-3 text-sm outline-none transition-all duration-200 focus:border-blue-500 focus:bg-white/5 bg-white/5 text-white placeholder-gray-500"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-300 transition-colors"
                    >
                      {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                    </button>
                  </div>
                  <div className="relative group">
                    <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none">
                      <Lock className="w-5 h-5 text-gray-400 group-focus-within:text-blue-400 transition-colors" />
                    </div>
                    <input
                      type={showConfirmPassword ? "text" : "password"}
                      required
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      placeholder="Confirmar contraseña"
                      className="w-full border-2 border-gray-600/50 rounded-xl pl-11 pr-12 py-3 text-sm outline-none transition-all duration-200 focus:border-blue-500 focus:bg-white/5 bg-white/5 text-white placeholder-gray-500"
                    />
                    <button
                      type="button"
                      onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                      className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-300 transition-colors"
                    >
                      {showConfirmPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                    </button>
                  </div>
                  <button
                    type="submit"
                    disabled={loading || !newPassword || !confirmPassword}
                    className="w-full py-3.5 rounded-xl font-semibold text-sm text-white transition-all duration-300 flex items-center justify-center gap-2 mt-4 disabled:opacity-50"
                    style={{
                      background: loading || !newPassword ? 'rgba(255, 255, 255, 0.1)' : 'linear-gradient(135deg, #3b82f6, #8b5cf6)',
                      boxShadow: loading || !newPassword ? 'none' : '0 10px 30px -5px rgba(59, 130, 246, 0.4)'
                    }}
                  >
                    {loading ? <><Loader2 className="w-4 h-4 animate-spin" /> Guardando...</> : 'Actualizar contraseña →'}
                  </button>
                </form>
              )}
            </div>
          )}

          {/* Footer links */}
          {!successAnim && (
            <div className="mt-6 space-y-3 text-center">
              {isExpired && step === 2 && (
                <button
                  onClick={() => {
                    setStep(1);
                    setCode(['', '', '', '', '', '']);
                    setIsExpired(false);
                    setError('');
                  }}
                  className="block w-full py-3 rounded-xl font-semibold text-sm transition-all duration-300 text-center"
                  style={{
                    background: 'rgba(255, 255, 255, 0.05)',
                    border: '1px solid rgba(255, 255, 255, 0.1)',
                    color: 'rgba(255, 255, 255, 0.7)'
                  }}
                >
                  Volver a solicitar código
                </button>
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
