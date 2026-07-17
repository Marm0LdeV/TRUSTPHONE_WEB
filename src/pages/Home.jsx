import { Link } from 'react-router-dom';
import { CheckCircle2, Truck, Shield } from 'lucide-react';
import ProductCard from '../components/ProductCard';
import { useFetch } from '../hooks/useFetch';

export default function Home() {
  const marcas = ['iPhone', 'Samsung', 'Xiaomi', 'Google'];
  const { data, loading, error } = useFetch('/api/celulares');

  const destacados = data ? data.slice(0, 4).map(item => ({
    id: item._id,
    name: item.nombre,
    brand: item.idMarca?.nombre || item.idMarca?.name || 'Celular',
    price: item.precio || 0,
    oldPrice: (item.precio || 0) * 1.25, // simulated old price
    tag: item.condicion || 'Excelente',
    image: item.imagen || 'https://images.unsplash.com/photo-1592899677977-9c134150f666?auto=format&fit=crop&q=80&w=400&h=400'
  })) : [];

  return (
    <div>
      {/* Hero Section */}
      <div className="max-w-7xl mx-auto mt-8 px-6">
        <div className="bg-white rounded-2xl overflow-hidden flex items-center shadow-sm border border-gray-100 p-12">
          <div className="flex-1">
            <span className="bg-blue-100 text-blue-700 text-xs font-bold px-3 py-1 rounded-full mb-4 inline-block">REACONDICIONADOS DE CONFIANZA</span>
            <h1 className="text-4xl md:text-5xl font-black text-gray-900 leading-tight mb-4">
              TU PRÓXIMO CELULAR,<br />
              CON TOTAL <span className="text-blue-600">CONFIANZA.</span>
            </h1>
            <p className="text-gray-600 mb-8 max-w-md text-lg">
              Cada uno de nuestros dispositivos son revisados por nuestros expertos y cubiertos con una garantía de hasta 12 meses.
            </p>
            <div className="flex gap-4">
              <Link to="/catalogo" className="bg-blue-600 text-white px-6 py-3 rounded-full font-medium hover:bg-blue-700 transition">Ver catálogo</Link>
              <Link to="/contacto" className="bg-white text-gray-800 border border-gray-300 px-6 py-3 rounded-full font-medium hover:bg-gray-50 transition">Contáctanos</Link>
            </div>
          </div>
          <div className="flex-1 hidden md:flex justify-end relative min-h-[400px] items-center pr-4 lg:pr-12">
            <img src="" alt="" className="w-48 h-80 lg:h-96 object-cover bg-gray-200 rounded-[2rem] shadow-xl border-4 border-gray-800 absolute transform -rotate-6 right-24 lg:right-40 z-0"/>
            <img src="" alt="" className="w-52 h-[22rem] lg:h-[26rem] object-cover bg-gray-100 rounded-[2rem] shadow-2xl border-4 border-white relative z-10" />
          </div>
        </div>
      </div>

      {/* Marcas */}
      <div className="max-w-7xl mx-auto mt-16 px-6">
        <h2 className="text-xl font-bold text-center mb-8">Compra por marca</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {marcas.map(marca => (
            <Link to="/catalogo" key={marca} className="bg-white py-8 rounded-xl flex flex-col items-center justify-center border border-gray-100 shadow-sm hover:shadow-md transition">
              <div className="w-16 h-16 bg-blue-50 text-blue-600 rounded-full flex items-center justify-center mb-4 font-bold text-2xl">
                {marca.charAt(0)}
              </div>
              <span className="font-medium text-sm text-gray-800">{marca}</span>
            </Link>
          ))}
        </div>
      </div>

      {/* Features */}
      <div className="max-w-7xl mx-auto mt-16 px-6 grid grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm flex items-center gap-4">
          <div className="bg-blue-50 p-3 rounded-full"><CheckCircle2 className="text-primary w-6 h-6" /></div>
          <div>
            <h4 className="font-bold text-sm">Calidad Garantizada</h4>
            <p className="text-xs text-gray-500">Certificación técnica de 30+ puntos.</p>
          </div>
        </div>
        <div className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm flex items-center gap-4">
          <div className="bg-blue-50 p-3 rounded-full"><Truck className="text-primary w-6 h-6" /></div>
          <div>
            <h4 className="font-bold text-sm">Envío Gratis</h4>
            <p className="text-xs text-gray-500">En todos tus pedidos nacionales.</p>
          </div>
        </div>
        <div className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm flex items-center gap-4">
          <div className="bg-blue-50 p-3 rounded-full"><Shield className="text-primary w-6 h-6" /></div>
          <div>
            <h4 className="font-bold text-sm">1 Año de Garantía</h4>
            <p className="text-xs text-gray-500">Cobertura total ante cualquier falla.</p>
          </div>
        </div>
      </div>

      {/* Destacados */}
      <div className="max-w-7xl mx-auto mt-16 px-6 mb-20">
        <div className="flex justify-between items-end mb-8">
          <h2 className="text-2xl font-bold">Equipos destacados</h2>
          <Link to="/catalogo" className="text-primary text-sm font-medium hover:underline">Ver todo &gt;</Link>
        </div>
        {loading ? (
          <div className="flex justify-center items-center h-48 w-full">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
          </div>
        ) : error ? (
          <div className="bg-red-50 text-red-600 p-4 rounded-xl text-center font-medium border border-red-100 w-full">
            {error}
          </div>
        ) : destacados.length === 0 ? (
          <div className="text-center text-gray-500 py-12 w-full">
            No hay equipos destacados en este momento.
          </div>
        ) : (
          <div className="grid grid-cols-4 gap-6">
            {destacados.map(item => (
              <ProductCard key={item.id} product={item} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
