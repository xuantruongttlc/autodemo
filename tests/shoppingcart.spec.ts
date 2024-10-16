import { test, expect } from '@playwright/test';
import { execPath } from 'process';

test.describe('shopping_cart', () => {
    let page;
    let context;
    test.beforeAll( async ({browser}) => {
        context = await browser.newContext();
        page = await context.newPage();
        await page.goto('https://www.saucedemo.com/');
        await page.fill('#user-name', "standard_user");
        await page.fill('#password', "secret_sauce");
        await page.click('id=login-button');

    })
    test ('buttonContinue', async ()=>{
        await page.click('[data-test="shopping-cart-link"]')
        await page.click('[data-test="continue-shopping"]');
        const aboutURL = await page.url();
        await expect(aboutURL).toBe('https://www.saucedemo.com/inventory.html')
        await page.waitForLoadState('networkidle')

    })
    test ('buttoncheckout', async ()=> {
        await page.click('[data-test="shopping-cart-link"]')
        await page.click('[data-test="checkout"]');
        const checkoutURL = await page.url();
        await expect(checkoutURL).toBe('https://www.saucedemo.com/checkout-step-one.html')
        await page.waitForLoadState('networkidle')
        page.goBack();
    })

    // test('remote product', async () => {
    //     console button = await page.locator
    // })



    test.afterAll(async () => {
        if (page) {
            await page.close(); 
        }
        if (context) {
            await context.close();
        }
    });
})