import { test, expect } from '@playwright/test';
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

test.describe('home', () => {
    

    test ('check click combobox sort', async () => {
        const sortOtion = ['za','lohi', 'hilo','az'];
        for (const option of sortOtion){
            await page.locator('[data-test="product-sort-container"]').selectOption(option);
            console.log('sorted by:' ,option);

            const products = await page.locator('.inventory_item_name').allTextContents();
            const sortedProducts = [...products];
            if(option === 'az'){
                sortedProducts.sort();
                console.log(products);
            }
            else if(option === 'za'){
                sortedProducts.sort().reverse();
                console.log(products);
            }
            else if(option === 'lohi'){
                const prices = await page.locator('.inventory_item_price').allTextContents()
                sortedProducts.sort((a, b) => parseFloat(prices[products.indexOf(a)]) - parseFloat(prices[products.indexOf(b)]));
                console.log(products);
            }
            else if(option == 'hilo'){
                const prices = await page.locator('.inventory_item_price').allTextContents()
                sortedProducts.sort((a, b) => parseFloat(prices[products.indexOf(b)]) - parseFloat(prices[products.indexOf(a)]));
                console.log(products);
            }

        }
    })

    test('check click icon shoppingcart', async () => {
        await page.click('[data-test="shopping-cart-link"]')
        const aboutURL = await page.url();
        await expect(aboutURL).toBe('https://www.saucedemo.com/cart.html')
        await page.goBack();
    })
});

test.describe('check itemproduct', () => {
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
})
test.describe('check footer', () => {
    test('Check click footer_twitter', async () =>{
        const [newPage] = await Promise.all([
            context.waitForEvent('page'), // Chờ tab mới
            page.click('[data-test="social-twitter"]') // Nhấp vào icon Twitter
        ]);

        // Chờ trang trong tab mới tải hoàn tất
        await newPage.waitForLoadState('domcontentloaded');

        // Kiểm tra URL của tab mới
        await expect(newPage).toHaveURL('https://x.com/saucelabs');

        // Đóng tab mới
        await newPage.close();
        
     })
    test('Check click footer_facebook', async () =>{
            const [newPage] = await Promise.all([
                context.waitForEvent('page'), // Chờ tab mới
                page.click('[data-test="social-facebook"]') // Nhấp vào icon Twitter
            ]);
    
            // Chờ trang trong tab mới tải hoàn tất
            await newPage.waitForLoadState('domcontentloaded');
    
            // Kiểm tra URL của tab mới
            await expect(newPage).toHaveURL('https://www.facebook.com/saucelabs');
    
            // Đóng tab mới
            await newPage.close();
            
         })
    test('Check click footer_linkedin', async () =>{
            const [newPage] = await Promise.all([
                context.waitForEvent('page'), // Chờ tab mới
                page.click('[data-test="social-linkedin"]') // Nhấp vào icon Twitter
            ]);
    
            // Chờ trang trong tab mới tải hoàn tất
            await newPage.waitForLoadState('domcontentloaded');
    
            // Kiểm tra URL của tab mới
            await expect(newPage).toHaveURL('https://www.linkedin.com/company/sauce-labs/');
    
            // Đóng tab mới
            await newPage.close();
         
    })
    
})


test.describe('Check tab bar', () => {

    test('Check click about', async ()=> {
        await page.getByRole('button', { name: 'Open Menu' }).click();
        await page.click('id=about_sidebar_link');
        const aboutURL = await page.url();
        await expect(aboutURL).toBe('https://saucelabs.com/')
        console.log('open abuot success')
        await page.goBack();
    })

    test ('Check click reset app state', async () =>{
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

    test('Ckeck click logout', async () => {
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

})
test.afterAll(async () => {
        if (page) {
            await page.close(); 
        }
        if (context) {
            await context.close();  
        }
    });