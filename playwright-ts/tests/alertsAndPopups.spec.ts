import { test, expect } from '@playwright/test';

test('Handle JavaScript Alert', async ({ page }) => {

  await page.goto('https://the-internet.herokuapp.com/javascript_alerts');

  page.on('dialog', async dialog => {
    expect(dialog.type()).toBe('alert');
    expect(dialog.message()).toBe('I am a JS Alert');
    await dialog.accept();
  });

  await page.locator('button:has-text("Click for JS Alert")').click();

  await expect(page.locator('#result'))
    .toHaveText('You successfully clicked an alert');
});


test('Handle JavaScript Confirm - Accept', async ({ page }) => {

  await page.goto('https://the-internet.herokuapp.com/javascript_alerts');

  page.on('dialog', async dialog => {
    expect(dialog.type()).toBe('confirm');
    expect(dialog.message()).toBe('I am a JS Confirm');
    await dialog.accept();
  });

  await page.locator('button:has-text("Click for JS Confirm")').click();

  await expect(page.locator('#result'))
    .toHaveText('You clicked: Ok');
});


test('Handle JavaScript Confirm - Dismiss', async ({ page }) => {

  await page.goto('https://the-internet.herokuapp.com/javascript_alerts');

  page.on('dialog', async dialog => {
    await dialog.dismiss();
  });

  await page.locator('button:has-text("Click for JS Confirm")').click();

  await expect(page.locator('#result'))
    .toHaveText('You clicked: Cancel');
});

test('Handle JavaScript Prompt', async ({ page }) => {

  await page.goto('https://the-internet.herokuapp.com/javascript_alerts');

  page.on('dialog', async dialog => {
    expect(dialog.type()).toBe('prompt');
    expect(dialog.message()).toBe('I am a JS prompt');
    await dialog.accept('Playwright QE');
  });

  await page.locator('button:has-text("Click for JS Prompt")').click();

  await expect(page.locator('#result'))
    .toHaveText('You entered: Playwright QE');
});
