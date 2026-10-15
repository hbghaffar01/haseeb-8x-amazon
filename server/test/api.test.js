import { describe, it, expect, beforeAll } from "vitest";
import request from "supertest";
import { createApp } from "../src/app.js";

const app = createApp();

describe("Catalog API", () => {
  it("GET /api/health returns ok", async () => {
    const res = await request(app).get("/api/health");
    expect(res.status).toBe(200);
    expect(res.body).toEqual({ status: "ok" });
  });

  it("GET /api/categories returns categories", async () => {
    const res = await request(app).get("/api/categories");
    expect(res.status).toBe(200);
    expect(Array.isArray(res.body.data)).toBe(true);
    expect(res.body.data.length).toBeGreaterThan(0);
  });

  it("GET /api/products returns products with a count", async () => {
    const res = await request(app).get("/api/products");
    expect(res.status).toBe(200);
    expect(res.body.count).toBe(res.body.data.length);
  });

  it("GET /api/products?sort=price-asc sorts ascending", async () => {
    const res = await request(app).get("/api/products?sort=price-asc");
    const prices = res.body.data.map((p) => p.price);
    const sorted = [...prices].sort((a, b) => a - b);
    expect(prices).toEqual(sorted);
  });

  it("rejects an invalid sort value with 400", async () => {
    const res = await request(app).get("/api/products?sort=hack");
    expect(res.status).toBe(400);
  });

  it("rejects injection-style search input with 400", async () => {
    const res = await request(app).get("/api/products?search=<script>");
    expect(res.status).toBe(400);
  });

  it("returns 404 for an unknown product", async () => {
    const res = await request(app).get("/api/products/does-not-exist");
    expect(res.status).toBe(404);
  });
});

describe("Cart API", () => {
  const cartId = "vitest-cart";
  const headers = { "x-cart-id": cartId };

  it("adds an item and returns the cart", async () => {
    const res = await request(app)
      .post("/api/cart/items")
      .set(headers)
      .send({ productId: "p1", quantity: 2 });
    expect(res.status).toBe(201);
    expect(res.body.data.count).toBeGreaterThanOrEqual(2);
  });

  it("rejects quantity above the max with 400", async () => {
    const res = await request(app)
      .post("/api/cart/items")
      .set(headers)
      .send({ productId: "p1", quantity: 999 });
    expect(res.status).toBe(400);
  });

  it("rejects an invalid product id with 400", async () => {
    const res = await request(app)
      .post("/api/cart/items")
      .set(headers)
      .send({ productId: "../etc", quantity: 1 });
    expect(res.status).toBe(400);
  });

  it("removes an item", async () => {
    await request(app)
      .post("/api/cart/items")
      .set(headers)
      .send({ productId: "p2", quantity: 1 });
    const res = await request(app)
      .delete("/api/cart/items/p2")
      .set(headers);
    expect(res.status).toBe(200);
  });
});
