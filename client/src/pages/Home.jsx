import { Search, Sparkles } from 'lucide-react';
import { useEffect, useMemo, useState } from 'react';
import toast from 'react-hot-toast';
import FoodCard from '../components/FoodCard.jsx';
import Loader from '../components/Loader.jsx';
import api from '../services/api.js';

const Home = () => {
  const [foods, setFoods] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState('');

  const categories = useMemo(
    () => [...new Set(foods.map((food) => food.category))],
    [foods]
  );

  useEffect(() => {
    const fetchFoods = async () => {
      try {
        const { data } = await api.get('/foods', {
          params: { search, category, available: true },
        });

        setFoods(data.foods);
      } catch (error) {
        toast.error(
          error.response?.data?.message || 'Failed to load foods'
        );
      } finally {
        setLoading(false);
      }
    };

    const timer = setTimeout(fetchFoods, 250);
    return () => clearTimeout(timer);
  }, [search, category]);

  return (
    <section className="space-y-10">

    
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-orange-500 via-red-500 to-pink-500 p-8 text-white shadow-2xl md:p-12">

        <div className="absolute right-0 top-0 h-52 w-52 rounded-full bg-white/10 blur-3xl"></div>
        <div className="absolute bottom-0 left-0 h-40 w-40 rounded-full bg-black/10 blur-2xl"></div>

        <div className="relative z-10 grid gap-10 md:grid-cols-[1.2fr_0.8fr]">

          <div className="space-y-5">
            <div className="flex items-center gap-2">
              <Sparkles className="text-yellow-300" size={18} />
              <p className="text-sm font-semibold uppercase tracking-[3px] text-orange-100">
                Fastest Food Delivery
              </p>
            </div>

            <h1 className="text-5xl font-black leading-tight md:text-6xl">
              Enjoy Your
              <span className="block text-yellow-300">
                Favorite Food 🍔
              </span>
            </h1>

            <p className="max-w-xl text-lg text-orange-50">
              Delicious meals delivered hot & fresh at your doorstep.
              Search from burgers, pizzas, biryani, desserts and more.
            </p>

            <button className="rounded-full bg-white px-7 py-3 font-bold text-red-500 transition hover:scale-105 hover:bg-stone-100">
              Explore Menu
            </button>
          </div>

          <div className="flex items-end">
            <div className="w-full rounded-2xl border border-white/20 bg-white/10 p-6 backdrop-blur-lg">
              <p className="text-sm text-orange-100">
                Today’s Special
              </p>

              <h2 className="mt-2 text-3xl font-extrabold">
                Flat 50% OFF
              </h2>

              <p className="mt-3 text-orange-50">
                On your first order above ₹299
              </p>

              <div className="mt-5 flex items-center justify-between rounded-xl bg-black/20 p-4">
                <div>
                  <p className="text-sm text-orange-100">
                    Delivery Time
                  </p>
                  <p className="font-bold">20 - 30 mins</p>
                </div>

                <div>
                  <p className="text-sm text-orange-100">
                    Rating
                  </p>
                  <p className="font-bold">⭐ 4.8</p>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>

     
      <div className="grid gap-4 md:grid-cols-[1fr_240px]">

        <div className="relative">
          <Search
            className="absolute left-4 top-1/2 -translate-y-1/2 text-stone-400"
            size={20}
          />

          <input
            className="w-full rounded-2xl border border-stone-200 bg-white px-12 py-4 text-sm shadow-sm outline-none transition focus:border-red-400 focus:ring-4 focus:ring-red-100"
            placeholder="Search pizza, burger, biryani..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>

        <select
          className="rounded-2xl border border-stone-200 bg-white px-4 py-4 text-sm shadow-sm outline-none transition focus:border-red-400 focus:ring-4 focus:ring-red-100"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
        >
          <option value="">All categories</option>

          {categories.map((item) => (
            <option value={item} key={item}>
              {item}
            </option>
          ))}
        </select>
      </div>

    
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-extrabold text-stone-800">
          Popular Dishes
        </h2>

        <p className="text-sm text-stone-500">
          {foods.length} items available
        </p>
      </div>

      {loading ? (
        <Loader label="Loading delicious foods..." />
      ) : (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {foods.map((food) => (
            <FoodCard food={food} key={food._id} />
          ))}

          {!foods.length && (
            <div className="col-span-full rounded-2xl border border-dashed border-stone-300 bg-stone-50 p-10 text-center">
              <p className="text-lg font-semibold text-stone-600">
                No food items found 🍽️
              </p>

              <p className="mt-2 text-sm text-stone-500">
                Try searching another dish or category
              </p>
            </div>
          )}
        </div>
      )}
    </section>
  );
};

export default Home;