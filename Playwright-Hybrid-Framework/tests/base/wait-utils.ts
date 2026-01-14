import { Page } from '@playwright/test';

export class WaitUtils {
  static async waitForPageLoad(page: Page): Promise<void> {
    await page.waitForLoadState('networkidle');
  }
}
