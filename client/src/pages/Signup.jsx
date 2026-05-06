import { useState } from 'react';
import toast from 'react-hot-toast';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext.jsx';

const Signup = () => {
  const [form, setForm] = useState({ name: '', email: '', password: '' });
  const { signup, loading } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await signup(form);
      navigate('/');
    } catch (error) {
      toast.error(error.response?.data?.message || 'Signup failed');
    }
  };

  return (
    <div className="mx-auto max-w-md rounded-lg border border-stone-200 bg-white p-6 shadow-sm">
      <h1 className="text-2xl font-extrabold">Create account</h1>
      <form className="mt-6 space-y-4" onSubmit={handleSubmit}>
        <label className="block space-y-1">
          <span className="label">Name</span>
          <input className="input" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} required />
        </label>
        <label className="block space-y-1">
          <span className="label">Email</span>
          <input className="input" type="email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} required />
        </label>
        <label className="block space-y-1">
          <span className="label">Password</span>
          <input className="input" type="password" minLength="6" value={form.password} onChange={(e) => setForm({ ...form, password: e.target.value })} required />
        </label>
        <button className="btn-primary w-full" disabled={loading}>
          {loading ? 'Creating...' : 'Signup'}
        </button>
      </form>
      <p className="mt-4 text-sm text-stone-600">
        Already have an account? <Link className="font-semibold text-brand-700" to="/login">Login</Link>
      </p>
    </div>
  );
};

export default Signup;
