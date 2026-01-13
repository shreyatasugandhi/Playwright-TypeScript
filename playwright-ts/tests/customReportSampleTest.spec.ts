import { test, expect } from '@playwright/test';

test.describe('Sample Suite', () => {
  test('Passing test', async ({ page }) => {
    await page.goto('https://playwright.dev');
    await expect(page).toHaveTitle(/Playwright/);
  });

  test('Failing test', async ({ page }) => {
    await page.goto('https://example.com');
    await expect(page.locator('h2')).toContainText('Nonexistent Text');
  });
});
