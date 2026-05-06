import { Outlet } from 'react-router-dom';
import Navbar from './components/Navbar.jsx';

const App = () => {
  return (
  <div className="min-h-screen bg-gradient-to-br from-orange-50 via-white to-red-50 text-stone-950">
      <Navbar />
      <main className="mx-auto w-full max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <Outlet />
      </main>
    </div>
  );
};

export default App;
