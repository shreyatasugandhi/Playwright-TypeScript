import { Page, expect } from '@playwright/test';

export class HomePage {
  private readonly page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  async openApplication(url: string): Promise<void> {
    await this.page.goto(url);
  }

  async verifyHomePageLoaded(): Promise<void> {
    await expect(this.page.locator('#homeMenu')).toBeVisible();
  }
}
