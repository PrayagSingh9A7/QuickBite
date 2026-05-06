import { Link, NavLink, useNavigate } from 'react-router-dom';
import { LogOut, ShoppingCart, Utensils } from 'lucide-react';

import { useAuth } from '../context/AuthContext.jsx';
import { useCart } from '../context/CartContext.jsx';

const Navbar = () => {
  const { user, isAdmin, logout } = useAuth();
  const { totalItems } = useCart();
  const navigate = useNavigate();

  const linkClass = ({ isActive }) =>
    `px-4 py-2 rounded-xl text-sm font-medium transition-all duration-200
    ${
      isActive
        ? 'bg-orange-100 text-orange-600'
        : 'text-stone-600 hover:bg-stone-100 hover:text-stone-900'
    }`;

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <header className="sticky top-0 z-50 border-b border-stone-200/80 bg-white/90 backdrop-blur-md">
      <nav className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">

        {/* Logo */}
        <Link
          to="/"
          className="flex items-center gap-3"
        >
          <div className="grid h-10 w-10 place-items-center rounded-2xl bg-orange-500 text-white shadow-sm">
            <Utensils size={20} />
          </div>

          <div className="flex flex-col leading-tight">
            <span className="text-xl font-bold tracking-tight text-stone-900">
              QuickBite
            </span>

            <span className="text-xs text-stone-500">
              Delicious food delivered
            </span>
          </div>
        </Link>

        {/* Nav */}
        <div className="flex items-center gap-2">

          <NavLink to="/" className={linkClass}>
            Menu
          </NavLink>

          {user && (
            <>
              <NavLink to="/orders" className={linkClass}>
                Orders
              </NavLink>

              {isAdmin && (
                <NavLink to="/admin" className={linkClass}>
                  Admin
                </NavLink>
              )}

              {/* Cart */}
              <NavLink
                to="/cart"
                className="relative rounded-xl p-2.5 text-stone-600 transition hover:bg-stone-100 hover:text-stone-900"
              >
                <ShoppingCart size={22} />

                {totalItems > 0 && (
                  <span className="absolute -right-1 -top-1 flex h-5 min-w-5 items-center justify-center rounded-full bg-orange-500 px-1 text-[11px] font-bold text-white">
                    {totalItems}
                  </span>
                )}
              </NavLink>

              {/* Logout */}
              <button
                onClick={handleLogout}
                className="rounded-xl p-2.5 text-stone-600 transition hover:bg-red-50 hover:text-red-500"
              >
                <LogOut size={20} />
              </button>
            </>
          )}

          {!user && (
            <>
              <NavLink to="/login" className={linkClass}>
                Login
              </NavLink>

              <Link
                to="/signup"
                className="rounded-xl bg-orange-500 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-orange-600"
              >
                Signup
              </Link>
            </>
          )}
        </div>
      </nav>
    </header>
  );
};

export default Navbar;