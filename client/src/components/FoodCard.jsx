import { Plus } from 'lucide-react';
import { useAuth } from '../context/AuthContext.jsx';
import { useCart } from '../context/CartContext.jsx';

const FoodCard = ({ food }) => {
  const { addToCart } = useCart();
  const { user } = useAuth();

  return (
    <article className="overflow-hidden rounded-lg border border-stone-200 bg-white shadow-sm">
      <img src={food.image.url} alt={food.name} className="h-48 w-full object-cover" />
      <div className="space-y-3 p-4">
        <div className="flex items-start justify-between gap-3">
          <div>
            <h3 className="text-lg font-bold text-stone-950">{food.name}</h3>
            <p className="text-sm font-medium text-brand-700">{food.category}</p>
          </div>
          <p className="font-extrabold text-stone-950">${food.price.toFixed(2)}</p>
        </div>
        <p className="line-clamp-2 text-sm text-stone-600">{food.description}</p>
        <button className="btn-primary w-full" onClick={() => addToCart(food)} disabled={!food.isAvailable || !user}>
          <Plus size={18} />
          {user ? 'Add to cart' : 'Login to order'}
        </button>
      </div>
    </article>
  );
};

export default FoodCard;
