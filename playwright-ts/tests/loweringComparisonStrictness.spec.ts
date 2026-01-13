import { test, expect } from '@playwright/test';

/**
 * What it is:
 * Lowered screenshot comparison strictness allows minor pixel variations
 * during visual validation without failing the test.
 *
 * Why needed:
 * UI rendering can differ slightly across OS, browser versions, fonts,
 * and CI environments. This avoids false negatives while preserving
 * meaningful visual regression detection.
 */

test('Mask dynamic elements with lowered comparison strictness', async ({ page }) => {

  await page.goto('https://the-internet.herokuapp.com/dynamic_content');

  // Scope to a single deterministic container to avoid strict mode violations
  const contentSection = page.locator('#content').first();

  // Capture a masked screenshot with relaxed pixel comparison tolerance
  // First execution creates the baseline snapshot automatically
  await expect(contentSection).toHaveScreenshot(
    'dynamic-content-masked.png',
    {
      // Mask volatile elements that change across runs
      mask: [
        contentSection.locator('img'),
        contentSection.locator('.large-10.columns')
      ],

      // Freeze animations to stabilize visual output
      animations: 'disabled',

      // Permit small visual deltas caused by rendering differences
      maxDiffPixelRatio: 0.02
    }
  );

});
