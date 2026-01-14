import { BrowserContext, Page } from '@playwright/test';

export interface TestWorld {
  page: Page;
  context: BrowserContext;
}
