import { Page, Browser } from '@playwright/test';

export class TestContext {
  browser!: Browser;
  page!: Page;
}

export const testContext = new TestContext();
