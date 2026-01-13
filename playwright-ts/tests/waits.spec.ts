import { test, expect } from '@playwright/test';

/**
 * Assertion Strategy in Playwright

Playwright uses 
  1. auto-waiting, 
  2. retry-friendly assertions via expect.
This reduces flakiness and increases signal-to-noise ratio in test results.

 */



test.use({
    actionTimeout: 100000 //this will set the global timeout for all the tests in this file
})

test('Verify Playwright home page title', async ({ page }) => {
  await page.goto('http://zero.webappsecurity.com/index.html');


  // Playwright Default Timeout is 30 seconds or 30000 miliseconds
  page.setDefaultTimeout(15000)

  page.locator('id=signin_button').click({timeout: 5000})

});


test('Explicit wait for element to be visible', async ({ page }) => {

  await page.goto('http://zero.webappsecurity.com', { waitUntil: 'load' })


  const signInButton = page.locator('#signin_button')

  // Explicit wait
  await signInButton.waitFor({ state: 'visible', timeout: 10000 })

  await signInButton.click()

    await page.waitForURL('**/login.html', { timeout: 10000 })

})

