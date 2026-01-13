import { test, expect } from '@playwright/test';

/**
 * What it is:
 * Image validation compares the current state of a UI element or page
 * against a baseline image to detect visual regressions.
 *
 * Why needed:
 * Ensures UI consistency across releases, catching unintended changes
 * in layout, styling, or dynamic content, which functional tests may miss.
 */

// Run this script twice to get the correct output of comparison

test('Image validation of dynamic content', async ({ page }) => {

  await page.goto('https://the-internet.herokuapp.com/dynamic_content');

  // Scope to a single deterministic container to avoid strict mode issues
  const contentSection = page.locator('#content').first();

  // Perform image validation by taking a screenshot and comparing it
  // On first execution, Playwright creates the baseline snapshot automatically
  await expect(contentSection).toHaveScreenshot(
    'image-validation.png',
    {
      // Mask dynamic elements to avoid false failures
      mask: [
        contentSection.locator('img'),
        contentSection.locator('.large-10.columns')
      ],

      // Disable animations for consistent screenshots
      animations: 'disabled',

      // Allow minor pixel differences to prevent false positives
      maxDiffPixelRatio: 0.02
    }
  );

});
