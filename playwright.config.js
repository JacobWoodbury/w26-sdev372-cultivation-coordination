import { defineConfig } from '@playwright/test';

export default defineConfig({
  testDir: './playwright-tests',

  use: {
    baseURL: 'http://127.0.0.1:4173',
    headless: true
  },

  timeout: 30000,
  retries: 1,

  webServer: {
    command: 'npm run dev -- --host 0.0.0.0 --port 4173',
    url: 'http://127.0.0.1:4173',
    reuseExistingServer: !process.env.CI
  }
});