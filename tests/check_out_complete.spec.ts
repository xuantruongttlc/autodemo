import {test, expect} from '@playwright/test'

test.describe('check_out_Overview',  () => {
    let page;
    let context
    test.beforeAll( async ({browser}) => {
        context = await browser.newContext();
        page = await context.newPage();
        await page.goto('https://www.saucedemo.com/');
        await page.fill('#user-name', "standard_user");
        await page.fill('#password', "secret_sauce");
        await page.click('id=login-button');
        await page.locator('[data-test="add-to-cart-sauce-labs-backpack"]').click();  
        await page.click('[data-test="shopping-cart-link"]')
        await page.click('[data-test="checkout"]')
        await page.fill('[data-test="firstName"]', "Dang");
        await page.fill('[data-test="lastName"]', "Truong");
        await page.fill('[data-test="postalCode"]', "123456");
        await page.locator('[data-test="continue"]').click();
        await page.click('[data-test="finish"]')

    })
    
   
    test('check click button Back_home', async () => {
        await page.click('[data-test="back-to-products"]')
        await expect(page).toHaveURL('https://www.saucedemo.com/inventory.html');
    })
    
    test('check click icon shoppingcart', async () => {
        await page.click('[data-test="shopping-cart-link"]')
        const aboutURL = await page.url();
        await expect(aboutURL).toBe('https://www.saucedemo.com/cart.html')
    })

    test.afterEach(async () => {
        await page.goBack();
    })

    test.afterAll(async () => {
        if (page) {
            await page.close();  
        }
        if (context) {
            await context.close();  
        }
    });

});