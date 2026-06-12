import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ShoppingCart } from 'lucide-react';
import ProductCard from '../components/ProductCard';

export default function Catalogo() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/api/celulares')
      .then(res => res.json())
      .then(data => {
        const mappedProducts = data.map(item => ({
          id: item._id,
          brand: item.idMarca?.nombre || 'Celular',
          name: item.nombre,
          desc: `${item.color || ''}, ${item.almacenamiento || ''} - ${item.condicion || ''}`,
          price: item.precio || 0,
          image: item.imagen || 'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?auto=format&fit=crop&q=80&w=400&h=400',
          tag: item.condicion || ''
        }));
        setProducts(mappedProducts);
        setLoading(false);
      })
      .catch(err => {
        console.error(err);
        setLoading(false);
      });
  }, []);

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
