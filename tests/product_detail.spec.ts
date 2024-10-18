import {test, expect } from '@playwright/test';

test.describe('Check product detail', () => {
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
    
    test ('Check click button back to product', async () => {
        await page.click('[data-test="item-4-title-link"]');
        await page.click('#back-to-products');
        await expect(page).toHaveURL('https://www.saucedemo.com/inventory.html')
    })
    test ('Check click button add/remote', async() => {
        await page.locator('[data-test="item-4-title-link"]').click()
        await page.waitForLoadState('networkidle')
        const buttonAddToCart =  await page.locator('[data-test="add-to-cart"]');
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
        await page.goto('https://www.saucedemo.com/cart.html');
        const item = await page.locator('[data-test="item-4-title-link"]')
        await expect(item).toBeVisible();
        await page.goBack();

        await buttonRemove.click();

        await page.waitForLoadState('networkidle')

        await expect(buttonAddToCart).toHaveText('Add to cart');
        await expect(iconCart).toBeVisible();
        await page.goto('https://www.saucedemo.com/cart.html');
        const item2 = await page.locator('[data-test="item-4-title-link"]')
        await expect(item2).not.toBeVisible();
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
})