import { createBrowserRouter } from 'react-router-dom';
import App from './App.jsx';
import AdminDashboard from './pages/AdminDashboard.jsx';
import Cart from './pages/Cart.jsx';
import Home from './pages/Home.jsx';
import Login from './pages/Login.jsx';
import Orders from './pages/Orders.jsx';
import Signup from './pages/Signup.jsx';
import ProtectedRoute from './components/ProtectedRoute.jsx';

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      { index: true, element: <Home /> },
      { path: 'login', element: <Login /> },
      { path: 'signup', element: <Signup /> },
      {
        path: 'cart',
        element: (
          <ProtectedRoute>
            <Cart />
          </ProtectedRoute>
        )
      },
      {
        path: 'orders',
        element: (
          <ProtectedRoute>
            <Orders />
          </ProtectedRoute>
        )
      },
      {
        path: 'admin',
        element: (
          <ProtectedRoute roles={['admin']}>
            <AdminDashboard />
          </ProtectedRoute>
        )
      }
    ]
  }
]);

export default router;
