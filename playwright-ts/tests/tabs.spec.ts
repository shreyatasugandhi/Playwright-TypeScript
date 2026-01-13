import { test, expect } from '@playwright/test';

test('Handle multiple tabs - single new tab', async ({ page, context }) => {

  await page.goto('https://the-internet.herokuapp.com/windows');

  // Wait for new tab while clicking the link
  const [newTab] = await Promise.all([
    context.waitForEvent('page'),
    page.locator('a[href="/windows/new"]').click()
  ]);

  // Ensure new tab is fully loaded
  await newTab.waitForLoadState();

  // Validate content in new tab
  await expect(newTab.locator('h3'))
    .toHaveText('New Window');

  // Close new tab
  await newTab.close();

  // Validate focus remains on original page
  await expect(page.locator('h3'))
    .toHaveText('Opening a new window');
});


test('Switch focus to new tab and continue actions', async ({ page, context }) => {

  await page.goto('https://the-internet.herokuapp.com/windows');

  const [newTab] = await Promise.all([
    context.waitForEvent('page'),
    page.locator('a', { hasText: 'Click Here' }).click()
  ]);

  await newTab.waitForLoadState();

  await expect(newTab).toHaveURL(/windows\/new/);
  await expect(newTab.locator('h3')).toBeVisible();
});

test('Handle multiple tabs sequentially', async ({ page, context }) => {

  await page.goto('https://the-internet.herokuapp.com/windows');

  for (let i = 0; i < 2; i++) {

    const [newTab] = await Promise.all([
      context.waitForEvent('page'),
      page.locator('a[href="/windows/new"]').click()
    ]);

    await newTab.waitForLoadState();
    await expect(newTab.locator('h3')).toHaveText('New Window');
    await newTab.close();
  }
});

test('Validate title and URL of new tab', async ({ page, context }) => {

  await page.goto('https://the-internet.herokuapp.com/windows');

  const [newTab] = await Promise.all([
    context.waitForEvent('page'),
    await page.locator('a', { hasText: 'Click Here' }).click()

  ]);

  await newTab.waitForLoadState();

  await expect(newTab).toHaveTitle('New Window');
  await expect(newTab).toHaveURL(/new/);
});
