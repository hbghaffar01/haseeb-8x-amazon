import { cartService } from "../services/cartService.js";

/**
 * The cart id is taken from the `x-cart-id` header (sent by the client).
 * Keeps carts isolated per browser without requiring auth for the demo.
 */
function cartId(req) {
  return req.header("x-cart-id") || "anonymous";
}

export const cartController = {
  getCart(req, res) {
    res.json({ data: cartService.getCart(cartId(req)) });
  },

  addItem(req, res) {
    const { productId, quantity } = req.validated.body;
    const result = cartService.addItem(cartId(req), productId, quantity);
    if (result.error) {
      return res.status(404).json({ error: "Product not found" });
    }
    res.status(201).json({ data: result });
  },

  updateItem(req, res) {
    const { productId } = req.validated.params;
    const { quantity } = req.validated.body;
    const result = cartService.updateItem(cartId(req), productId, quantity);
    res.json({ data: result });
  },

  removeItem(req, res) {
    const { productId } = req.validated.params;
    const result = cartService.removeItem(cartId(req), productId);
    res.json({ data: result });
  },
};
