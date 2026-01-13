import { test, expect } from '@playwright/test';

test('Mask dynamic elements - baseline snapshot creation', async ({ page }) => {

  await page.goto('https://the-internet.herokuapp.com/dynamic_content');

  const contentSection = page.locator('#content').first();

  await expect(contentSection).toHaveScreenshot(
    'dynamic-content-masked.png',
    {
      mask: [
        contentSection.locator('img'),
        contentSection.locator('.large-10.columns')
      ],
      animations: 'disabled'
    }
  );

});
