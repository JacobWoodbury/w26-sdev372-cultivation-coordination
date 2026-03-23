import { defineConfig } from '@playwright/test';

export default defineConfig({
  testDir: './playwright-tests',

  use: {
    baseURL: 'http://localhost:5173',
    headless: true
  },

  timeout: 30000,
  retries: 1,

  
  webServer: [
    {
      command: 'npm run start',
      cwd: './server',
      port: 3000,
      timeout: 120_000,
      reuseExistingServer: !process.env.CI
    },
    {
      command: 'npx vite',
      url: 'http://localhost:5173',
      timeout: 120_000,
      reuseExistingServer: !process.env.CI
    }
  ]
});
