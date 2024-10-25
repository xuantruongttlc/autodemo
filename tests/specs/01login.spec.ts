import { test, expect } from '@playwright/test';
import { Login } from '../page/login.page';

let page;
let contex

test('Check goto website', async ({ page }) => {
  const homePage = new Login(page);
  await homePage.loginURL();
});



test.afterAll(async () => {
    if (page) {
        await page.close(); 
    }
});
