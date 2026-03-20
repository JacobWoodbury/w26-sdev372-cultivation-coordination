import { describe, test, expect, vi } from "vitest";
import request from "supertest";

// mock the database BEFORE importing app
vi.mock("../connection.js", () => ({
  default: {
    query: vi.fn()
  }
}));

import pool from "../connection.js";
import app from "../server.js";

test("GET /api/plants returns 200 and plant list", async () => {
  pool.query.mockResolvedValue([
    [
      { id: 1, common_name: "Tomato", scientific_name: "S. lycopersicum", perenual_id: 1 },
      { id: 2, common_name: "Carrot", scientific_name: "D. carota", perenual_id: 2 }
    ]
  ]);

  const res = await request(app).get("/api/plants");

  expect(res.statusCode).toBe(200);
  expect(Array.isArray(res.body)).toBe(true);
  expect(res.body.length).toBe(2);
  expect(res.body[0]).toHaveProperty("common_name");
  expect(res.body[0]).toHaveProperty("perenual_id");
});

test("GET /api/plants returns 500 on database error", async () => {
  pool.query.mockRejectedValue(new Error("DB failure"));

  const res = await request(app).get("/api/plants");

  expect(res.statusCode).toBe(500);
  expect(res.body).toHaveProperty("message");
});