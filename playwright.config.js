import { defineConfig } from '@playwright/test';

export default defineConfig({
  testDir: './playwright-tests',

  use: {
    baseURL: 'http://localhost',
    headless: true
  },

  timeout: 30000,
  retries: 1
});