import { describe, test, expect, vi, beforeEach, afterEach } from "vitest";
import request from "supertest";

vi.mock("../connection.js", () => ({
  default: {
    query: vi.fn(),
  },
}));

import pool from "../connection.js";
import app from "../server.js";

describe("GET /api/plants/:id/details", () => {
  const originalKey = process.env.PERENUAL_API_KEY;

  beforeEach(() => {
    process.env.PERENUAL_API_KEY = "test-key";
    vi.stubGlobal(
      "fetch",
      vi.fn().mockResolvedValue({
        ok: true,
        status: 200,
        json: async () => ({
          common_name: "European Silver Fir",
          scientific_name: ["Abies alba"],
          default_image: {
            thumbnail: "https://perenual.com/storage/thumb.jpg",
          },
        }),
      })
    );
  });

  afterEach(() => {
    process.env.PERENUAL_API_KEY = originalKey;
    vi.unstubAllGlobals();
    vi.clearAllMocks();
  });

  test("returns thumbnail from Perenual response", async () => {
    pool.query.mockResolvedValue([
      [
        {
          id: 1,
          common_name: "Fir",
          scientific_name: "Abies",
          perenual_id: 99,
        },
      ],
    ]);

    const res = await request(app).get("/api/plants/1/details");

    expect(res.statusCode).toBe(200);
    expect(res.body.thumbnailUrl).toBe("https://perenual.com/storage/thumb.jpg");
    expect(res.body.id).toBe(1);
    expect(res.body.perenual_id).toBe(99);
  });

  test("422 when perenual_id is null", async () => {
    pool.query.mockResolvedValue([
      [
        {
          id: 2,
          common_name: "Legacy",
          scientific_name: "X",
          perenual_id: null,
        },
      ],
    ]);

    const res = await request(app).get("/api/plants/2/details");
    expect(res.statusCode).toBe(422);
  });
});
