import { test, expect, Page } from '@playwright/test';
import { LoginPage } from '../page/login.page';
import { Home } from '../page/home.page';



let page : Page;
let context; 
let loginPage: LoginPage
let home: Home


    test.beforeAll(async ({ browser }) => {
        page = await browser.newPage(); 
        loginPage = new LoginPage(page);
        home = new Home(page);
        await loginPage.goto();
        await loginPage.login(home.userName, home.passWord);
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
        await home.checkClickbutton(home.buttonCart, home.urlShoppingCart);
    })
});

test.describe('check itemproduct', () => {
    test('check click name product', async () => {
        await home.checkClickbutton(home.nameProduct,home.urlProduct);
    })
    
    test('check click button add/remote to cart', async () => {
            const item = await page.locator(home.nameProduct)
            const buttonAddToCart =   await page.locator(home.buttonADD);
            const iconCart =  await page.locator(home.buttonCart);
            
            await expect(buttonAddToCart).toHaveText('Add to cart');
            await expect(iconCart).toBeVisible();
            
            await buttonAddToCart.click();
    
            const buttonRemove = page.locator(home.buttonRemove);
            await expect(buttonRemove).toHaveText('Remove');
            await expect(iconCart).toHaveText('1');

            
            await home.checkProduct("Remove");
            page.goBack();
    
            await buttonRemove.click();
    
            await page.waitForLoadState('networkidle')
    
            await expect(buttonAddToCart).toHaveText('Add to cart');
            await expect(iconCart).toBeVisible();

            await home.checkProduct("Add to cart");
            

        })
})
test.describe('check footer', () => {
    test('Check click footer_twitter', async () =>{
            await home.checkFooter('[data-test="social-twitter"]', 'https://x.com/saucelabs');
        
     })
    test('Check click footer_facebook', async () =>{
            await home.checkFooter('[data-test="social-facebook"]','https://www.facebook.com/saucelabs');    
    })
    test('Check click footer_linkedin', async () =>{
            await home.checkFooter( '[data-test="social-linkedin"]','https://www.linkedin.com/company/sauce-labs/' );
    })
    
})
test.describe('Check tab bar', () => {
    test.beforeEach(async () =>{
        await page.getByRole('button', { name: 'Open Menu' }).click();
    })

    test('Check click about', async ()=> {
        await home.checkClickbutton('id=about_sidebar_link', 'https://saucelabs.com/');
    })

    test ('Check click reset app state', async () =>{
        const resetApp = await page.locator('[data-test="reset-sidebar-link"]');
        const cart = await page.locator(home.buttonCart);  
        await page.click(home.buttonADD);
        await resetApp.click();
        await expect(cart).toHaveText('');
        await page.goto(home.urlShoppingCart);
        await expect(page.locator(home.buttonADD)).not.toBeVisible();
        await page.goBack();

    })

    test('Ckeck click logout', async () => {
        await home.checkClickbutton('[data-test="logout-sidebar-link"]', 'https://www.saucedemo.com/');
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