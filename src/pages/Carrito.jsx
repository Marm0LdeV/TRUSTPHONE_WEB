import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Trash2, ShieldCheck, Truck, Plus, Minus, ShoppingCart } from 'lucide-react';

export default function Carrito() {
  const [cartItems, setCartItems] = useState([]);
  const [loading, setLoading] = useState(true);

  // Load cart from localStorage on mount
  useEffect(() => {
    const stored = localStorage.getItem('cart');
    if (stored) {
      try {
        const parsed = JSON.parse(stored);
        setCartItems(parsed);
      } catch {
        setCartItems([]);
      }
    } else {
      // If no cart exists, prefill with featured phones from the API as a demo
      fetch('/api/celulares')
        .then(res => res.json())
        .then(data => {
          if (data && data.length > 0) {
            const preloaded = data.slice(0, 2).map(c => ({
              id: c._id,
              name: `${c.nombre} ${c.modelo || ''}`.trim(),
              desc: `${c.almacenamiento || ''} - ${c.color || ''} - ${c.condicion || c.condicion}`.replace(/^-\s|-\s$/g, '').trim(),
              price: Number(c.precio) || 0,
              tag: c.stock > 5 ? 'En stock' : c.stock > 0 ? 'Disponibilidad limitada' : 'Sin stock',
              image: c.imagen || 'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=256&fit=crop',
              quantity: 1
            }));
            setCartItems(preloaded);
            localStorage.setItem('cart', JSON.stringify(preloaded));
          }
        })
        .catch(console.error)
        .finally(() => setLoading(false));
      return;
    }
    setLoading(false);
  }, []);

  const updateCart = (items) => {
    setCartItems(items);
    localStorage.setItem('cart', JSON.stringify(items));
    window.dispatchEvent(new Event('cartUpdated'));
  };

  const handleIncrement = (id) => {
    const updated = cartItems.map(item =>
      item.id === id ? { ...item, quantity: (item.quantity || 1) + 1 } : item
    );
    updateCart(updated);
  };

  const handleDecrement = (id) => {
    const updated = cartItems.map(item => {
      if (item.id === id) {
        const qty = (item.quantity || 1) - 1;
        return qty > 0 ? { ...item, quantity: qty } : item;
      }
      return item;
    });
    updateCart(updated);
  };

  const handleRemove = (id) => {
    const updated = cartItems.filter(item => item.id !== id);
    updateCart(updated);
  };

  const subtotal = cartItems.reduce((acc, item) => acc + (item.price * (item.quantity || 1)), 0);
  const tax = subtotal * 0.08;
  const total = subtotal + tax;

  if (loading) {
    return (
      <div className="max-w-5xl mx-auto px-6 py-12 text-center">
        <div className="animate-pulse text-gray-400">Cargando carrito...</div>
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto px-6 py-12">
      <h1 className="text-3xl font-black text-gray-900 mb-2">Tu Carrito</h1>
      <p className="text-gray-500 mb-8">Gestiona tu selección de smartphones premium</p>

      {cartItems.length === 0 ? (
        <div className="text-center py-24 bg-white rounded-2xl border border-gray-100 shadow-sm">
          <ShoppingCart className="w-16 h-16 text-gray-200 mx-auto mb-4" />
          <h2 className="text-xl font-bold text-gray-400 mb-2">Tu carrito está vacío</h2>
          <p className="text-sm text-gray-400 mb-6">Explora nuestro catálogo y añade productos</p>
          <Link to="/catalogo" className="bg-blue-500 text-white px-6 py-3 rounded-lg font-medium hover:bg-blue-600 transition">
            Ver catálogo
          </Link>
        </div>
      ) : (
        <div className="flex gap-8">
          {/* Lista de Items */}
          <div className="flex-1 space-y-4">
            {cartItems.map(item => (
              <div key={item.id} className="bg-white rounded-2xl border border-gray-100 p-4 flex gap-4 shadow-sm hover:shadow-md transition">
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-24 h-24 object-cover rounded-xl bg-gray-50 flex-shrink-0"
                  onError={e => { e.target.src = 'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=256&fit=crop'; }}
                />
                <div className="flex-1 min-w-0">
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="font-bold text-gray-900 text-sm">{item.name}</h3>
                      <p className="text-xs text-gray-400 mt-0.5">{item.desc}</p>
                      {item.tag && (
                        <span className="inline-block mt-1 text-[10px] font-bold px-2 py-0.5 bg-green-50 text-green-600 rounded-full">
                          {item.tag}
                        </span>
                      )}
                    </div>
                    <button
                      onClick={() => handleRemove(item.id)}
                      className="text-gray-300 hover:text-red-400 transition p-1"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                  <div className="flex items-center justify-between mt-3">
                    <div className="flex items-center gap-2 bg-gray-50 rounded-lg p-1">
                      <button
                        onClick={() => handleDecrement(item.id)}
                        className="w-6 h-6 flex items-center justify-center rounded hover:bg-white transition"
                      >
                        <Minus className="w-3 h-3" />
                      </button>
                      <span className="text-sm font-bold w-6 text-center">{item.quantity || 1}</span>
                      <button
                        onClick={() => handleIncrement(item.id)}
                        className="w-6 h-6 flex items-center justify-center rounded hover:bg-white transition"
                      >
                        <Plus className="w-3 h-3" />
                      </button>
                    </div>
                    <span className="font-black text-blue-600 text-lg">
                      ${(item.price * (item.quantity || 1)).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Resumen */}
          <div className="w-80">
            <div className="bg-white p-6 rounded-2xl border border-gray-200 sticky top-6">
              <h3 className="font-bold text-lg mb-6">Resumen del pedido</h3>

              <div className="space-y-3 text-sm text-gray-600 mb-6 border-b pb-6">
                <div className="flex justify-between">
                  <span>Subtotal ({cartItems.reduce((a, i) => a + (i.quantity || 1), 0)} artículos)</span>
                  <span className="font-medium text-gray-900">${subtotal.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</span>
                </div>
                <div className="flex justify-between">
                  <span>Envío</span>
                  <span className="font-medium text-green-500">GRATIS</span>
                </div>
                <div className="flex justify-between">
                  <span>Impuestos estimados (8%)</span>
                  <span className="font-medium text-gray-900">${tax.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</span>
                </div>
              </div>

              <div className="flex justify-between items-center mb-6">
                <span className="font-bold text-lg">Total del pedido</span>
                <span className="font-black text-2xl text-blue-600">${total.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</span>
              </div>

              <Link to="/" className="w-full bg-blue-500 text-white py-3 rounded-lg font-medium flex justify-center items-center gap-2 hover:bg-blue-600 mb-3">
                <ShieldCheck className="w-5 h-5" /> Proceder al pago
              </Link>
              <Link to="/catalogo" className="w-full bg-gray-100 text-gray-800 py-3 rounded-lg font-medium flex justify-center hover:bg-gray-200">
                Continuar comprando
              </Link>

              <div className="mt-6 space-y-2 text-xs text-gray-500">
                <div className="flex items-center gap-2"><ShieldCheck className="w-4 h-4 text-blue-500" /> Pago seguro encriptado SSL</div>
                <div className="flex items-center gap-2"><Truck className="w-4 h-4 text-blue-500" /> Entrega rápida y con seguimiento</div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
