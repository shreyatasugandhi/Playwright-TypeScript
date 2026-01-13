import { test, expect } from '@playwright/test';

test('Visual snapshot of homepage', async ({ page }) => {

  await page.goto('https://the-internet.herokuapp.com/');

  // Take snapshot of full page
  await expect(page).toHaveScreenshot('homepage.png', { fullPage: true });

  // Take snapshot of a specific element
  const heading = page.locator('h1');
  await expect(heading).toHaveScreenshot('homepage-heading.png');
});

test('Header visual test across browsers', async ({ page }) => {
  await page.goto('https://the-internet.herokuapp.com/');
  const header = page.locator('h1');

  // Each browser will generate a separate snapshot automatically
  await expect(header).toHaveScreenshot(`header-${process.env.PW_PROJECT}.png`);
});
