import { describe, test, expect, beforeAll, afterAll } from "vitest";
import request from "supertest";
import app from "../../server.js";
import pool from "../../connection.js";

 // waiting for the DB connection
 //added in three advanced functions we can change if needed
beforeAll(async () => {
  await pool.query("SELECT 1");
});

afterAll(async () => {
  await pool.end();
});

describe("Plot API Integration Tests", () => {

  test("POST /api/plots creates a plot", async () => {
    const res = await request(app)
      .post("/api/plots")
      .send({
        name: "Integration Plot",
        description: "Integration Test",
        length: 2,
        width: 2
      });

    expect(res.statusCode).toBe(201);
    expect(res.body).toHaveProperty("id");
  });

  test("GET /api/plots returns plots from DB", async () => {
    const res = await request(app).get("/api/plots");

    expect(res.statusCode).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
  });

  test("GET /api/plants returns seeded plants", async () => {
    const res = await request(app).get("/api/plants");

    expect(res.statusCode).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
  });

});