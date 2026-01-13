import { test, expect } from '@playwright/test';

test('Verify Playwright home page title', async ({ page }) => {
  await page.goto('https://playwright.dev');
  await expect(page).toHaveTitle(/Playwright/);
});
