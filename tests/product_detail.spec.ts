import {test, expect } from '@playwright/test';
import exp from 'constants';

test.describe('product_detail', () => {
    let page;
    let context
    test.beforeAll(async ({browser}) => {
        context = await browser.newContext();
        page = await context.newPage();
        await page.goto('https://www.saucedemo.com/');
        await page.fill('#user-name', "standard_user");
        await page.fill('#password', "secret_sauce");
        await page.click('id=login-button');
    })
    
    test ('button_back_to_product', async () => {
        await page.click(await page.locator('[data-test="item-4-title-link"]').click());
        await page.click('#back-to-products');
        const homeURL = await page.url();
        await expect(homeURL).toBe('https://www.saucedemo.com/inventory.html')
    })
    test ('check click button Add to cart', async() => {
        await page.locator('[data-test="item-4-title-link"]').click()
        await page.waitForLoadState('networkidle')
        const buttonAddToCart =   await page.locator('[data-test="add-to-cart"]');
        const iconCart =  await page.locator('[data-test="shopping-cart-link"]');
        
        await expect(buttonAddToCart).toHaveText('Add to cart');
        const buttonText = await buttonAddToCart.textContent();
        console.log(buttonText)
        await expect(iconCart).toBeVisible();
        
        await buttonAddToCart.click();
        

        await page.waitForLoadState('networkidle')

        const buttonRemove = page.locator('[data-test="remove"]');
        const buttonTextMemote = await buttonRemove.textContent();
        console.log(buttonTextMemote) 
        await expect(buttonRemove).toHaveText('Remove');
        await expect(iconCart).toHaveText('1');
        const iconCartCount1 = await iconCart.textContent();
        console.log(iconCartCount1);

        await buttonRemove.click();

        await page.waitForLoadState('networkidle')

        await expect(buttonAddToCart).toHaveText('Add to cart');
        await expect(iconCart).toBeVisible();
    })
    test.afterAll(async () => {
        if (page) {
            await page.close(); 
        }
        if (context) {
            await context.close();
        }
    });
})