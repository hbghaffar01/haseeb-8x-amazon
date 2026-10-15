import { describe, it, expect } from "vitest";
import { formatPrice } from "./format.js";

describe("formatPrice", () => {
  it("formats a number as USD currency", () => {
    expect(formatPrice(49.99)).toBe("$49.99");
  });

  it("formats whole numbers with cents", () => {
    expect(formatPrice(199)).toBe("$199.00");
  });

  it("adds thousands separators", () => {
    expect(formatPrice(1234.5)).toBe("$1,234.50");
  });
});
