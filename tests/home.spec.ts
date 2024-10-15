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
        await page.getByRole('button', { name: 'Open Menu' }).click();
        await page.click('id=about_sidebar_link');

        const aboutURL = await page.url();
        await expect(aboutURL).toBe('https://saucelabs.com/')
        console.log('open abuot success')
        await page.goBack();
    })


    //reset app state
    test('reset app state', async () => {
        await page.getByRole('button', { name: 'Open Menu' }).click();
        const resetApp = await page.locator('[data-test="reset-sidebar-link"]');
        const cart = await page.locator( '//a[@class=shopping_cart_link]');

        let cartCount = await cart.textContent();
        cartCount = parseInt(cartCount || '0');

        if(cartCount > 0 ){
            await resetApp.click();
            console.log('reset success')
            await expect(cart).toBeHidden();
            console.log('gio hang da xoa');
        } 
        else{
            await page.click('[data-test="add-to-cart-sauce-labs-bike-light"]');;
            await resetApp.click();
            console.log('reset success')
            await expect(cart).toBeHidden();
            console.log('gio hang da xoa');
        }
    })


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
