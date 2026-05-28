import { Link } from 'react-router-dom';
import { ShoppingCart } from 'lucide-react';

export default function ProductCard({ product }) {
  return (
    <div className="bg-white rounded-3xl p-6 border border-gray-100 shadow-sm flex flex-col items-center text-center h-full">
      {product.tag && (
        <span className="bg-secondary text-white text-[10px] font-bold px-2 py-1 rounded-full self-start mb-4">
          {product.tag.toUpperCase()}
        </span>
      )}
      
      <div className="w-full h-48 bg-gray-50 rounded-2xl mb-4 overflow-hidden flex items-center justify-center">
        {product.image ? (
          <img src={product.image} alt={product.name} className="h-full w-full object-cover hover:scale-105 transition-transform duration-300" />
        ) : (
          <div className="w-full h-full bg-gray-100"></div>
        )}
      </div>
      
      {product.brand && (
        <span className="text-primary text-sm font-medium self-start">{product.brand}</span>
      )}
      
      <h3 className="font-bold text-gray-900 self-start text-left leading-tight mb-1">{product.name}</h3>
      
      {product.desc && (
        <p className="text-xs text-gray-500 self-start text-left mb-4">{product.desc}</p>
      )}

      {product.oldPrice && (
        <div className="flex text-yellow-400 text-xs mb-2 self-start">
          ★★★★★ <span className="text-gray-400 ml-1">(12)</span>
        </div>
      )}

      <div className="w-full mt-auto flex flex-col gap-3">
        <div className="flex items-center gap-2 self-start">
          <span className="font-black text-xl text-left">
            ${typeof product.price === 'number' ? product.price.toFixed(2) : product.price}
          </span>
          {product.oldPrice && (
            <span className="text-gray-400 text-xs line-through">
              ${typeof product.oldPrice === 'number' ? product.oldPrice.toFixed(2) : product.oldPrice}
            </span>
          )}
        </div>
        <Link to="/carrito" className="w-full bg-secondary text-white py-2 rounded-full font-medium text-sm flex items-center justify-center gap-2 hover:bg-blue-900 transition">
          <ShoppingCart className="w-4 h-4" /> Agregar al carrito
        </Link>
      </div>
    </div>
  );
}
