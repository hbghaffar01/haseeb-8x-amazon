import { httpClient } from "./httpClient.js";

/** All catalog-related HTTP calls live here. */
export const catalogApi = {
  getCategories: () => httpClient.get("/categories"),
  getProducts: ({ category, search, sort } = {}) =>
    httpClient.get("/products", { category, search, sort }),
  getProduct: (id) => httpClient.get(`/products/${id}`),
};
