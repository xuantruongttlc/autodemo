import {test, expect } from '@playwright/test';

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
        await page.click("a[id='item_4_title_link'] div[class='inventory_item_name ']");
        await page.click('#back-to-products');
        const aboutURL = await page.url();
        await expect(aboutURL).toBe('https://www.saucedemo.com/inventory.html')
    })
    test ('button add to cart', async() => {
        await page.click("a[id='item_4_title_link'] div[class='inventory_item_name ']");
        await page.waitForLoadState('networkidle')
        const cart= await page.locator('[data-test="shopping-cart-link"]');
        let cartText = await cart.textContent();
        let cartCount = parseInt(cartText.trim(), 10) || 0;
        console.log(`so luong don hang la: ${cartCount}`);
        const buttonAdd = await page.locator("(//button[normalize-space()='Add to cart'])[1]");
        let buttonText = await buttonAdd.textContent();
        if(buttonText === 'Add to cart'){
            console.log('add to cart')
            await buttonAdd.click();
            await page.waitForLoadState('networkidle')
            console.log('click thành công');
            await page.waitForTimeout(1000); 
            cartText = await cart.textContent();
            const cartCount1 = parseInt(cartText.trim(), 10) || 0;
            await expect(cartCount1).toBe(cartCount + 1);
            console.log(`Số lượng đơn hàng sau khi thêm: ${cartCount}`)

        }
        else{
            console.log('remote');
            await buttonAdd.click();
            console.log(buttonText);
            await page.waitForTimeout(1000); 
            cartText = await cart.textContent();
            const cartCount1 = parseInt(cartText.trim(), 10) || 0;
            await expect(cartCount1).toBe(cartCount + 1);
            console.log(`Số lượng đơn hàng sau khi thêm: ${cartCount}`)
        }

        ;
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