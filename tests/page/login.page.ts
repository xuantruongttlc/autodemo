import { Page, Locator, expect } from '@playwright/test';

export class Login {
    
    readonly email : string

    constructor(private page: Page) {
        this.page = page
        this.email = process.env.EMAIL || '';

    }

  async loginURL() {
    await this.page.goto('https://demo.automationtesting.in/');
    await this.page.waitForSelector('#email'); 
    await this.page.fill('#email', this.email);
    await this.page.click('#enterimg');
  }



  
}