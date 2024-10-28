import { test, expect, Locator } from '@playwright/test';
import { Login } from '../page/login.page';

let page; 


test.beforeAll(async ({ browser }) => {
    page = await browser.newPage(); 
    const login = new Login(page);
    await login.loginURL();
    await page.click("(//a[normalize-space()='Interactions'])[1]");
    await page.click("(//a[normalize-space()='Drag and Drop'])[1]");
    await page.click("a[href='Static.html']");
});


test.describe("test drag and drop", () => {
    test ("test drag && drop", async () => {
        const agular = await page.locator("#angular");
        const mongo = await page.locator("#mongo");
        const node = await page.locator("#node");


        const drop = await page.locator("#droparea");

        // await agular.hover();
        // await page.mouse.down();

        // await drop.hover();
        // await page.mouse.up();

        // await page.waitForTimeout(2000);

        await mongo.dragTo(drop);
        await node.dragTo(drop);
    });

});
    


test.afterAll(async () => {
    if (page) {
        await page.close(); 
    }
});






