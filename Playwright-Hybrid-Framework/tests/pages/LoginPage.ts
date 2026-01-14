import { Page, expect } from '@playwright/test';

export class LoginPage {
  private readonly page: Page;

  private readonly usernameInput = '#user_login';
  private readonly passwordInput = '#user_password';
  private readonly signInButton = 'input[name="submit"]';

  constructor(page: Page) {
    this.page = page;
  }

  async login(username: string, password: string): Promise<void> {
    await this.page.fill(this.usernameInput, username);
    await this.page.fill(this.passwordInput, password);
    await this.page.click(this.signInButton);
  }

  async verifyLoginSuccess(): Promise<void> {
    await expect(this.page.locator('#account_summary_tab')).toBeVisible();
  }
}
