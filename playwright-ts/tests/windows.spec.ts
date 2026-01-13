import { test, expect } from '@playwright/test';

test('Handle child window (popup) and validate content', async ({ page, context }) => {

  await page.goto('https://the-internet.herokuapp.com/windows');

  // Define the text we expect in the child window
  const expectedText = 'New Window';

  // Listen for the new window while clicking the link
  const [childWindow] = await Promise.all([
    context.waitForEvent('page'), // waits for a new Page object (window/tab)
    page.locator('a[href="/windows/new"]').click() // triggers the new window
  ]);

  // Wait for the child window to load completely
  await childWindow.waitForLoadState();

  // Validate URL and content in the child window
  await expect(childWindow).toHaveURL(/\/windows\/new/);
  await expect(childWindow.locator('h3')).toHaveText(expectedText);

  // Optional: perform more actions in the child window
  // For example, check title or insert text into editable frames (if any)

  // Close the child window
  await childWindow.close();

  // Validate focus is back to original page
  await expect(page.locator('h3')).toHaveText('Opening a new window');
});




test('Handle child windows and switch back and forth', async ({ browser }) => {

  // Create a fresh browser context
  const context = await browser.newContext();

  // Open parent page
  const parentPage = await context.newPage();
  await parentPage.goto('https://the-internet.herokuapp.com/windows');

  // Validate parent window content
  await expect(parentPage.locator('h3')).toHaveText('Opening a new window');

  // Click link to open a new child window
  // Capture the child window using waitForEvent
  const [childPage] = await Promise.all([
    context.waitForEvent('page'),  // Wait for new page event
    parentPage.locator('a[href="/windows/new"]').click()  // Action that opens child window
  ]);

  // Wait for child page to load fully
  await childPage.waitForLoadState();

  // Validate child window content
  await expect(childPage.locator('h3')).toHaveText('New Window');

  // Switch back to parent (just use parentPage reference)
  await expect(parentPage.locator('h3')).toHaveText('Opening a new window');

  // Switch again to child (just use childPage reference)
  await expect(childPage.locator('h3')).toHaveText('New Window');

  // Close child window
  await childPage.close();

  // Validate child is closed
  expect(childPage.isClosed()).toBeTruthy();

  // Close parent window
  await parentPage.close();

  // Validate parent is closed
  expect(parentPage.isClosed()).toBeTruthy();
});


test('Handle child windows and switch between them', async ({ page, context }) => {

  // Go to the demo page
  await page.goto('https://the-internet.herokuapp.com/windows');

  // Save reference to parent window
  const parentPage = page;

  // Wait for the child window to open after clicking link
  const [childPage] = await Promise.all([
    context.waitForEvent('page'), // Playwright captures the new page automatically
    page.locator('a[href="/windows/new"]').click() // Click the link that opens new window
  ]);

  // Wait until child window is loaded
  await childPage.waitForLoadState();

  // --- Actions in child window ---
  await expect(childPage.locator('h3')).toHaveText('New Window');
  console.log('Child window URL:', childPage.url());

  // Insert text dynamically in child window for demonstration (if editable, here just a div)
  await childPage.evaluate(() => {
    const div = document.createElement('div');
    div.id = 'child-test';
    div.innerText = 'Inserted text in child window';
    document.body.appendChild(div);
  });

  await expect(childPage.locator('#child-test')).toHaveText('Inserted text in child window');

  // --- Switch back to parent window ---
  await expect(parentPage.locator('h3')).toHaveText('Opening a new window');

  // Optional: insert text in parent page dynamically
  await parentPage.evaluate(() => {
    const div = document.createElement('div');
    div.id = 'parent-test';
    div.innerText = 'Inserted text in parent window';
    document.body.appendChild(div);
  });

  await expect(parentPage.locator('#parent-test')).toHaveText('Inserted text in parent window');

  // Close child window
  await childPage.close();

  // Parent window is still active
  await expect(parentPage.locator('h3')).toHaveText('Opening a new window');
});
