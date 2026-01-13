import { test, expect } from '@playwright/test';

/**
 * Two assertion categories you should care about:
  1. Hard Assertions: Fail fast, stop execution.
  2. Soft Assertions: Collect failures, report at the end
 */

test('Verify web element properties using Playwright assertions', async ({ page }) => {

  await page.goto('http://zero.webappsecurity.com/login.html');

  const usernameInput = page.locator('#user_login');
  const passwordInput = page.locator('#user_password');
  const signInButton = page.locator('input[name="submit"]');
  const rememberMeCheckbox = page.locator('#user_remember_me');

  // Visibility Assertions
  await expect(usernameInput).toBeVisible();
  await expect(passwordInput).toBeVisible();
  await expect(signInButton).toBeVisible();

  // Enabled / Disabled State
  await expect(usernameInput).toBeEnabled();
  await expect(passwordInput).toBeEnabled();
  await expect(signInButton).toBeEnabled();

  // Attribute Assertions
  await expect(usernameInput).toHaveAttribute('type', 'text');
  await expect(passwordInput).toHaveAttribute('type', 'password');
  await expect(signInButton).toHaveValue('Sign in');

  // Checkbox State
  await expect(rememberMeCheckbox).not.toBeChecked();
});


test('Soft assertions for element verification', async ({ page }) => {

  await page.goto('http://zero.webappsecurity.com/login.html');

  await expect.soft(page.locator('#user_login')).toBeVisible();
  await expect.soft(page.locator('#user_password')).toBeVisible();
//   await page.locator('#user_remember_me');
  await expect.soft(page.locator('#user_remember_me')).toBeChecked();

  await expect.soft(page.locator('#user_login')).toBeVisible();
  await expect.soft(page.locator('#user_password')).toBeVisible();
  

});
