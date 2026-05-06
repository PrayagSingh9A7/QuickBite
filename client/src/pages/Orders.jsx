import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import Loader from '../components/Loader.jsx';
import api from '../services/api.js';

const Orders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api
      .get('/orders/my-orders')
      .then(({ data }) => setOrders(data.orders))
      .catch((error) => toast.error(error.response?.data?.message || 'Failed to load orders'))
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <Loader label="Loading orders..." />;

  return (
    <section className="space-y-5">
      <h1 className="text-2xl font-extrabold">Order history</h1>
      {orders.map((order) => (
        <article className="rounded-lg border border-stone-200 bg-white p-5 shadow-sm" key={order._id}>
          <div className="flex flex-wrap items-center justify-between gap-3 border-b border-stone-200 pb-3">
            <div>
              <p className="font-bold">Order #{order._id.slice(-6).toUpperCase()}</p>
              <p className="text-sm text-stone-600">{new Date(order.createdAt).toLocaleString()}</p>
            </div>
            <span className="rounded-full bg-brand-100 px-3 py-1 text-sm font-bold text-brand-700">{order.status}</span>
          </div>
          <div className="mt-4 space-y-3">
            {order.items.map((item) => (
              <div className="flex items-center justify-between gap-4" key={item.food}>
                <span>{item.name} x {item.quantity}</span>
                <span className="font-semibold">${(item.price * item.quantity).toFixed(2)}</span>
              </div>
            ))}
          </div>
          <p className="mt-4 text-right text-lg font-extrabold">${order.totalAmount.toFixed(2)}</p>
        </article>
      ))}
      {!orders.length && <p className="rounded-lg border border-stone-200 bg-white p-8 text-center text-stone-600">No orders yet.</p>}
    </section>
  );
};

export default Orders;
