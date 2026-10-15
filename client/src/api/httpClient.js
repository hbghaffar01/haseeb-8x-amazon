import { API_BASE_URL, CART_ID_KEY } from "../constants/config.js";

/**
 * Thin fetch wrapper shared by every API module. Centralizes base URL, headers,
 * cart-id injection, JSON parsing, and error handling so individual endpoint
 * modules stay DRY.
 */
function getCartId() {
  let id = localStorage.getItem(CART_ID_KEY);
  if (!id) {
    id =
      typeof crypto !== "undefined" && crypto.randomUUID
        ? crypto.randomUUID()
        : `cart-${Date.now()}-${Math.random().toString(16).slice(2)}`;
    localStorage.setItem(CART_ID_KEY, id);
  }
  return id;
}

async function request(path, { method = "GET", body, query } = {}) {
  const url = new URL(`${API_BASE_URL}${path}`);
  if (query) {
    Object.entries(query).forEach(([k, v]) => {
      if (v !== undefined && v !== null && v !== "") url.searchParams.set(k, v);
    });
  }

  const res = await fetch(url.toString(), {
    method,
    headers: {
      "Content-Type": "application/json",
      "x-cart-id": getCartId(),
    },
    body: body ? JSON.stringify(body) : undefined,
  });

  const payload = await res.json().catch(() => ({}));

  if (!res.ok) {
    throw new Error(payload.error || `Request failed (${res.status})`);
  }

  return payload;
}

export const httpClient = {
  get: (path, query) => request(path, { method: "GET", query }),
  post: (path, body) => request(path, { method: "POST", body }),
  patch: (path, body) => request(path, { method: "PATCH", body }),
  delete: (path) => request(path, { method: "DELETE" }),
};
