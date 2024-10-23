import { Locator, Page, expect } from '@playwright/test';

export class LoginPage {
  readonly page: Page;
  readonly userName: string;
  readonly passWord: string;
  readonly buttonLogin: Locator;
  readonly message: Locator;
  readonly buttonClose: Locator;

  constructor(page: Page) {
    this.page = page;
    this.userName = '#user-name';
    this.passWord = '#password';
    this.buttonLogin = page.locator('[data-test="login-button"]');
    this.message = page.locator('h3[data-test=error]');
    this.buttonClose = page.locator('[data-test="error-button"]')
  }

  async goto() {
    await this.page.goto(process.env.URL_PAGE!);
  }

  async login(username: string, password: string) {
    await this.page.fill(this.userName, username);
    await this.page.fill(this.passWord, password);
    await this.buttonLogin.click();
  }

  async checkMessage(expectedMessage: string) {
    const errorLocator = await this.message; 

    const errorMessage = await errorLocator.textContent();
    await expect(errorMessage?.trim()).toBe(expectedMessage);

    const closeButton = await this.buttonClose;
    await closeButton.click();
    await expect(closeButton).not.toBeVisible();
  }
}
