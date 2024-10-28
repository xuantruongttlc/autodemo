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

test.describe("test alerts with ok", () => {
    test('alerts with ok', async () => {
        await alert.checkAlert()
        await page.click("(//button[contains(text(),'click the button to display an')])[1]"); //1
        await page.waitForTimeout(1000);
    })

    test('Comfirmation Dialog-Alert with OK and Cancel', async () => {
        await page.click(".analystic[href='#CancelTab']");
        await page.waitForTimeout(1000);
        await alert.checkAlertConfirm(process.env.STATUS!);
        await page.click("(//button[normalize-space()='click the button to display a confirm box'])[1]");
        await page.waitForTimeout(1000);
    })

    test('Comfirmation with textbox', async () => {
        const text = process.env.TEXTBOX!

        await page.click(".analystic[href='#Textbox']");
        await alert.checkAlertTextbox(text);
        await page.click(".btn.btn-info");
        await page.waitForTimeout(1000);
        await expect(page.locator("(//p[@id='demo1'])[1]")).toHaveText(`Hello ${text} How are you today`);
        console.log(`Hello ${text} How are you today`);
    })
})


test.afterAll(async () => {
    if (page) {
        await page.close(); 
    }
});






