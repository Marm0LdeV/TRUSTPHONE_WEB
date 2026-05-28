import { Link } from 'react-router-dom';
import { CheckCircle2, Truck, Shield } from 'lucide-react';
import ProductCard from '../components/ProductCard';

export default function Home() {
  const marcas = ['iPhone', 'Samsung', 'Xiaomi', 'Google'];
  const destacados = [
    { id: 1, name: 'iPhone 13 Pro Max', price: 649.00, oldPrice: 1099.00, tag: 'Reacondicionado', image: 'https://images.unsplash.com/photo-1592899677977-9c134150f666?auto=format&fit=crop&q=80&w=400&h=400' },
    { id: 2, name: 'Samsung Galaxy S22 Ultra', price: 589.00, oldPrice: 899.00, tag: 'Excelente estado', image: 'https://images.unsplash.com/photo-1610945265064-0e34e5519bbf?auto=format&fit=crop&q=80&w=400&h=400' },
    { id: 3, name: 'iPhone 11 128GB', price: 299.00, oldPrice: 450.00, tag: 'Reacondicionado', image: 'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?auto=format&fit=crop&q=80&w=400&h=400' },
    { id: 4, name: 'Xiaomi Redmi Note 11', price: 189.00, oldPrice: 250.00, tag: 'Oferta', image: 'https://images.unsplash.com/photo-1598327105666-5b89351cb315?auto=format&fit=crop&q=80&w=400&h=400' },
  ];

  return (
    <div>
      {/* Hero Section */}
      <div className="max-w-7xl mx-auto mt-8 px-6">
        <div className="bg-white rounded-2xl overflow-hidden flex items-center shadow-sm border border-gray-100 p-12">
          <div className="flex-1">
            <span className="bg-blue-100 text-primary text-xs font-bold px-3 py-1 rounded-full mb-4 inline-block">REACONDICIONADOS DE CONFIANZA</span>
            <h1 className="text-4xl font-black text-gray-900 leading-tight mb-4">
              TU PROXIMO CELULAR,<br />
              TU CONFIANZA NOS <span className="text-primary">IMPORTA.</span>
            </h1>
            <p className="text-gray-600 mb-8 max-w-md">
              Cada uno de nuestros dispositivos son revisados por nuestros expertos y cubiertos con una garantía de hasta 12 meses.
            </p>
            <div className="flex gap-4">
              <Link to="/catalogo" className="bg-secondary text-white px-6 py-3 rounded-full font-medium hover:bg-blue-900 transition">Ver catálogo</Link>
              <Link to="/contacto" className="bg-white text-gray-800 border border-gray-300 px-6 py-3 rounded-full font-medium hover:bg-gray-50 transition">Contáctanos</Link>
            </div>
          </div>
          <div className="flex-1 flex justify-center relative">
            {/* Placeholders visuales para los teléfonos del hero */}
            <div className="w-48 h-96 bg-gray-200 rounded-3xl shadow-xl border-4 border-gray-800 absolute transform -rotate-6 -left-10"></div>
            <div className="w-52 h-[26rem] bg-gray-100 rounded-3xl shadow-2xl border-4 border-white relative z-10"></div>
          </div>
        </div>
      </div>

      {/* Marcas */}
      <div className="max-w-7xl mx-auto mt-16 px-6">
        <h2 className="text-xl font-bold text-center mb-8">Compra por marca</h2>
        <div className="grid grid-cols-4 gap-6">
          {marcas.map(marca => (
            <Link to="/catalogo" key={marca} className="bg-white py-8 rounded-xl flex flex-col items-center justify-center border border-gray-100 shadow-sm hover:shadow-md transition">
              <div className="w-12 h-16 bg-gray-100 rounded mb-4"></div>
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
        <div className="grid grid-cols-4 gap-6">
          {destacados.map(item => (
            <ProductCard key={item.id} product={item} />
          ))}
        </div>
      </div>
    </div>
  );
}
