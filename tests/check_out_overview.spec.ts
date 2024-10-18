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

    })
    
    test('check click name product', async () => {
        await page.click('[data-test="item-4-title-link"]');
        await expect(page).toHaveURL('https://www.saucedemo.com/inventory-item.html?id=4')
    })

    test('check click button_cancel', async () => {
        await page.click('[data-test="cancel"]')
        await expect(page).toHaveURL('https://www.saucedemo.com/inventory.html');
    })

    test('check click button_finish', async () => {
        await page.click('[data-test="finish"]')
        await expect(page).toHaveURL('https://www.saucedemo.com/checkout-complete.html');
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