import { test, expect } from '@playwright/test'
let page;
    let context;
    test.beforeAll( async ({browser}) => {
        context = await browser.newContext();
        page = await context.newPage();
        await page.goto('https://www.saucedemo.com/');
        await page.fill('#user-name', "standard_user");
        await page.fill('#password', "secret_sauce");
        await page.click('id=login-button');
        await page.click('[data-test="add-to-cart-sauce-labs-backpack"]');

    })

test.describe('shopping_cart', () => {
        test('check_button_shopping_cart', async () => {
        await page.click('[data-test="shopping-cart-link"]')
        const buttonCart =  await page.locator('[data-test="shopping-cart-link"]');
        await buttonCart.click();
        await expect(page).toHaveURL('https://www.saucedemo.com/cart.html');
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
        await page.goBack();
    })

   



    
})
test.describe('item product', ()  => {

    test('check click name product', async () => {
        await page.click('[data-test="item-4-title-link"]');
        await expect(page).toHaveURL('https://www.saucedemo.com/inventory-item.html?id=4')
        await page.goBack();
    })

     test('remote product', async () => {
        const buttoRemote = await page.locator('[data-test="remove-sauce-labs-backpack"]');
        const iconCart =  await page.locator('[data-test="shopping-cart-link"]');
        

        await iconCart.click();
        await page.waitForLoadState('networkidle') 
        await buttoRemote.click();
        await expect(buttoRemote).not.toBeVisible();

    })
})

test.afterAll(async () => {
        if (page) {
            await page.close(); 
        }
        if (context) {
            await context.close();
        }
    });