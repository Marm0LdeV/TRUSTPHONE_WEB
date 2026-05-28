import { Link } from 'react-router-dom';
import { Trash2, ShieldCheck, Truck } from 'lucide-react';
import ProductCard from '../components/ProductCard';

export default function Carrito() {
  const cartItems = [
    { id: 1, name: 'iPhone 17 Pro Max', desc: 'Titanio Natural, 256GB', price: 1199.00, tag: 'En stock', image: 'https://siman.vtexassets.com/arquivos/ids/7360900/998877-1544-1.jpg?v=638956268448200000' },
    { id: 2, name: 'Samsung s26 Ultra', desc: 'Negro Fantasma, 512GB', price: 1299.00, tag: 'Disponibilidad limitada', image: 'https://siman.vtexassets.com/arquivos/ids/7842245/s26ultrablanco-1.jpg?v=639076473326970000' },
  ];

  return (
    <div className="max-w-5xl mx-auto px-6 py-12">
      <h1 className="text-3xl font-black text-gray-900 mb-2">Tu Carrito</h1>
      <p className="text-gray-500 mb-8">Gestiona tu selección de smartphones premium</p>

      <div className="flex gap-8">
        {/* Lista de Items */}
        <div className="flex-1">
          <div className="grid grid-cols-2 gap-6">
            {cartItems.map(item => (
              <ProductCard key={item.id} product={item} />
            ))}
          </div>
        </div>

        {/* Resumen */}
        <div className="w-80">
          <div className="bg-white p-6 rounded-2xl border border-gray-200">
            <h3 className="font-bold text-lg mb-6">Resumen del pedido</h3>
            
            <div className="space-y-3 text-sm text-gray-600 mb-6 border-b pb-6">
              <div className="flex justify-between">
                <span>Subtotal</span>
                <span className="font-medium text-gray-900">$2,498.00</span>
              </div>
              <div className="flex justify-between">
                <span>Envío</span>
                <span className="font-medium text-green-500">GRATIS</span>
              </div>
              <div className="flex justify-between">
                <span>Impuestos estimados</span>
                <span className="font-medium text-gray-900">$199.84</span>
              </div>
            </div>

            <div className="flex justify-between items-center mb-6">
              <span className="font-bold text-lg">Total del pedido</span>
              <span className="font-black text-2xl text-blue-600">$2,697.84</span>
            </div>

            <Link to="/" className="w-full bg-blue-500 text-white py-3 rounded-lg font-medium flex justify-center items-center gap-2 hover:bg-blue-600 mb-3">
              <ShieldCheck className="w-5 h-5" /> Proceder al pago
            </Link>
            <Link to="/catalogo" className="w-full bg-gray-100 text-gray-800 py-3 rounded-lg font-medium flex justify-center hover:bg-gray-200">
              Continuar comprando
            </Link>

            <div className="mt-6 space-y-2 text-xs text-gray-500">
              <div className="flex items-center gap-2"><ShieldCheck className="w-4 h-4 text-blue-500"/> Pago seguro encriptado SSL</div>
              <div className="flex items-center gap-2"><Truck className="w-4 h-4 text-blue-500"/> Entrega rápida y con seguimiento</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
