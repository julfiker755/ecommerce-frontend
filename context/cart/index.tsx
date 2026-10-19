'use client';
import { createContext, useContext, useEffect, useMemo, useState } from 'react';
import { helpers } from '@/lib/helpers';

export interface CartItem {
  key: string;
  slug: string;
  name: string;
  image: string;
  price: number;
  quantity: number;
  color?: string;
  weight?: string;
}

interface CartContextValue {
  items: CartItem[];
  count: number;
  total: number;
  wishlist: string[];
  /** true once the saved cart has been loaded from storage */
  hydrated: boolean;
  addItem: (item: Omit<CartItem, 'key'>) => void;
  updateQuantity: (key: string, quantity: number) => void;
  removeItem: (key: string) => void;
  clearCart: () => void;
  toggleWishlist: (slug: string) => void;
}

const CART_KEY = '_cart_items';
const WISHLIST_KEY = '_wishlist';

const CartContext = createContext<CartContextValue | null>(null);

const readStorage = <T,>(key: string, fallback: T): T => {
  try {
    const raw = helpers.getAsycStorage(key);
    return raw ? (JSON.parse(raw) as T) : fallback;
  } catch {
    return fallback;
  }
};

const writeStorage = (key: string, value: unknown) => {
  try {
    helpers.setAsycStorage(key, JSON.stringify(value));
  } catch {
    // storage unavailable (private mode etc.) — cart still works in memory
  }
};

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);
  const [wishlist, setWishlist] = useState<string[]>([]);
  const [hydrated, setHydrated] = useState(false);

  // Load saved cart after mount (localStorage is not available on the server)
  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setItems(readStorage<CartItem[]>(CART_KEY, []));
    setWishlist(readStorage<string[]>(WISHLIST_KEY, []));
    setHydrated(true);
  }, []);

  useEffect(() => {
    if (hydrated) writeStorage(CART_KEY, items);
  }, [items, hydrated]);

  useEffect(() => {
    if (hydrated) writeStorage(WISHLIST_KEY, wishlist);
  }, [wishlist, hydrated]);

  const addItem = (item: Omit<CartItem, 'key'>) => {
    const key = [item.slug, item.color, item.weight].filter(Boolean).join('-');
    setItems((prev) => {
      const exists = prev.find((i) => i.key === key);
      if (exists) {
        return prev.map((i) =>
          i.key === key ? { ...i, quantity: i.quantity + item.quantity } : i
        );
      }
      return [...prev, { ...item, key }];
    });
  };

  const updateQuantity = (key: string, quantity: number) => {
    setItems((prev) =>
      prev.map((i) => (i.key === key ? { ...i, quantity: Math.max(1, quantity) } : i))
    );
  };

  const removeItem = (key: string) => {
    setItems((prev) => prev.filter((i) => i.key !== key));
  };

  const clearCart = () => setItems([]);

  const toggleWishlist = (slug: string) => {
    setWishlist((prev) =>
      prev.includes(slug) ? prev.filter((s) => s !== slug) : [...prev, slug]
    );
  };

  const value = useMemo(
    () => ({
      items,
      wishlist,
      hydrated,
      count: items.reduce((sum, i) => sum + i.quantity, 0),
      total: items.reduce((sum, i) => sum + i.price * i.quantity, 0),
      addItem,
      updateQuantity,
      removeItem,
      clearCart,
      toggleWishlist,
    }),
    [items, wishlist, hydrated]
  );

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error('useCart must be used within CartProvider');
  return ctx;
}
