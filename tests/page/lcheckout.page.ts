import { Page, expect } from '@playwright/test';

export class Checkout {
  readonly page: Page;
  readonly firstName: string;
  readonly lastName: string;
  readonly postallCode: string;
  readonly buttonCotonue: string;
  readonly message: string
  readonly first_Name: string
  readonly last_Name: string
  readonly postall_code: string

  constructor(page: Page) {
    this.page = page;
    this.firstName = '[data-test="firstName"]';
    this.lastName = '[data-test="lastName"]';
    this.postallCode = '[data-test="postalCode"]';
    this.buttonCotonue = '[data-test="continue"]';
    this.message = 'h3[data-test="error"]';
    this.first_Name = process.env.FIRST_NAME || '';
    this.last_Name = process.env.LAST_NAME || '';
    this.postall_code = process.env.POSTAL_CODE || ''
      
    if (!this.firstName || !this.lastName || !this.postallCode || !this.buttonCotonue || !this.message 
      || !this.first_Name || !this.last_Name || !this.postall_code) {
        throw new Error("Missing environment variables");
    }
  }
  async goto() {
    await this.page.goto('https://www.saucedemo.com/checkout-step-one.html');
  }

  async checkdsenkeysfail(firtsName: string, lassName: string, postallCode: string) {
    await this.page.fill(this.firstName, firtsName);
    await this.page.fill(this.lastName, lassName);
    await this.page.fill(this.postallCode, postallCode);
    await this.page.click(this.buttonCotonue);
  }

  async checksenkeyOK(firtsName: string, lassName: string, postallCode: string) {
      await this.page.fill(this.firstName, firtsName);
      await this.page.fill(this.lastName, lassName);
      await this.page.fill(this.postallCode, postallCode);
      await this.page.click(this.buttonCotonue);
      await expect(this.page).toHaveURL('https://www.saucedemo.com/checkout-step-two.html')
    }

    async checkClickbutton(button: string, url: string){
      await this.page.click(button);
      await expect(this.page).toHaveURL(url);
      await this.page.goBack();
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
