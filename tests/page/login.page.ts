import { Page, expect } from '@playwright/test';

export class LoginPage {
  readonly page: Page;
  readonly userName: string;
  readonly passWord: string;
  readonly buttonLogin: string;
  readonly message: string;

  constructor(page: Page) {
    this.page = page;
    this.userName = '#user-name';
    this.passWord = '#password';
    this.buttonLogin = 'id=login-button';
    this.message = 'h3[data-test=error]';
  }

  async goto() {
    await this.page.goto(process.env.URL_PAGE!);
  }

  async login(username: string, password: string) {
    await this.page.fill(this.userName, username);
    await this.page.fill(this.passWord, password);
    await this.page.click(this.buttonLogin);
  }

  async checkMessage(expectedMessage: string) {
    const errorLocator = this.page.locator(this.message); 

    const errorMessage = await errorLocator.textContent();
    await expect(errorMessage?.trim()).toBe(expectedMessage);

    const closeButton = await errorLocator.locator('button');
    await closeButton.click();
    await expect(closeButton).not.toBeVisible();
  }
}
