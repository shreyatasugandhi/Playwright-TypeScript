import {test, expect, Browser, Page, Locator, BrowserContext} from '@playwright/test'
import { webkit, chromium, firefox } from 'playwright'

// Playwright Test Runner
test('Open and close browser', async ({ page }) => {
  await page.goto('http://zero.webappsecurity.com/');
});


// Manual Browser Control
test('Open and close Zero Bank application', async () => {
  const browser: Browser = await chromium.launch({ headless: false, channel: 'chrome' })
  const page: Page = await browser.newPage();

  await page.goto('http://zero.webappsecurity.com/');

  await browser.close();

});


test('Open and close Zero Bank in Firefox and WebKit', async () => {

  // -----------------------------
  // Firefox
  // -----------------------------
  const firefoxBrowser: Browser = await firefox.launch({ headless: false });
  const firefoxPage: Page = await firefoxBrowser.newPage();

  await firefoxPage.goto('http://zero.webappsecurity.com/');
  console.log('Firefox: Zero Bank opened');

  await firefoxBrowser.close();
  console.log('Firefox: Browser closed');

  // -----------------------------
  // WebKit (Safari engine)
  // -----------------------------
  const webkitBrowser: Browser = await webkit.launch({ headless: false });
  const webkitPage: Page = await webkitBrowser.newPage();

  await webkitPage.goto('http://zero.webappsecurity.com/');
  console.log('WebKit: Zero Bank opened');

  await webkitBrowser.close();
  console.log('WebKit: Browser closed');

});
