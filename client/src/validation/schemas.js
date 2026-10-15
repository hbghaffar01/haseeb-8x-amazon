import { z } from "zod";

/**
 * Shared client-side validation schemas (Zod). Centralized so UI and API layers
 * validate against the same rules (DRY).
 */

// Search: letters, numbers, spaces and a few safe punctuation marks only.
// Blocks angle brackets / quotes / backslashes to avoid injection-style input.
export const searchSchema = z
  .string()
  .max(80, "Search is too long")
  .regex(/^[a-zA-Z0-9 .,'&-]*$/, "Only letters, numbers and spaces allowed");

// Quantity: integer 1..10.
export const quantitySchema = z
  .number()
  .int("Quantity must be a whole number")
  .min(1, "Minimum quantity is 1")
  .max(10, "Maximum quantity is 10");

// Generic plain-text field.
export const textSchema = z
  .string()
  .max(120)
  .regex(/^[a-zA-Z0-9 .,'&-]*$/, "Only letters and numbers allowed");

/** Allowed input "kinds" for the sanitizing Input component. */
export const INPUT_KINDS = {
  TEXT: "text",
  NUMBER: "number",
};

/**
 * Strip characters not allowed for a given kind as the user types.
 * - text: keep letters, numbers, spaces, safe punctuation
 * - number: keep digits only
 */
export function sanitizeByKind(value, kind) {
  if (kind === INPUT_KINDS.NUMBER) {
    return value.replace(/[^0-9]/g, "");
  }
  // default: text
  return value.replace(/[^a-zA-Z0-9 .,'&-]/g, "");
}
