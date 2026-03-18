import { defineConfig } from "vitest/config";

export default defineConfig({
  test: {
    include: ["tests/getPlants.test.js", "tests/integration/integration.test.js"],
    exclude: ["node_modules/**"]
  }
});

