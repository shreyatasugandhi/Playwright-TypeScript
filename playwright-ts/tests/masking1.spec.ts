import { test, expect } from '@playwright/test';

test.describe('Visual masking of dynamic elements', () => {

  test('Mask multiple dynamic elements', async ({ page }) => {

    await page.goto('https://the-internet.herokuapp.com/dynamic_content');

    const content = page.locator('#content').first();

    await expect(content).toHaveScreenshot(
      'dynamic-content-multiple-masked.png',
      {
        mask: [
          content.locator('img'),
          content.locator('div[style*="float:right"]')
        ]
      }
    );
  });

  test('Mask only timestamp or dynamic text', async ({ page }) => {

    await page.goto('https://the-internet.herokuapp.com/dynamic_content');

    const content = page.locator('#content').first();

    await expect(content).toHaveScreenshot(
      'dynamic-content-text-masked.png',
      {
        mask: [
          content.locator('span')
        ]
      }
    );
  });

  test('Mask dynamic images only', async ({ page }) => {

    await page.goto('https://the-internet.herokuapp.com/dynamic_content');

    const content = page.locator('#content').first();

    await expect(content).toHaveScreenshot(
      'dynamic-content-images-masked.png',
      {
        mask: [
          content.locator('img')
        ]
      }
    );
  });

  test('Mask entire dynamic sidebar/banner', async ({ page }) => {

    await page.goto('https://the-internet.herokuapp.com/dynamic_content');

    const content = page.locator('#content').first();
    const sidebar = content.locator('div[style*="float:right"]');

    await expect(content).toHaveScreenshot(
      'dynamic-content-sidebar-masked.png',
      {
        mask: [sidebar]
      }
    );
  });

  test('Anonymous snapshot with masked dynamic elements', async ({ page }) => {

    await page.goto('https://the-internet.herokuapp.com/dynamic_content');

    const content = page.locator('#content').first();

    await expect(content).toHaveScreenshot({
      mask: [
        content.locator('img'),
        content.locator('div[style*="float:right"]')
      ]
    });
  });

});
