import { test, expect } from '@playwright/test';

test('Mouse actions example', async ({ page }) => {

  await page.goto('https://the-internet.herokuapp.com/hovers');

  // Hover over the first avatar
  const avatar = page.locator('.figure').first();
  await avatar.hover();

  // Validate caption appears on hover
  await expect(avatar.locator('.figcaption')).toBeVisible();

  // Navigate to drag-and-drop page
  await page.goto('https://the-internet.herokuapp.com/drag_and_drop');

  const columnA = page.locator('#column-a');
  const columnB = page.locator('#column-b');

  // Drag A and drop onto B
  await columnA.dragTo(columnB);

  // Validate column headers swapped
  await expect(columnA.locator('header')).toHaveText('B');
  await expect(columnB.locator('header')).toHaveText('A');
});

test('Keyboard actions example', async ({ page }) => {

  await page.goto('https://the-internet.herokuapp.com/login');

  const username = page.locator('#username');
  const password = page.locator('#password');

  // Type text normally
  await username.fill('tomsmith');
  await password.fill('SuperSecretPassword!');

  // Press Tab to move focus from username to password
  await username.press('Tab');

  // Clear password field using keyboard
  await password.focus();
  await password.press('Control+A'); // Select all text
  await password.press('Backspace'); // Delete

  // Type new password
  await password.fill('MyNewPassword');

  // Simulate Enter key to submit form
  await password.press('Enter');

  // Validate login failure (because password is wrong)
  await expect(page.locator('#flash')).toContainText('Your password is invalid!');
});
