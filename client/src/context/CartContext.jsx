import { createContext, useContext, useMemo, useState } from 'react';
import toast from 'react-hot-toast';

const CartContext = createContext(null);

export const CartProvider = ({ children }) => {
  const [items, setItems] = useState(() => {
    const savedCart = localStorage.getItem('quickbiteCart');
    return savedCart ? JSON.parse(savedCart) : [];
  });

  const saveItems = (nextItems) => {
    setItems(nextItems);
    localStorage.setItem('quickbiteCart', JSON.stringify(nextItems));
  };

  const addToCart = (food) => {
    const existing = items.find((item) => item._id === food._id);
    const nextItems = existing
      ? items.map((item) => (item._id === food._id ? { ...item, quantity: item.quantity + 1 } : item))
      : [...items, { ...food, quantity: 1 }];

    saveItems(nextItems);
    toast.success(`${food.name} added to cart`);
  };

  const updateQuantity = (foodId, quantity) => {
    if (quantity < 1) {
      saveItems(items.filter((item) => item._id !== foodId));
      return;
    }

    saveItems(items.map((item) => (item._id === foodId ? { ...item, quantity } : item)));
  };

  const clearCart = () => saveItems([]);

  const totalAmount = items.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const totalItems = items.reduce((sum, item) => sum + item.quantity, 0);

  const value = useMemo(
    () => ({ items, addToCart, updateQuantity, clearCart, totalAmount, totalItems }),
    [items, totalAmount, totalItems]
  );

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};

export const useCart = () => useContext(CartContext);
