import { products, categories } from "../data/products.js";

/**
 * Catalog service — in-memory reads from the mock catalog. No database: this is
 * a small, read-mostly app and a file/db store would not survive Vercel's
 * serverless filesystem anyway. HTTP-agnostic so controllers stay thin.
 */
export const catalogService = {
  getCategories() {
    return [...categories].sort((a, b) => a.name.localeCompare(b.name));
  },

  getProducts({ category, search, sort } = {}) {
    let result = [...products];

    if (category) result = result.filter((p) => p.category === category);

    if (search) {
      const q = search.toLowerCase();
      result = result.filter(
        (p) =>
          p.title.toLowerCase().includes(q) ||
          p.description.toLowerCase().includes(q)
      );
    }

    switch (sort) {
      case "price-asc":
        result.sort((a, b) => a.price - b.price);
        break;
      case "price-desc":
        result.sort((a, b) => b.price - a.price);
        break;
      case "rating":
        result.sort((a, b) => b.rating - a.rating);
        break;
      default:
        break;
    }

    return result;
  },

  getProductById(id) {
    return products.find((p) => p.id === id) || null;
  },
};
