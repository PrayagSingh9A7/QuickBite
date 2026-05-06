import { createContext, useContext, useEffect, useMemo, useState } from 'react';
import toast from 'react-hot-toast';
import api from '../services/api.js';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    const savedUser = localStorage.getItem('quickbiteUser');
    return savedUser ? JSON.parse(savedUser) : null;
  });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem('quickbiteToken');
    if (!token) return;

    api
      .get('/auth/me')
      .then(({ data }) => setUser(data.user))
      .catch(() => logout(false));
  }, []);

  const persistSession = ({ token, user }) => {
    localStorage.setItem('quickbiteToken', token);
    localStorage.setItem('quickbiteUser', JSON.stringify(user));
    setUser(user);
  };

  const signup = async (payload) => {
    setLoading(true);
    try {
      const { data } = await api.post('/auth/signup', payload);
      persistSession(data);
      toast.success('Welcome to QuickBite');
    } finally {
      setLoading(false);
    }
  };

  const login = async (payload) => {
    setLoading(true);
    try {
      const { data } = await api.post('/auth/login', payload);
      persistSession(data);
      toast.success('Logged in successfully');
    } finally {
      setLoading(false);
    }
  };

  const logout = (showToast = true) => {
    localStorage.removeItem('quickbiteToken');
    localStorage.removeItem('quickbiteUser');
    setUser(null);
    if (showToast) toast.success('Logged out');
  };

  const value = useMemo(
    () => ({ user, loading, signup, login, logout, isAdmin: user?.role === 'admin' }),
    [user, loading]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => useContext(AuthContext);
