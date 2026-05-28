import { Link } from 'react-router-dom';
import { ShoppingCart } from 'lucide-react';
import ProductCard from '../components/ProductCard';

export default function Catalogo() {
  const products = [
    { id: 1, brand: 'Google', name: 'Pixel 10 pro XL', desc: 'Color piedra lunar, 512GB - Excelente', price: 799, image: 'https://m.media-amazon.com/images/I/61T7d8lxk6L._AC_SL1500_.jpg' },
    { id: 2, brand: 'Xiaomi', name: 'Xiaomi 15 pro Ultra', desc: 'Color negro, 512GB - Bueno', price: 899, image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRY6-sguxWcNQxH1aLZ3q7vTj7jEqyC8oODYw&s' },
    { id: 3, brand: 'Iphone', name: 'Iphone 17 pro max', desc: 'Color azul, 256GB - Como nuevo', price: 1100, image: 'https://siman.vtexassets.com/arquivos/ids/7360900/998877-1544-1.jpg?v=638956268448200000' },
    { id: 4, brand: 'Samsung', name: 'Samsung s26 ultra', desc: 'Color violeta, 512GB - Aceptable', price: 799, image: 'https://siman.vtexassets.com/arquivos/ids/7842245/s26ultrablanco-1.jpg?v=639076473326970000https://siman.vtexassets.com/arquivos/ids/7842245/s26ultrablanco-1.jpg?v=639076473326970000https://siman.vtexassets.com/arquivos/ids/7842245/s26ultrablanco-1.jpg?v=639076473326970000' },
    { id: 5, brand: 'Honor', name: 'Honor magic 7 pro', desc: 'Color blanco, 512GB - Como nuevo', price: 1200, image: 'https://www.celulares.com/fotos/hihonor-magic7-pro-97711-g-alt.jpg' },
    { id: 6, brand: 'Iphone', name: 'Iphone 16 pro', desc: 'Color dorado, 256GB - Excelente', price: 799, image: 'https://www.lacuracaonline.com/media/catalog/product/4/6/468131600016.jpg?optimize=medium&bg-color=255,255,255&fit=bounds&height=&width=&canvas=:' },
  ];

  return (
    <div className="max-w-7xl mx-auto px-6 py-8 flex gap-8">
      {/* Sidebar Filtros */}
      <div className="w-64 flex-shrink-0">
        <div className="bg-white p-6 rounded-2xl border border-gray-200 shadow-sm sticky top-24">
          <h3 className="font-bold flex items-center gap-2 mb-6 border-b pb-4">
            Filtros
          </h3>
          
          <div className="mb-6">
            <h4 className="font-semibold text-sm mb-3">Marcas</h4>
            <div className="space-y-2 text-sm text-gray-600">
              {['Iphone', 'Xiaomi', 'Honor', 'Samsung', 'Google'].map(marca => (
                <label key={marca} className="flex items-center gap-2 cursor-pointer">
                  <input type="checkbox" className="rounded text-primary" defaultChecked />
                  <span>{marca}</span>
                </label>
              ))}
            </div>
          </div>

          <div className="mb-6 border-t pt-4">
            <h4 className="font-semibold text-sm mb-3">Condicion</h4>
            <div className="space-y-2 text-sm text-gray-600">
              {['Como nuevo', 'Excelente', 'Bueno', 'Aceptable'].map(cond => (
                <label key={cond} className="flex items-center gap-2 cursor-pointer">
                  <input type="checkbox" className="rounded" />
                  <span>{cond}</span>
                </label>
              ))}
            </div>
          </div>

          <div className="mb-6 border-t pt-4">
            <h4 className="font-semibold text-sm mb-3">Precio</h4>
            <div className="flex items-center gap-2">
              <input type="text" placeholder="0" className="w-16 border rounded text-center py-1 text-sm outline-none" />
              <span>-</span>
              <input type="text" placeholder="1500" className="w-16 border rounded text-center py-1 text-sm outline-none" />
            </div>
          </div>

          <button className="w-full bg-blue-600 text-white rounded-lg py-2 text-sm font-medium hover:bg-blue-700">
            Aplicar filtros
          </button>
        </div>
      </div>

      {/* Grid de Productos */}
      <div className="flex-1">
        <div className="grid grid-cols-3 gap-6">
          {products.map(p => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>

        {/* Paginación */}
        <div className="flex justify-center items-center gap-2 mt-12">
          <button className="w-10 h-10 rounded-lg bg-secondary text-white font-medium">1</button>
          <button className="w-10 h-10 rounded-lg bg-white border text-gray-600 font-medium hover:bg-gray-50">2</button>
          <button className="w-10 h-10 rounded-lg bg-white border text-gray-600 font-medium hover:bg-gray-50">3</button>
          <span className="text-gray-400">...</span>
          <button className="w-10 h-10 rounded-lg bg-white border text-gray-600 font-medium hover:bg-gray-50">6</button>
          <button className="w-10 h-10 rounded-lg bg-white border text-gray-600 font-medium hover:bg-gray-50">&gt;</button>
        </div>
      </div>
    </div>
  );
}
