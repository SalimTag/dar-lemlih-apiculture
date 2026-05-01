import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
  testDir: './src/tests/e2e',
  timeout: 60_000,
  retries: 0,
  use: {
    baseURL: process.env.PLAYWRIGHT_BASE_URL ?? 'http://localhost:5173',
    headless: true,
    trace: 'on-first-retry',
    locale: 'fr-FR'
  },
  projects: [{ name: 'chromium', use: { ...devices['Desktop Chrome'] } }]
});
