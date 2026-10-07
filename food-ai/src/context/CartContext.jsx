import { createContext, useContext, useMemo } from 'react';
import useLocalStorage from '../hooks/useLocalStorage.js';
import foods from '../data/foods.js';
import { calcTotals } from '../utils/helpers.js';

const CartContext = createContext(null);

export function CartProvider({ children }) {
  // Only ids + quantities are stored; product data comes from foods.js
  const [items, setItems] = useLocalStorage('foodai_cart', []);

  const addToCart = (id, qty = 1) =>
    setItems((prev) => {
      const existing = prev.find((i) => i.id === id);
      return existing
        ? prev.map((i) => (i.id === id ? { ...i, qty: Math.min(i.qty + qty, 20) } : i))
        : [...prev, { id, qty }];
    });

  const removeFromCart = (id) => setItems((prev) => prev.filter((i) => i.id !== id));
  const updateQty = (id, qty) =>
    qty < 1 ? removeFromCart(id) : setItems((prev) => prev.map((i) => (i.id === id ? { ...i, qty: Math.min(qty, 20) } : i)));
  const clearCart = () => setItems([]);

  const lines = useMemo(
    () => items.map((i) => ({ ...foods.find((f) => f.id === i.id), qty: i.qty })).filter((l) => l.name),
    [items]
  );
  const totals = useMemo(() => calcTotals(lines), [lines]);
  const count = lines.reduce((sum, l) => sum + l.qty, 0);

  return (
    <CartContext.Provider value={{ lines, totals, count, addToCart, removeFromCart, updateQty, clearCart }}>
      {children}
    </CartContext.Provider>
  );
}

export const useCart = () => useContext(CartContext);
