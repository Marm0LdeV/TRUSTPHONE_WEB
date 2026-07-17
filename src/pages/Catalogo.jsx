import { useState, useMemo } from 'react';
import { useFetch } from '../hooks/useFetch';
import ProductCard from '../components/ProductCard';

export default function Catalogo() {
  const { data, loading, error } = useFetch('/api/celulares');
  const [selectedBrands, setSelectedBrands] = useState([]);
  const [selectedConditions, setSelectedConditions] = useState([]);

  const products = data ? data.map(item => ({
    id: item._id,
    brand: item.idMarca?.nombre || item.idMarca?.name || 'Celular',
    name: item.nombre,
    desc: `${item.color || ''}, ${item.almacenamiento || ''} - ${item.condicion || ''}`,
    price: item.precio || 0,
    image: item.imagen || 'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?auto=format&fit=crop&q=80&w=400&h=400',
    tag: item.condicion || ''
  })) : [];

  const handleBrandChange = (marca) => {
    setSelectedBrands(prev => 
      prev.includes(marca) ? prev.filter(m => m !== marca) : [...prev, marca]
    );
  };

  const handleConditionChange = (cond) => {
    setSelectedConditions(prev => 
      prev.includes(cond) ? prev.filter(c => c !== cond) : [...prev, cond]
    );
  };

  const filteredProducts = useMemo(() => {
    let result = products;
    if (selectedBrands.length > 0) {
      result = result.filter(p => selectedBrands.some(b => p.brand.toLowerCase().includes(b.toLowerCase())));
    }
    if (selectedConditions.length > 0) {
      result = result.filter(p => selectedConditions.some(c => p.tag.toLowerCase() === c.toLowerCase()));
    }
    return result;
  }, [products, selectedBrands, selectedConditions]);

  // Extract unique brands from data to only show existing brands in filter
  const existingBrands = useMemo(() => {
    const brands = new Set(products.map(p => p.brand));
    return Array.from(brands).filter(Boolean);
  }, [products]);

  // The user asked to show only existing brands, but also to show a message for "the rest".
  // We'll show a static list, and if a selected brand has no products, we show the message.
  const ALL_BRANDS = ['iPhone', 'Xiaomi', 'Honor', 'Samsung', 'Google', 'Huawei', 'Motorola'];

  return (
    <div className="max-w-[1400px] mx-auto px-4 lg:px-8 py-8 flex gap-8 items-start">
      {/* Sidebar Filtros */}
      <div className="w-64 flex-shrink-0">
        <div className="bg-white p-6 rounded-2xl border border-gray-200 shadow-sm sticky top-24">
          <h3 className="font-bold flex items-center gap-2 mb-6 border-b pb-4">
            Filtros
          </h3>
          
          <div className="mb-6">
            <h4 className="font-semibold text-sm mb-3">Marcas</h4>
            <div className="space-y-2 text-sm text-gray-600">
              {ALL_BRANDS.map(marca => (
                <label key={marca} className="flex items-center gap-2 cursor-pointer">
                  <input 
                    type="checkbox" 
                    className="rounded text-primary" 
                    checked={selectedBrands.includes(marca)}
                    onChange={() => handleBrandChange(marca)}
                  />
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
                  <input 
                    type="checkbox" 
                    className="rounded text-primary"
                    checked={selectedConditions.includes(cond)}
                    onChange={() => handleConditionChange(cond)}
                  />
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
      <div className="flex-1 min-h-[80vh]">
        {loading ? (
          <div className="flex justify-center items-center h-64 w-full">
            <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-primary"></div>
          </div>
        ) : error ? (
          <div className="bg-red-50 text-red-600 p-4 rounded-xl text-center font-medium border border-red-100">
            {error}
          </div>
        ) : filteredProducts.length === 0 ? (
          <div className="text-center text-gray-500 py-12">
            No hay productos que coincidan con estos filtros en este momento.
          </div>
        ) : (
          <>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {filteredProducts.map(p => (
                <ProductCard key={p.id} product={p} />
              ))}
            </div>

            {/* Paginación */}
            <div className="flex justify-center items-center gap-2 mt-12">
              <button className="w-10 h-10 rounded-lg bg-blue-600 text-white font-medium">1</button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
