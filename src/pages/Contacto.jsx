import { useState } from 'react';
import { MapPin, Phone, Mail, Clock, Search } from 'lucide-react';
import Swal from 'sweetalert2';
import { MapContainer, TileLayer, Marker, useMap } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';

// Fix for default marker icon in leaflet
import icon from 'leaflet/dist/images/marker-icon.png';
import iconShadow from 'leaflet/dist/images/marker-shadow.png';

let DefaultIcon = L.icon({
    iconUrl: icon,
    shadowUrl: iconShadow,
    iconAnchor: [12, 41]
});
L.Marker.prototype.options.icon = DefaultIcon;

function MapUpdater({ center }) {
  const map = useMap();
  map.setView(center, map.getZoom());
  return null;
}

export default function Contacto() {
  const [formData, setFormData] = useState({
    nombre: '',
    email: '',
    telefono: '',
    asunto: '',
    mensaje: ''
  });
  const [loading, setLoading] = useState(false);
  
  const [searchQuery, setSearchQuery] = useState('');
  const [mapCenter, setMapCenter] = useState([13.7161, -89.1947]); // Default: Instituto Técnico Ricaldone, El Salvador

  const handleChange = (e) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.nombre || !formData.email || !formData.mensaje) {
      Swal.fire({
        title: 'Campos incompletos',
        text: 'Por favor completa los campos obligatorios (nombre, email y mensaje).',
        icon: 'warning',
        confirmButtonColor: '#2563eb'
      });
      return;
    }
    setLoading(true);
    try {
      await new Promise(resolve => setTimeout(resolve, 1000));
      Swal.fire({
        title: '¡Mensaje enviado con éxito!',
        text: 'Nuestro equipo se pondrá en contacto contigo en las próximas 24 horas.',
        icon: 'success',
        confirmButtonColor: '#2563eb'
      });
      setFormData({ nombre: '', email: '', telefono: '', asunto: '', mensaje: '' });
    } catch {
      Swal.fire({
        title: 'Error',
        text: 'Hubo un error al enviar tu mensaje. Por favor intenta de nuevo.',
        icon: 'error',
        confirmButtonColor: '#2563eb'
      });
    } finally {
      setLoading(false);
    }
  };

  const handleSearchMap = async () => {
    if (!searchQuery) return;
    try {
      const res = await fetch(`https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(searchQuery)}`);
      const data = await res.json();
      if (data && data.length > 0) {
        setMapCenter([parseFloat(data[0].lat), parseFloat(data[0].lon)]);
      } else {
        Swal.fire({
          title: 'Ubicación no encontrada',
          text: 'No pudimos encontrar la dirección ingresada.',
          icon: 'error',
          confirmButtonColor: '#2563eb'
        });
      }
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="pb-12">
      <div className="bg-secondary text-white py-20 px-6 text-center">
        <h1 className="text-4xl font-bold mb-4">Contáctanos</h1>
        <p className="max-w-xl mx-auto text-blue-100">
          Estamos aquí para ayudarte. Si tienes preguntas sobre nuestros productos o necesitas asistencia técnica, nuestro equipo de expertos está listo para atenderte.
        </p>
      </div>

      <div className="max-w-5xl mx-auto px-6 -mt-10 flex gap-8">
        <div className="flex-1 bg-white p-8 rounded-2xl shadow-lg border border-gray-100">
          <h2 className="text-2xl font-bold mb-6">Envíanos un mensaje</h2>

          <form className="space-y-4" onSubmit={handleSubmit}>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-gray-500 mb-1">NOMBRE *</label>
                <input
                  type="text"
                  name="nombre"
                  value={formData.nombre}
                  onChange={handleChange}
                  placeholder="Tu nombre completo"
                  className="w-full border rounded-lg px-4 py-2 outline-none focus:border-primary text-sm"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-gray-500 mb-1">EMAIL *</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="correo@ejemplo.com"
                  className="w-full border rounded-lg px-4 py-2 outline-none focus:border-primary text-sm"
                />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-gray-500 mb-1">TELÉFONO</label>
                <input
                  type="tel"
                  name="telefono"
                  value={formData.telefono}
                  onChange={handleChange}
                  placeholder="+503 7000 0000"
                  className="w-full border rounded-lg px-4 py-2 outline-none focus:border-primary text-sm"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-gray-500 mb-1">ASUNTO</label>
                <input
                  type="text"
                  name="asunto"
                  value={formData.asunto}
                  onChange={handleChange}
                  placeholder="Ej. Duda sobre mi envío"
                  className="w-full border rounded-lg px-4 py-2 outline-none focus:border-primary text-sm"
                />
              </div>
            </div>
            <div>
              <label className="block text-xs font-semibold text-gray-500 mb-1">MENSAJE *</label>
              <textarea
                name="mensaje"
                value={formData.mensaje}
                onChange={handleChange}
                rows="4"
                placeholder="¿En qué podemos ayudarte?"
                className="w-full border rounded-lg px-4 py-2 outline-none focus:border-primary resize-none text-sm"
              ></textarea>
            </div>
            <button
              type="submit"
              disabled={loading}
              className="bg-secondary text-white px-8 py-3 rounded-lg font-medium hover:bg-blue-900 transition disabled:opacity-60 disabled:cursor-not-allowed"
            >
              {loading ? 'Enviando...' : 'Enviar Mensaje'}
            </button>
          </form>
        </div>

        <div className="w-80 space-y-6">
          <div className="bg-white p-6 rounded-2xl shadow-lg border border-gray-100">
            <h3 className="font-bold text-lg mb-6">Información de Contacto</h3>
            <div className="space-y-6">
              <div className="flex gap-4">
                <div className="bg-blue-50 p-2 rounded-lg h-fit"><MapPin className="text-primary w-5 h-5" /></div>
                <div>
                  <h4 className="font-bold text-sm">Dirección</h4>
                  <p className="text-xs text-gray-500">Instituto Técnico Ricaldone,<br/>San Salvador, El Salvador</p>
                </div>
              </div>
              <div className="flex gap-4">
                <div className="bg-blue-50 p-2 rounded-lg h-fit"><Phone className="text-primary w-5 h-5" /></div>
                <div>
                  <h4 className="font-bold text-sm">Atención al Cliente</h4>
                  <p className="text-xs text-gray-500">+503 2200 0000</p>
                </div>
              </div>
              <div className="flex gap-4">
                <div className="bg-blue-50 p-2 rounded-lg h-fit"><Mail className="text-primary w-5 h-5" /></div>
                <div>
                  <h4 className="font-bold text-sm">Email de Soporte</h4>
                  <p className="text-xs text-gray-500">soporte@trustphone.com</p>
                </div>
              </div>
              <div className="flex gap-4">
                <div className="bg-blue-50 p-2 rounded-lg h-fit"><Clock className="text-primary w-5 h-5" /></div>
                <div>
                  <h4 className="font-bold text-sm">Horario comercial</h4>
                  <p className="text-xs text-gray-500">Lunes - Viernes: 09:00 - 19:00<br/>Sábados: 10:00 - 14:00</p>
                </div>
              </div>
            </div>
          </div>

          <div className="h-64 rounded-2xl shadow-lg relative overflow-hidden bg-gray-100 flex flex-col border border-gray-200">
            <div className="flex p-2 bg-white gap-2 z-10 relative shadow-sm">
              <input 
                type="text" 
                placeholder="Buscar dirección..." 
                className="flex-1 border rounded px-2 py-1 text-sm outline-none focus:border-blue-500"
                value={searchQuery}
                onChange={e => setSearchQuery(e.target.value)}
                onKeyDown={e => e.key === 'Enter' && handleSearchMap()}
              />
              <button onClick={handleSearchMap} className="bg-blue-600 text-white p-1.5 rounded hover:bg-blue-700 transition">
                <Search className="w-4 h-4" />
              </button>
            </div>
            <div className="flex-1 w-full relative z-0">
              <MapContainer center={mapCenter} zoom={13} style={{ height: '100%', width: '100%' }}>
                <TileLayer
                  attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                  url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />
                <Marker position={mapCenter} />
                <MapUpdater center={mapCenter} />
              </MapContainer>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

