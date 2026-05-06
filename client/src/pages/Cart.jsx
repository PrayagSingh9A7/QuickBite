import { Minus, Plus, Trash2 } from 'lucide-react';
import { useState } from 'react';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext.jsx';
import api from '../services/api.js';

const Cart = () => {
  const { items, updateQuantity, clearCart, totalAmount } = useCart();
  const [loading, setLoading] = useState(false);
  const [address, setAddress] = useState({ fullName: '', phone: '', street: '', city: '', state: '', zipCode: '' });
  const navigate = useNavigate();

  const placeOrder = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await api.post('/orders', {
        items: items.map((item) => ({ food: item._id, quantity: item.quantity })),
        deliveryAddress: address
      });
      clearCart();
      toast.success('Order placed');
      navigate('/orders');
    } catch (error) {
      toast.error(error.response?.data?.message || 'Could not place order');
    } finally {
      setLoading(false);
    }
  };

  if (!items.length) {
    return <p className="rounded-lg border border-stone-200 bg-white p-8 text-center text-stone-600">Your cart is empty.</p>;
  }

  return (
    <div className="grid gap-8 lg:grid-cols-[1fr_380px]">
      <section className="space-y-4">
        <h1 className="text-2xl font-extrabold">Cart</h1>
        {items.map((item) => (
          <div className="grid gap-4 rounded-lg border border-stone-200 bg-white p-4 sm:grid-cols-[96px_1fr_auto]" key={item._id}>
            <img src={item.image.url} alt={item.name} className="h-24 w-24 rounded-md object-cover" />
            <div>
              <h2 className="font-bold">{item.name}</h2>
              <p className="text-sm text-stone-600">${item.price.toFixed(2)} each</p>
            </div>
            <div className="flex items-center gap-2">
              <button className="btn-secondary px-2" onClick={() => updateQuantity(item._id, item.quantity - 1)} title="Decrease quantity">
                <Minus size={16} />
              </button>
              <span className="w-8 text-center font-bold">{item.quantity}</span>
              <button className="btn-secondary px-2" onClick={() => updateQuantity(item._id, item.quantity + 1)} title="Increase quantity">
                <Plus size={16} />
              </button>
              <button className="btn-secondary px-2" onClick={() => updateQuantity(item._id, 0)} title="Remove item">
                <Trash2 size={16} />
              </button>
            </div>
          </div>
        ))}
      </section>

      <form className="h-fit space-y-4 rounded-lg border border-stone-200 bg-white p-5 shadow-sm" onSubmit={placeOrder}>
        <h2 className="text-xl font-extrabold">Delivery details</h2>
        {Object.keys(address).map((field) => (
          <label className="block space-y-1" key={field}>
            <span className="label capitalize">{field.replace(/([A-Z])/g, ' $1')}</span>
            <input className="input" value={address[field]} onChange={(e) => setAddress({ ...address, [field]: e.target.value })} required />
          </label>
        ))}
        <div className="flex items-center justify-between border-t border-stone-200 pt-4 text-lg font-extrabold">
          <span>Total</span>
          <span>${totalAmount.toFixed(2)}</span>
        </div>
        <button className="btn-primary w-full" disabled={loading}>
          {loading ? 'Placing order...' : 'Place order'}
        </button>
      </form>
    </div>
  );
};

export default Cart;
