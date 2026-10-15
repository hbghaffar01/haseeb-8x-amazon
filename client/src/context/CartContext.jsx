import { createContext, useContext, useEffect, useState, useCallback } from "react";
import { cartApi } from "../api/cartApi.js";

const CartContext = createContext(null);

/**
 * Centralized cart state. Wraps the cart API so components never call it
 * directly and the cart stays in sync across the app.
 */
export function CartProvider({ children }) {
  const [cart, setCart] = useState({ items: [], count: 0, subtotal: 0 });
  const [loading, setLoading] = useState(false);

  const refresh = useCallback(async () => {
    try {
      const { data } = await cartApi.getCart();
      setCart(data);
    } catch (err) {
      // non-fatal; keep last known cart
      console.error("Failed to load cart", err);
    }
  }, []);

  useEffect(() => {
    refresh();
  }, [refresh]);

  const addItem = useCallback(async (productId, quantity = 1) => {
    setLoading(true);
    try {
      const { data } = await cartApi.addItem(productId, quantity);
      setCart(data);
    } finally {
      setLoading(false);
    }
  }, []);

  const updateItem = useCallback(async (productId, quantity) => {
    const { data } = await cartApi.updateItem(productId, quantity);
    setCart(data);
  }, []);

  const removeItem = useCallback(async (productId) => {
    const { data } = await cartApi.removeItem(productId);
    setCart(data);
  }, []);

  const value = { cart, loading, addItem, updateItem, removeItem, refresh };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used within a CartProvider");
  return ctx;
}
