import{test, expect} from '@playwright/test'
import { Login } from '../page/login.page';

let page;


test.beforeAll(async ({ browser }) => {
    page = await browser.newPage(); 
    const login = new Login(page); 
    await login.loginURL();
    await page.click(".dropdown-toggle[href='#']");
    await page.click("a[href='FileDownload.html']");
});
test ("Mouse hover", async () => {
    const swichto = await page.locator("(//a[normalize-space()='SwitchTo'])[1]");
    const slert = await page.locator("a[href='Alerts.html']");

    await swichto.hover();
    await slert.hover();

    // await slert.click({slert: 'right'});
    await slert.click({slert: 'left'});

})


test.afterAll(async () => {
    if (page) {
        await page.close(); 
    }
});