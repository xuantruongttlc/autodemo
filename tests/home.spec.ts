import { test, expect } from '@playwright/test';

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
        await page.locator('[data-test="product-sort-container"]').selectOption('za');
        console.log('sort za')
        await page.locator('[data-test="product-sort-container"]').selectOption('lohi');
        console.log('sort lohi')
        await page.locator('[data-test="product-sort-container"]').selectOption('hilo');
        console.log('sort hilo')
        await page.locator('[data-test="product-sort-container"]').selectOption('az');
        console.log('sort az')
    })

    test('shoppingcart', async () => {
        await page.click('[data-test="shopping-cart-link"]')
        const aboutURL = await page.url();
        await expect(aboutURL).toBe('https://www.saucedemo.com/cart.html')
        await page.goBack();
    })

 
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
    test ('reset_app_state', async () =>{
        await page.getByRole('button', { name: 'Open Menu' }).click();
        const resetApp = await page.locator('[data-test="reset-sidebar-link"]');
        const cart = await page.locator('[data-test="shopping-cart-link"]');  
        const item1 = await page.locator('[data-test="add-to-cart-sauce-labs-backpack"]');
        const item2 =  await page.locator('[data-test="add-to-cart-sauce-labs-bike-light"]');
        await item1.click();
        await item2.click();
        const cartText1 = await cart.textContent();
        console.log(' so luong don hang la: ', cartText1)
        await resetApp.click();

        const cartText2 = await cart.textContent();
        console.log(' so luong don hang la: ', cartText2)
        await expect(cart).toHaveText('');
        await page.goto('https://www.saucedemo.com/cart.html');
        await expect(item1).not.toBeVisible();
        await expect(item2).not.toBeVisible();
        await page.goBack();

    })
    

    test('check click name product', async () => {
        await page.click('[data-test="item-4-title-link"]');
        await expect(page).toHaveURL('https://www.saucedemo.com/inventory-item.html?id=4')
        await page.goBack();
    })
    
    test('check click button add/remote to cart', async () => {
            const buttonAddToCart =   await page.locator('[data-test="add-to-cart-sauce-labs-backpack"]');
            const iconCart =  await page.locator('[data-test="shopping-cart-link"]');
            
            await expect(buttonAddToCart).toHaveText('Add to cart');
            const buttonText = await buttonAddToCart.textContent();
            console.log(buttonText)
            await expect(iconCart).toBeVisible();
            
            await buttonAddToCart.click();
    
            const buttonRemove = page.locator('[data-test="remove-sauce-labs-backpack"]');
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
        if (page) {
            await page.close();  // Đóng trang trước
        }
        if (context) {
            await context.close();  // Sau đó đóng ngữ cảnh
        }
    });
});
