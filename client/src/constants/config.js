/**
 * App-wide constants. All environment-derived values are read here once, so no
 * other module touches import.meta.env directly (DRY + single source of truth).
 */
export const API_BASE_URL =
  import.meta.env.VITE_API_BASE_URL || "http://localhost:4000/api";

export const BRAND = {
  name: "amazon",
  tagline: "rebuild",
};

export const SORT_OPTIONS = [
  { value: "", label: "Featured" },
  { value: "price-asc", label: "Price: Low to High" },
  { value: "price-desc", label: "Price: High to Low" },
  { value: "rating", label: "Avg. Customer Review" },
];

// Stable per-browser cart id so the server can isolate carts without auth.
export const CART_ID_KEY = "amazon_rebuild_cart_id";
