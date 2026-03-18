import '@testing-library/jest-dom'

// Minimal fetch mock for unit tests.
// This prevents components from trying to hit real /api endpoints under Vitest.
import { vi } from "vitest";

function jsonResponse(data, ok = true, status = 200) {
  return {
    ok,
    status,
    json: async () => data,
  };
}

vi.stubGlobal("fetch", vi.fn(async (input, init) => {
  const url = String(input);
  const method = (init?.method ?? "GET").toUpperCase();

  // Plants list used by Seeds/Search
  if (url.includes("/api/plants") && method === "GET") {
    return jsonResponse([]);
  }

  // Plots
  if (url.includes("/api/plots") && method === "GET") {
    return jsonResponse([]);
  }

  if (url.includes("/api/plots") && method === "POST") {
    const body = init?.body ? JSON.parse(String(init.body)) : {};
    // Simulate DB assigning id=1 when creating (no id provided)
    const id = body.id ?? 1;
    return jsonResponse({ ...body, id }, true, body.id ? 200 : 201);
  }

  if (url.match(/\/api\/plots\/\d+$/) && method === "DELETE") {
    const id = Number(url.split("/").pop());
    return jsonResponse({ ok: true, id });
  }

  return jsonResponse({ error: "unmocked fetch", url, method }, false, 500);
}));