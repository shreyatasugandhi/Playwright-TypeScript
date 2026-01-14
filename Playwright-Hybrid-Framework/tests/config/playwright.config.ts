import { defineConfig } from '@playwright/test';

export default defineConfig({
  timeout: 60000,

  expect: {
    timeout: 5000
  },

  use: {
    baseURL: process.env.BASE_URL || 'http://zero.webappsecurity.com',
    headless: true,
    viewport: { width: 1280, height: 720 },
    ignoreHTTPSErrors: true,
    actionTimeout: 15000,
    trace: 'on-first-retry',
    screenshot: 'only-on-failure',
    video: 'retain-on-failure'
  },

  reporter: [
    ['html', { outputFolder: 'tests/test-results/reports', open: 'never' }]
  ]
});
