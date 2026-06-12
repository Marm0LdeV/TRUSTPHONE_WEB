import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { User, Settings, Package, Heart, LogOut } from 'lucide-react';

export default function Perfil() {
  const navigate = useNavigate();
  const [client, setClient] = useState(null);
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  
  const [error, setError] = useState('');
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const savedUser = localStorage.getItem('user');
    if (!savedUser) {
      navigate('/login');
      return;
    }
    const parsed = JSON.parse(savedUser);
    setClient(parsed);
    setFirstName(parsed.nombre || '');
    setLastName(parsed.Apellido || '');
    setEmail(parsed.correo || '');
    setPhone(parsed.telefono || '');
  }, [navigate]);

  const handleUpdate = async (e) => {
    e.preventDefault();
    setError('');
    setMessage('');
    setLoading(true);

    try {
      const res = await fetch(`/api/clientes/${client._id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          nombre: firstName,
          Apellido: lastName,
          correo: email,
          telefono: phone
        })
      });
      if (res.ok) {
        setMessage('¡Perfil actualizado con éxito!');
        const updated = { ...client, nombre: firstName, Apellido: lastName, correo: email, telefono: phone };
        localStorage.setItem('user', JSON.stringify(updated));
        setClient(updated);
      } else {
        const data = await res.json();
        setError(data.message || 'Error al actualizar el perfil');
      }
    } catch (err) {
      console.error(err);
      setError('Error al conectar con el servidor');
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = async () => {
    try {
      await fetch('/api/logout', { method: 'POST' });
    } catch (err) {
      console.error(err);
    }
    localStorage.removeItem('user');
    localStorage.removeItem('cart');
    navigate('/login', { replace: true });
  };

  if (!client) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <p className="text-gray-500 font-semibold">Cargando perfil...</p>
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto px-6 py-12 flex gap-8">
      {/* Sidebar Menú Perfil */}
      <div className="w-64">
        <div className="bg-white rounded-2xl border border-gray-200 p-6">
          <div className="flex flex-col items-center mb-6 border-b pb-6 text-center">
            <div className="w-20 h-20 bg-blue-100 rounded-full flex items-center justify-center mb-3">
              <User className="w-10 h-10 text-primary" />
            </div>
            <h3 className="font-bold text-lg">{firstName} {lastName}</h3>
            <p className="text-xs text-gray-500 truncate w-full">{email}</p>
          </div>
          <nav className="space-y-2">
            <a href="#" className="flex items-center gap-3 text-sm font-medium text-primary bg-blue-50 p-3 rounded-lg"><User className="w-4 h-4" /> Mi Cuenta</a>
            <a href="#" className="flex items-center gap-3 text-sm font-medium text-gray-600 hover:bg-gray-50 p-3 rounded-lg"><Package className="w-4 h-4" /> Mis Pedidos</a>
            <a href="#" className="flex items-center gap-3 text-sm font-medium text-gray-600 hover:bg-gray-50 p-3 rounded-lg"><Heart className="w-4 h-4" /> Favoritos</a>
            <button 
              onClick={handleLogout}
              className="w-full flex items-center gap-3 text-sm font-medium text-red-600 hover:bg-red-50 p-3 rounded-lg cursor-pointer border-0 text-left bg-transparent"
            >
              <LogOut className="w-4 h-4" /> Cerrar Sesión
            </button>
          </nav>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1">
        <h1 className="text-2xl font-bold mb-6">Datos Personales</h1>
        
        {error && (
          <div className="bg-red-50 text-red-600 text-sm font-semibold p-4 rounded-xl mb-4 border border-red-100">
            {error}
          </div>
        )}

        {message && (
          <div className="bg-green-50 text-green-700 text-sm font-semibold p-4 rounded-xl mb-4 border border-green-100">
            {message}
          </div>
        )}

        <div className="bg-white rounded-2xl border border-gray-200 p-8">
          <form className="space-y-6" onSubmit={handleUpdate}>
            <div className="grid grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Nombre</label>
                <input 
                  type="text" 
                  required
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                  className="w-full border rounded-lg px-4 py-2 outline-none focus:border-primary" 
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Apellidos</label>
                <input 
                  type="text" 
                  required
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                  className="w-full border rounded-lg px-4 py-2 outline-none focus:border-primary" 
                />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Correo Electrónico</label>
              <input 
                type="email" 
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full border rounded-lg px-4 py-2 outline-none focus:border-primary" 
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Teléfono</label>
              <input 
                type="tel" 
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder="+34 600 000 000" 
                className="w-full border rounded-lg px-4 py-2 outline-none focus:border-primary" 
              />
            </div>
            <button 
              type="submit" 
              disabled={loading}
              className="bg-primary text-white px-6 py-2 rounded-lg font-medium hover:bg-blue-700 cursor-pointer disabled:bg-blue-300"
            >
              {loading ? 'Guardando...' : 'Guardar Cambios'}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
