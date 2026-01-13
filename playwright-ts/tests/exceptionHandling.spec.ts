import { test, expect, Page } from '@playwright/test';

/**
 * What it is:
 * Error & exception handling ensures that unexpected runtime issues
 * like element not found, network failures, or test flakiness are caught
 * and handled gracefully.
 *
 * Why needed:
 * Improves test reliability, provides meaningful logs, supports retries,
 * and allows controlled failure handling instead of abrupt test termination.
 */

// Custom error handler function
const handleError = async (error: Error, page: Page) => {
  console.error('Custom Error Handler:', error.message);
  // Capture screenshot on failure for analysis
  await page.screenshot({ path: 'error-screenshot.png' });
};

// Retry logic wrapper
const retry = async (fn: () => Promise<void>, attempts = 3) => {
  for (let i = 0; i < attempts; i++) {
    try {
      await fn();
      return; // Success, exit retry loop
    } catch (err) {
      if (i === attempts - 1) throw err; // Last attempt, propagate
      console.warn(`Retry attempt ${i + 1} failed, retrying...`);
    }
  }
};

test.describe('Error & Exception Handling Demo', () => {

  // Playwright Test Hook: beforeEach
  test.beforeEach(async ({ page }) => {
    await page.goto('https://the-internet.herokuapp.com/dynamic_content');
  });

  // Playwright Test Hook: afterEach
  test.afterEach(async ({ page }, testInfo) => {
    if (testInfo.status !== testInfo.expectedStatus) {
      console.warn(`Test failed: ${testInfo.title}`);
      await page.screenshot({ path: 'afterEach-failure.png' });
    }
  });

  test('Try-Catch, Event Handling, Custom Error, Retry Demo', async ({ page }) => {

    // Event Handling: Listen to console messages and page errors
    page.on('console', msg => console.log('Console log:', msg.text()));
    page.on('pageerror', err => console.error('Page error:', err));

    // Retry logic wrapping main test actions
    await retry(async () => {

      try {
        // Example dynamic element that may not exist
        const contentSection = page.locator('#nonexistent-element');

        // Expected behavior: this will fail because the element does not exist
        // The failure is intentional to demonstrate error handling and retry
        await expect(contentSection).toHaveText('Some Text', { timeout: 2000 });

      } catch (error) {
        // Custom error handling
        await handleError(error as Error, page);

        // Optional rethrow to mark the test as failed after handling
        throw error;
      }

    }, 2); // Retry twice in case of transient failures

  });

});
