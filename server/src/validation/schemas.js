import { z } from "zod";

/**
 * Server-side validation schemas (Zod). Mirrors the client rules so the API
 * enforces them regardless of what the client sends.
 */

// Product/search query params.
export const productQuerySchema = z.object({
  category: z
    .string()
    .max(40)
    .regex(/^[a-z0-9-]*$/i)
    .optional(),
  search: z
    .string()
    .max(80)
    .regex(/^[a-zA-Z0-9 .,'&-]*$/, "Invalid characters in search")
    .optional(),
  sort: z.enum(["", "price-asc", "price-desc", "rating"]).optional(),
});

export const productIdSchema = z.object({
  id: z
    .string()
    .max(40)
    .regex(/^[a-z0-9-]+$/i, "Invalid product id"),
});

// Cart payloads.
export const addItemSchema = z.object({
  productId: z
    .string()
    .max(40)
    .regex(/^[a-z0-9-]+$/i, "Invalid product id"),
  quantity: z.coerce.number().int().min(1).max(10).default(1),
});

export const updateItemSchema = z.object({
  quantity: z.coerce.number().int().min(0).max(10),
});

export const cartParamsSchema = z.object({
  productId: z
    .string()
    .max(40)
    .regex(/^[a-z0-9-]+$/i, "Invalid product id"),
});
