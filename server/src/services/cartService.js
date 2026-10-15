import { catalogService } from "./catalogService.js";

/**
 * Cart service — an in-memory cart keyed by a client-supplied cart id.
 * Stateless-friendly for a small demo; swap the Map for a store in production.
 */
const carts = new Map();

function getOrCreate(cartId) {
  if (!carts.has(cartId)) carts.set(cartId, new Map());
  return carts.get(cartId);
}

function serialize(cartId) {
  const items = getOrCreate(cartId);
  const lines = [];
  let subtotal = 0;
  let count = 0;

  for (const [productId, qty] of items.entries()) {
    const product = catalogService.getProductById(productId);
    if (!product) continue;
    const lineTotal = product.price * qty;
    subtotal += lineTotal;
    count += qty;
    lines.push({ product, quantity: qty, lineTotal: Number(lineTotal.toFixed(2)) });
  }

  return {
    cartId,
    items: lines,
    count,
    subtotal: Number(subtotal.toFixed(2)),
  };
}

export const cartService = {
  getCart(cartId) {
    return serialize(cartId);
  },

  addItem(cartId, productId, quantity = 1) {
    const product = catalogService.getProductById(productId);
    if (!product) return { error: "PRODUCT_NOT_FOUND" };
    const items = getOrCreate(cartId);
    items.set(productId, (items.get(productId) || 0) + quantity);
    return serialize(cartId);
  },

  updateItem(cartId, productId, quantity) {
    const items = getOrCreate(cartId);
    if (quantity <= 0) items.delete(productId);
    else items.set(productId, quantity);
    return serialize(cartId);
  },

  removeItem(cartId, productId) {
    getOrCreate(cartId).delete(productId);
    return serialize(cartId);
  },
};
