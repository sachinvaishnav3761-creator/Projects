import { createContext, useContext, useMemo } from 'react';
import useLocalStorage from '../hooks/useLocalStorage.js';
import foods from '../data/foods.js';

const WishlistContext = createContext(null);

export function WishlistProvider({ children }) {
  const [ids, setIds] = useLocalStorage('foodai_wishlist', []);

  const isWished = (id) => ids.includes(id);
  const toggleWishlist = (id) => setIds((prev) => (prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]));
  const removeFromWishlist = (id) => setIds((prev) => prev.filter((x) => x !== id));
  const items = useMemo(() => ids.map((id) => foods.find((f) => f.id === id)).filter(Boolean), [ids]);

  return (
    <WishlistContext.Provider value={{ items, count: items.length, isWished, toggleWishlist, removeFromWishlist }}>
      {children}
    </WishlistContext.Provider>
  );
}

export const useWishlist = () => useContext(WishlistContext);
