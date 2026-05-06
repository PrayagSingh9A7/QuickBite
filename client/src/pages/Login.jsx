import { useState } from 'react';
import toast from 'react-hot-toast';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext.jsx';

const Login = () => {
  const [form, setForm] = useState({ email: '', password: '' });
  const { login, loading } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await login(form);
      navigate('/');
    } catch (error) {
      toast.error(error.response?.data?.message || 'Login failed');
    }
  };

  return (
    <div className="mx-auto max-w-md rounded-lg border border-stone-200 bg-white p-6 shadow-sm">
      <h1 className="text-2xl font-extrabold">Login</h1>
      <form className="mt-6 space-y-4" onSubmit={handleSubmit}>
        <label className="block space-y-1">
          <span className="label">Email</span>
          <input className="input" type="email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} required />
        </label>
        <label className="block space-y-1">
          <span className="label">Password</span>
          <input className="input" type="password" value={form.password} onChange={(e) => setForm({ ...form, password: e.target.value })} required />
        </label>
        <button className="btn-primary w-full" disabled={loading}>
          {loading ? 'Logging in...' : 'Login'}
        </button>
      </form>
      <p className="mt-4 text-sm text-stone-600">
        New here? <Link className="font-semibold text-brand-700" to="/signup">Create an account</Link>
      </p>
    </div>
  );
};

export default Login;
