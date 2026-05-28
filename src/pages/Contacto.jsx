import { MapPin, Phone, Mail, Clock } from 'lucide-react';

export default function Contacto() {
  return (
    <div className="pb-12">
      {/* Header Banner */}
      <div className="bg-secondary text-white py-20 px-6 text-center">
        <h1 className="text-4xl font-bold mb-4">Contáctanos</h1>
        <p className="max-w-xl mx-auto text-blue-100">
          Estamos aquí para ayudarte. Si tienes preguntas sobre nuestros productos o necesitas asistencia técnica, nuestro equipo de expertos está listo para atenderte.
        </p>
      </div>

      <div className="max-w-5xl mx-auto px-6 -mt-10 flex gap-8">
        {/* Formulario */}
        <div className="flex-1 bg-white p-8 rounded-2xl shadow-lg border border-gray-100">
          <h2 className="text-2xl font-bold mb-6">Envíanos un mensaje</h2>
          <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-gray-500 mb-1">NOMBRE</label>
                <input type="text" placeholder="Tu nombre completo" className="w-full border rounded-lg px-4 py-2 outline-none focus:border-primary" />
              </div>
              <div>
                <label className="block text-xs font-semibold text-gray-500 mb-1">EMAIL</label>
                <input type="email" placeholder="correo@ejemplo.com" className="w-full border rounded-lg px-4 py-2 outline-none focus:border-primary" />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-gray-500 mb-1">TELÉFONO</label>
                <input type="tel" placeholder="+34 000 000 000" className="w-full border rounded-lg px-4 py-2 outline-none focus:border-primary" />
              </div>
              <div>
                <label className="block text-xs font-semibold text-gray-500 mb-1">ASUNTO</label>
                <select className="w-full border rounded-lg px-4 py-2 outline-none focus:border-primary bg-white">
                  <option>Soporte Técnico</option>
                  <option>Ventas</option>
                  <option>Garantías</option>
                </select>
              </div>
            </div>
            <div>
              <label className="block text-xs font-semibold text-gray-500 mb-1">MENSAJE</label>
              <textarea rows="4" placeholder="¿En qué podemos ayudarte?" className="w-full border rounded-lg px-4 py-2 outline-none focus:border-primary resize-none"></textarea>
            </div>
            <button type="button" className="bg-secondary text-white px-8 py-3 rounded-lg font-medium hover:bg-blue-900 transition">
              Enviar Mensaje
            </button>
          </form>
        </div>

        {/* Info y Mapa */}
        <div className="w-80 space-y-6">
          <div className="bg-white p-6 rounded-2xl shadow-lg border border-gray-100">
            <h3 className="font-bold text-lg mb-6">Información de Contacto</h3>
            <div className="space-y-6">
              <div className="flex gap-4">
                <div className="bg-blue-50 p-2 rounded-lg h-fit"><MapPin className="text-primary w-5 h-5" /></div>
                <div>
                  <h4 className="font-bold text-sm">Dirección</h4>
                  <p className="text-xs text-gray-500">Paseo de la Castellana 200,<br/>28046 Madrid, España</p>
                </div>
              </div>
              <div className="flex gap-4">
                <div className="bg-blue-50 p-2 rounded-lg h-fit"><Phone className="text-primary w-5 h-5" /></div>
                <div>
                  <h4 className="font-bold text-sm">Atención al Cliente</h4>
                  <p className="text-xs text-gray-500">+34 900 123 456</p>
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
          
          <div className="bg-gray-700 h-48 rounded-2xl flex items-center justify-center flex-col text-white shadow-lg relative overflow-hidden">
             <MapPin className="w-8 h-8 mb-2 z-10" />
             <button className="bg-white text-gray-800 text-xs font-bold px-4 py-2 rounded-full z-10">VER UBICACIÓN EXACTA</button>
             {/* Simulación de textura de mapa */}
             <div className="absolute inset-0 opacity-20 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')]"></div>
          </div>
        </div>
      </div>
    </div>
  );
}
