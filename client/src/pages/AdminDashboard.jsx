import { Edit, Trash2 } from 'lucide-react';
import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import Loader from '../components/Loader.jsx';
import api from '../services/api.js';

const initialForm = {
  name: '',
  description: '',
  price: '',
  category: '',
  isAvailable: true,
  image: null
};

const AdminDashboard = () => {
  const [foods, setFoods] = useState([]);
  const [orders, setOrders] = useState([]);
  const [form, setForm] = useState(initialForm);
  const [editingId, setEditingId] = useState(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  const fetchAdminData = async () => {
    try {
      const [foodRes, orderRes] = await Promise.all([api.get('/foods'), api.get('/orders')]);
      setFoods(foodRes.data.foods);
      setOrders(orderRes.data.orders);
    } catch (error) {
      toast.error(error.response?.data?.message || 'Failed to load admin data');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAdminData();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);

    const data = new FormData();
    Object.entries(form).forEach(([key, value]) => {
      if (value !== null) data.append(key, value);
    });

    try {
      if (editingId) {
        await api.put(`/foods/${editingId}`, data);
        toast.success('Food updated');
      } else {
        await api.post('/foods', data);
        toast.success('Food added');
      }
      setForm(initialForm);
      setEditingId(null);
      fetchAdminData();
    } catch (error) {
      toast.error(error.response?.data?.message || 'Save failed');
    } finally {
      setSaving(false);
    }
  };

  const startEdit = (food) => {
    setEditingId(food._id);
    setForm({
      name: food.name,
      description: food.description,
      price: food.price,
      category: food.category,
      isAvailable: food.isAvailable,
      image: null
    });
  };

  const deleteFood = async (id) => {
    if (!confirm('Delete this food item?')) return;
    try {
      await api.delete(`/foods/${id}`);
      setFoods(foods.filter((food) => food._id !== id));
      toast.success('Food deleted');
    } catch (error) {
      toast.error(error.response?.data?.message || 'Delete failed');
    }
  };

  const updateStatus = async (orderId, status) => {
    try {
      const { data } = await api.patch(`/orders/${orderId}/status`, { status });
      setOrders(orders.map((order) => (order._id === orderId ? data.order : order)));
      toast.success('Order status updated');
    } catch (error) {
      toast.error(error.response?.data?.message || 'Status update failed');
    }
  };

  if (loading) return <Loader label="Loading dashboard..." />;

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-extrabold">Admin dashboard</h1>
        <p className="text-stone-600">Manage menu items, image uploads, and order statuses.</p>
      </div>

      <form className="grid gap-4 rounded-lg border border-stone-200 bg-white p-5 shadow-sm md:grid-cols-2" onSubmit={handleSubmit}>
        <h2 className="md:col-span-2 text-xl font-extrabold">{editingId ? 'Edit food' : 'Add food'}</h2>
        <input className="input" placeholder="Name" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} required />
        <input className="input" placeholder="Category" value={form.category} onChange={(e) => setForm({ ...form, category: e.target.value })} required />
        <input className="input" type="number" min="0" step="0.01" placeholder="Price" value={form.price} onChange={(e) => setForm({ ...form, price: e.target.value })} required />
        <input className="input" type="file" accept="image/*" onChange={(e) => setForm({ ...form, image: e.target.files[0] })} required={!editingId} />
        <textarea className="input md:col-span-2" rows="3" placeholder="Description" value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} required />
        <label className="flex items-center gap-2 text-sm font-semibold">
          <input type="checkbox" checked={form.isAvailable} onChange={(e) => setForm({ ...form, isAvailable: e.target.checked })} />
          Available
        </label>
        <div className="flex gap-2 md:justify-end">
          {editingId && (
            <button type="button" className="btn-secondary" onClick={() => { setEditingId(null); setForm(initialForm); }}>
              Cancel
            </button>
          )}
          <button className="btn-primary" disabled={saving}>
            {saving ? 'Saving...' : 'Save food'}
          </button>
        </div>
      </form>

      <section className="grid gap-4 lg:grid-cols-2">
        {foods.map((food) => (
          <article className="grid gap-4 rounded-lg border border-stone-200 bg-white p-4 shadow-sm sm:grid-cols-[96px_1fr_auto]" key={food._id}>
            <img src={food.image.url} alt={food.name} className="h-24 w-24 rounded-md object-cover" />
            <div>
              <h3 className="font-bold">{food.name}</h3>
              <p className="text-sm text-stone-600">{food.category} - ${food.price.toFixed(2)}</p>
              <p className="text-sm text-stone-500">{food.isAvailable ? 'Available' : 'Unavailable'}</p>
            </div>
            <div className="flex items-start gap-2">
              <button className="btn-secondary px-2" onClick={() => startEdit(food)} title="Edit food">
                <Edit size={16} />
              </button>
              <button className="btn-secondary px-2" onClick={() => deleteFood(food._id)} title="Delete food">
                <Trash2 size={16} />
              </button>
            </div>
          </article>
        ))}
      </section>

      <section className="space-y-4">
        <h2 className="text-xl font-extrabold">Orders</h2>
        {orders.map((order) => (
          <article className="rounded-lg border border-stone-200 bg-white p-4 shadow-sm" key={order._id}>
            <div className="flex flex-wrap items-center justify-between gap-3">
              <div>
                <p className="font-bold">{order.user?.name} - ${order.totalAmount.toFixed(2)}</p>
                <p className="text-sm text-stone-600">{order.items.map((item) => `${item.name} x ${item.quantity}`).join(', ')}</p>
              </div>
              <select className="input max-w-48" value={order.status} onChange={(e) => updateStatus(order._id, e.target.value)}>
                {['Placed', 'Preparing', 'Out for Delivery', 'Delivered', 'Cancelled'].map((status) => (
                  <option key={status}>{status}</option>
                ))}
              </select>
            </div>
          </article>
        ))}
      </section>
    </div>
  );
};

export default AdminDashboard;
