import React, { useState, useEffect, useCallback, createContext, useContext } from 'react';

const API_BASE = import.meta.env.VITE_API_URL || '';

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    const stored = localStorage.getItem('user');
    if (stored) {
      try {
        setUser(JSON.parse(stored));
      } catch {
        localStorage.removeItem('user');
      }
    }
  }, []);

  const login = useCallback(async (email, password) => {
    setError('');
    setLoading(true);
    try {
      const res = await fetch(`${API_BASE}/api/loginClientes`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify({ correo: email, contrasena: password }),
      });
      const data = await res.json();

      if (res.ok) {
        const userData = data.user || { correo: email, nombre: 'Cliente' };
        localStorage.setItem('user', JSON.stringify(userData));
        setUser(userData);
        return { ok: true, user: userData };
      }
      if (data.needsVerification) {
        return { ok: false, needsVerification: true, email };
      }
      setError(data.message || 'Credenciales inválidas');
      return { ok: false, error: data.message || 'Credenciales inválidas' };
    } catch (err) {
      console.error('Login error:', err);
      const msg = 'Error al conectar con el servidor';
      setError(msg);
      return { ok: false, error: msg };
    } finally {
      setLoading(false);
    }
  }, []);

  const logout = useCallback(async () => {
    try {
      await fetch(`${API_BASE}/api/logout`, { method: 'POST', credentials: 'include' });
    } catch (err) {
      console.error('Logout error:', err);
    }
    localStorage.removeItem('user');
    localStorage.removeItem('cart');
    setUser(null);
  }, []);

  const register = useCallback(async (userData) => {
    setError('');
    setLoading(true);
    try {
      const res = await fetch(`${API_BASE}/api/registroClientes`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify(userData),
      });
      const data = await res.json();
      if (res.ok) {
        return { ok: true, data };
      }
      setError(data.message || 'Error en el registro');
      return { ok: false, error: data.message || 'Error en el registro' };
    } catch (err) {
      console.error('Register error:', err);
      const msg = 'Error al conectar con el servidor';
      setError(msg);
      return { ok: false, error: msg };
    } finally {
      setLoading(false);
    }
  }, []);

  const verifyCode = useCallback(async (email, code) => {
    setError('');
    setLoading(true);
    try {
      const res = await fetch(`${API_BASE}/api/registroClientes/verifyCodeEmail`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify({ correo: email, verificationCodeRequest: code })
      });
      const data = await res.json();
      if (res.ok) {
        return { ok: true, data };
      }
      setError(data.message || 'Código incorrecto o expirado');
      return { ok: false, error: data.message || 'Código incorrecto o expirado' };
    } catch (err) {
      console.error('Verification error:', err);
      const msg = 'Error al conectar con el servidor';
      setError(msg);
      return { ok: false, error: msg };
    } finally {
      setLoading(false);
    }
  }, []);

  const clearError = useCallback(() => setError(''), []);

  return (
    <AuthContext.Provider value={{ user, loading, error, login, logout, register, verifyCode, clearError, setError, setUser }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
