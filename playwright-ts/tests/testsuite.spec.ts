import { test, expect } from '@playwright/test';

/**
 * Demo script for:
 * - Test suites and nested suites
 * - Test cases
 * - All hooks (beforeAll, afterAll, beforeEach, afterEach)
 * - Test annotations as tags
 */

test.describe('User Authentication Suite', () => {

  // Hook: runs once before all tests in this suite
  test.beforeAll(async () => {
    console.log('Setup before all tests: e.g., global preconditions');
  });

  // Hook: runs once after all tests in this suite
  test.afterAll(async () => {
    console.log('Cleanup after all tests: e.g., release resources');
  });

  // Hook: runs before each test case
  test.beforeEach(async ({ page }) => {
    console.log('Before each test: navigating to login page');
    await page.goto('https://the-internet.herokuapp.com/login');
  });

  // Hook: runs after each test case
  test.afterEach(async ({ page }) => {
    console.log('After each test: taking screenshot for debugging');
    await page.screenshot({ path: `screenshots/${Date.now()}.png` });
  });

  // ----------------- Test Cases -----------------

  test('Valid user login', async ({ page }, testInfo) => {
    // Adding annotation for smoke test
    testInfo.annotations.push({ type: 'tag', description: 'smoke' });

    console.log('This is Valid user login TEST')

    await page.fill('#username', 'tomsmith');
    await page.fill('#password', 'SuperSecretPassword!');
    await page.click('button[type="submit"]');
    await expect(page.locator('#flash')).toContainText('You logged into a secure area!');
  });

  test('Invalid user login', async ({ page }, testInfo) => {
    // Adding annotation for regression test
    testInfo.annotations.push({ type: 'tag', description: 'regression' });

    console.log('This is Invalid user login TEST')

    await page.fill('#username', 'wronguser');
    await page.fill('#password', 'wrongpass');
    await page.click('button[type="submit"]');
    await expect(page.locator('#flash')).toContainText('Your username is invalid!');
  });

  // ----------------- Nested Suite -----------------
  test.describe('Password Reset Scenarios', () => {

    test.beforeEach(async ({ page }) => {
      console.log('Navigating to forgot password page before each test');
      await page.goto('https://the-internet.herokuapp.com/forgot_password');
    });

    test('Reset password for valid email', async ({ page }, testInfo) => {
      testInfo.annotations.push({ type: 'tag', description: 'smoke' });

      console.log('This is nested Password Reset Test')

      await page.fill('#email', 'user@example.com');
      await page.click('#form_submit');
      await expect(page.locator('#content')).toContainText('Your e-mail\'s been sent!');
    });

    test('Reset password with invalid email', async ({ page }, testInfo) => {
      testInfo.annotations.push({ type: 'tag', description: 'regression' });
        
      console.log('This is nested Password Reset with invalid email Test')
      
      await page.fill('#email', 'invalid@example.com');
      await page.click('#form_submit');
      await expect(page.locator('#content')).toContainText('Your e-mail\'s been sent!');
    });

  });

});
