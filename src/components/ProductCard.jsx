import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ShoppingCart, Check } from 'lucide-react';

export default function ProductCard({ product }) {
  const [added, setAdded] = useState(false);
  const navigate = useNavigate();

  const handleAddToCart = () => {
    try {
      const stored = localStorage.getItem('cart');
      const cart = stored ? JSON.parse(stored) : [];
      const existingIdx = cart.findIndex(item => item.id === product.id);
      if (existingIdx >= 0) {
        cart[existingIdx].quantity = (cart[existingIdx].quantity || 1) + 1;
      } else {
        cart.push({
          id: product.id,
          name: product.name,
          desc: product.desc || '',
          price: product.price,
          image: product.image,
          tag: product.tag,
          quantity: 1
        });
      }
      localStorage.setItem('cart', JSON.stringify(cart));
      window.dispatchEvent(new Event('cartUpdated'));
      // Show brief success state
      setAdded(true);
      setTimeout(() => setAdded(false), 2000);
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <div className="bg-white rounded-3xl p-6 border border-gray-100 shadow-sm flex flex-col items-center text-center h-full hover:shadow-md transition-shadow duration-200">
      {product.tag && (
        <span className="bg-secondary text-white text-[10px] font-bold px-2 py-1 rounded-full self-start mb-4">
          {product.tag.toUpperCase()}
        </span>
      )}
      
      <div className="w-full h-48 bg-gray-50 rounded-2xl mb-4 overflow-hidden flex items-center justify-center">
        {product.image ? (
          <img
            src={product.image}
            alt={product.name}
            className="h-full w-full object-cover hover:scale-105 transition-transform duration-300"
            onError={e => { e.target.src = 'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=400&fit=crop'; }}
          />
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

      <div className="w-full mt-auto flex flex-col gap-3">
        <div className="flex items-center gap-2 self-start">
          <span className="font-black text-xl text-left">
            ${typeof product.price === 'number' ? product.price.toFixed(2) : product.price}
          </span>
        </div>
        <button
          onClick={handleAddToCart}
          className={`w-full py-2 rounded-full font-medium text-sm flex items-center justify-center gap-2 transition-all duration-200 ${
            added
              ? 'bg-green-500 text-white'
              : 'bg-secondary text-white hover:bg-blue-900'
          }`}
        >
          {added ? (
            <>
              <Check className="w-4 h-4" /> ¡Añadido!
            </>
          ) : (
            <>
              <ShoppingCart className="w-4 h-4" /> Agregar al carrito
            </>
          )}
        </button>
      </div>
    </div>
  );
}
