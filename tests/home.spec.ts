import { test, expect } from '@playwright/test';
import { TIMEOUT } from 'dns';

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
        console.log('login success')
    });

 
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
        await page.waitForLoadState('networkidle'); 
        const cartCountText = await cart.textContent();
        const cartCount = parseInt(cartCountText.trim(), 10) || 0; 
        console.log(`Số lượng sản phẩm trong giỏ hàng: ${cartCount}`);
        if (cartCount > 0) {
            console.log('reset product')
            await resetApp.click(); 
            console.log('Reset thành công');
            await expect(cart).toHaveText('0'); // sửa lại cho đúng 
            console.log('Giỏ hàng đã được cập nhật');
        } else {
            console.log('add product')
            await page.locator('[data-test="add-to-cart-sauce-labs-backpack"]').click();
            await page.locator('[data-test="add-to-cart-sauce-labs-bike-light"]').click();
            await resetApp.click(); 
            console.log('Reset thành công');
            await expect(cart).toHaveText(''); 
            console.log('Giỏ hàng đã xóa');
        }
    });
    
    


    //logout
    test('logout', async () => {
        await page.getByRole('button', { name: 'Open Menu' }).click();
        await page.locator('[data-test="logout-sidebar-link"]').click();

        const logoutURL = await page.url();
        await expect(logoutURL).toBe('https://www.saucedemo.com/')
        const logoutText = await page.title();
        await expect(logoutText).toBe('Swag Labs');
        console.log('logout success')

    })



    test.afterAll(async () => {
        await page.close(); 
        await context.close(); 
    });
});
