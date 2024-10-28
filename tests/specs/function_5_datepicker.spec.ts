import { test, expect } from '@playwright/test';
import { Login } from '../page/login.page';
import { datePicker } from '../page/datepicker.page';

let page; 
let datepicker: datePicker;

test.beforeAll(async ({ browser }) => {
    page = await browser.newPage(); 
    datepicker = new datePicker(page);
    const login = new Login(page);
    await login.loginURL();
    await page.click("(//a[normalize-space()='Widgets'])[1]");
    await page.click("(//a[normalize-space()='Datepicker'])[1]");
});
test.describe("datepicker", () => {
    test("datepictdefaut", async () => {
        const year = process.env.YEAR;
        const month = process.env.MONTH;
        const date = process.env.DATE;
    
        await page.click("#datepicker1");
        await page.waitForTimeout(1000);
        await datepicker.checkYearMont(year!, month!);
        await page.waitForSelector(".ui-datepicker");
    
        await page.click(`//a[@class='ui-state-default'][text()= '${date}']`);
    
        await page.waitForTimeout(1000);
    });
    
    test("datepicker not defaut", async() => {
        await page.fill("(//input[@id='datepicker2'])[1]", process.env.DATEPICKER);
    })
})



test.afterAll(async () => {
    if (page) {
        await page.close(); 
    }
});


