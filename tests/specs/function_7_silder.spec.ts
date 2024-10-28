import { test, expect } from '@playwright/test';
import { Login } from '../page/login.page';
import { Alert } from '../page/alerts.page';

let page; 
let alert: Alert

test.beforeAll(async ({ browser }) => {
    page = await browser.newPage(); 
    const login = new Login(page);
    alert = new Alert(page);
    await login.loginURL();
    await page.click("(//a[normalize-space()='SwitchTo'])[1]");
    await page.click("a[href='Alerts.html']");
});

test ("test slider",async () => {
    
});
    


test.afterAll(async () => {
    if (page) {
        await page.close(); 
    }
});






