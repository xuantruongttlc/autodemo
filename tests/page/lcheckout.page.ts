import { Locator, Page, expect } from '@playwright/test';

export class Checkout {
  readonly page: Page;
  readonly firstName: Locator;
  readonly lastName: Locator;
  readonly postallCode: Locator;
  readonly buttonContinue: Locator;
  readonly message: Locator;
  readonly first_Name: string;
  readonly last_Name: string;
  readonly postall_code: string;

  constructor(page: Page) {
    this.page = page;
    this.firstName = page.locator('[data-test="firstName"]');
    this.lastName = page.locator('[data-test="lastName"]');
    this.postallCode = page.locator('[data-test="postalCode"]');
    this.buttonContinue = page.locator('[data-test="continue"]');
    this.message = page.locator('h3[data-test="error"]');
    this.first_Name = process.env.FIRST_NAME || '';
    this.last_Name = process.env.LAST_NAME || '';
    this.postall_code = process.env.POSTAL_CODE || '';
      
  }
  async goto() {
    await this.page.goto('https://www.saucedemo.com/checkout-step-one.html');
  }

  async checkdsendkeysfail(firstName: string, lastName: string, postallCode: string) {
    await this.firstName.fill(firstName);
    await this.lastName.fill(lastName);
    await this.postallCode.fill(postallCode);
    await this.buttonContinue.click();
  }

  async checksendkeyOK(firstName: string, lassName: string, postallCode: string) {
      await this.firstName.fill(firstName);
      await this.lastName.fill(lassName);
      await this.postallCode.fill(postallCode);
      await this.buttonContinue.click();
      await expect(this.page).toHaveURL('https://www.saucedemo.com/checkout-step-two.html')
    }

    async checkClickbutton(button: Locator, url: string){
      await button.click();
      await expect(this.page).toHaveURL(url);
      await this.page.goBack();
  }

  async checkMessage(expectedMessage: string) {
    const errorLocator = this.message; 

    const errorMessage = await errorLocator.textContent();
    await expect(errorMessage?.trim()).toBe(expectedMessage);

    const closeButton = await errorLocator.locator('button');
    await closeButton.click();
    await expect(closeButton).not.toBeVisible();
  }

 
}
