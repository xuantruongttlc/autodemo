import { test, expect } from '@playwright/test';
import { TIMEOUT } from 'dns';
import { execPath } from 'process';

test.describe('home', () => {
    let page;
    let context; 

    test.beforeAll(async ({ browser }) => {
        context = await browser.newContext(); 
        page = await context.newPage(); 
        await page.goto('https://www.saucedemo.com/');
        await page.fill('#user-name', "standard_user");
        await page.fill('#password', "secret_sauce");
        await page.click('id=login-button');
    });

    test ('sort', async () => {
        
    })

    test('shoppingcart', async () => {
        await page.click('[data-test="shopping-cart-link"]')
        const aboutURL = await page.url();
        await expect(aboutURL).toBe('https://www.saucedemo.com/cart.html')
        await page.goBack();
    })

 
    //tabbar about

    test('about', async ()=> {
        await page.locator('[data-test="add-to-cart-sauce-labs-backpack"]').click();
        await page.locator('[data-test="add-to-cart-sauce-labs-bike-light"]').click();
        await page.getByRole('button', { name: 'Open Menu' }).click();
        await page.click('id=about_sidebar_link');
        const aboutURL = await page.url();
        await expect(aboutURL).toBe('https://saucelabs.com/')
        console.log('open abuot success')
        await page.goBack();
    })


    //reset app state
    test('reset app state', async () => {
        // Mở menu
        await page.getByRole('button', { name: 'Open Menu' }).click();
        const resetApp = await page.locator('[data-test="reset-sidebar-link"]');
        const cart = await page.locator('[data-test="shopping-cart-link"]');  
        await page.waitForLoadState('networkidle'); // cho khoang 500ms
        const cartCountText = await cart.textContent();
        const cartCount = parseInt(cartCountText.trim(), 10) || 0; 
        console.log(`Số lượng sản phẩm trong giỏ hàng: ${cartCount}`);
        if (cartCount > 0) {
            await resetApp.click(); 
            const newCartCountText = await cart.textContent();
            const newCartCount = parseInt(newCartCountText.trim(), 10) || 0;
            await expect(newCartCount).toBe(0) 
        } else {
            await page.locator('[data-test="add-to-cart-sauce-labs-backpack"]').click();
            await page.locator('[data-test="add-to-cart-sauce-labs-bike-light"]').click();
            await resetApp.click();
            const newCartCountText = await cart.textContent();
            const newCartCount = parseInt(newCartCountText.trim(), 10) || 0;
            await expect(newCartCount).toBe(0)
        }
    });
    

    test('check click name product', async () => {
        await page.click('[data-test="item-4-title-link"]');
        await expect(page).toHaveURL('https://www.saucedemo.com/inventory-item.html?id=4')
    })
    
    test('check click button add/remote to cart', async () => {
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
            await page.goto('https://www.saucedemo.com/cart.html');
            const item = await page.locator('[data-test="item-4-title-link"]')
            await expect(item).toBeVisible();
            page.goBack();
    
            await buttonRemove.click();
    
            await page.waitForLoadState('networkidle')
    
            await expect(buttonAddToCart).toHaveText('Add to cart');
            await expect(iconCart).toBeVisible();
            await page.goto('https://www.saucedemo.com/cart.html');
            const item2 = await page.locator('[data-test="item-4-title-link"]')
            await expect(item2).not.toBeVisible();
            page.goBack();
        })


    //check logout
    test('logout', async () => {
        await page.goto('https://www.saucedemo.com/');
        await page.fill('#user-name', "standard_user");
        await page.fill('#password', "secret_sauce");
        await page.click('id=login-button');
        await page.getByRole('button', { name: 'Open Menu' }).click();
        await page.locator('[data-test="logout-sidebar-link"]').click();

        const logoutURL = await page.url();
        await expect(logoutURL).toBe('https://www.saucedemo.com/')
        const logoutText = await page.title();
        await expect(logoutText).toBe('Swag Labs');

    })


    test.afterAll(async () => {
        await page.close(); 
        await context.close(); 
    });
});
