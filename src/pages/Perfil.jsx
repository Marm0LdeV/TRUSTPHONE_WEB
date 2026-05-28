import { User, Settings, Package, Heart } from 'lucide-react';

export default function Perfil() {
  return (
    <div className="max-w-5xl mx-auto px-6 py-12 flex gap-8">
      {/* Sidebar Menú Perfil */}
      <div className="w-64">
        <div className="bg-white rounded-2xl border border-gray-200 p-6">
          <div className="flex flex-col items-center mb-6 border-b pb-6">
            <div className="w-20 h-20 bg-blue-100 rounded-full flex items-center justify-center mb-3">
              <User className="w-10 h-10 text-primary" />
            </div>
            <h3 className="font-bold text-lg">Usuario Demo</h3>
            <p className="text-xs text-gray-500">usuario@ejemplo.com</p>
          </div>
          <nav className="space-y-2">
            <a href="#" className="flex items-center gap-3 text-sm font-medium text-primary bg-blue-50 p-3 rounded-lg"><User className="w-4 h-4" /> Mi Cuenta</a>
            <a href="#" className="flex items-center gap-3 text-sm font-medium text-gray-600 hover:bg-gray-50 p-3 rounded-lg"><Package className="w-4 h-4" /> Mis Pedidos</a>
            <a href="#" className="flex items-center gap-3 text-sm font-medium text-gray-600 hover:bg-gray-50 p-3 rounded-lg"><Heart className="w-4 h-4" /> Favoritos</a>
            <a href="#" className="flex items-center gap-3 text-sm font-medium text-gray-600 hover:bg-gray-50 p-3 rounded-lg"><Settings className="w-4 h-4" /> Configuración</a>
          </nav>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1">
        <h1 className="text-2xl font-bold mb-6">Datos Personales</h1>
        <div className="bg-white rounded-2xl border border-gray-200 p-8">
          <form className="space-y-6" onSubmit={(e) => e.preventDefault()}>
            <div className="grid grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Nombre</label>
                <input type="text" defaultValue="Usuario" className="w-full border rounded-lg px-4 py-2 outline-none focus:border-primary" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Apellidos</label>
                <input type="text" defaultValue="Demo" className="w-full border rounded-lg px-4 py-2 outline-none focus:border-primary" />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Correo Electrónico</label>
              <input type="email" defaultValue="usuario@ejemplo.com" className="w-full border rounded-lg px-4 py-2 outline-none focus:border-primary" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Teléfono</label>
              <input type="tel" placeholder="+34 000 000 000" className="w-full border rounded-lg px-4 py-2 outline-none focus:border-primary" />
            </div>
            <button className="bg-primary text-white px-6 py-2 rounded-lg font-medium hover:bg-blue-700">
              Guardar Cambios
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
