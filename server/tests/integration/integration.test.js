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

  test("GET /api/plants returns seeded plants", async () => {
    const res = await request(app).get("/api/plants");

    expect(res.statusCode).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
  });

});