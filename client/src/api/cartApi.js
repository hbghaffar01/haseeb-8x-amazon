import { httpClient } from "./httpClient.js";

/** All cart-related HTTP calls live here. */
export const cartApi = {
  getCart: () => httpClient.get("/cart"),
  addItem: (productId, quantity = 1) =>
    httpClient.post("/cart/items", { productId, quantity }),
  updateItem: (productId, quantity) =>
    httpClient.patch(`/cart/items/${productId}`, { quantity }),
  removeItem: (productId) => httpClient.delete(`/cart/items/${productId}`),
};
