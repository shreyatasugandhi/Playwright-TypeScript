import { Before, After } from '@cucumber/cucumber';
import { chromium, firefox, webkit, Browser, BrowserContext, Page } from '@playwright/test';
import { takeScreenshot } from '../utils/screenshot.util';

let browser: Browser;

Before(async function () {
  const browserType = (process.env.BROWSER || 'chromium').toLowerCase();

  if (!browser) {
    switch (browserType) {
      case 'firefox':
        browser = await firefox.launch();
        break;
      case 'webkit':
        browser = await webkit.launch();
        break;
      default:
        browser = await chromium.launch();
    }
  }

  const context: BrowserContext = await browser.newContext();
  const page: Page = await context.newPage();

  this.context = context;
  this.page = page;
});

After(async function ({ result }) {
  if (result?.status === 'FAILED') {
    await takeScreenshot(this.page, 'failure');
  }

  await this.context.close();
});
