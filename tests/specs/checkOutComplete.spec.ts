import {test, expect, Page} from '@playwright/test'
import { LoginPage } from '../page/login.page';
import { Home } from '../page/home.page';
import { Checkout } from '../page/lcheckout.page';


let page : Page;
let context; 
let loginPage: LoginPage
let home: Home
let checkout: Checkout
test.describe('check_out_Overview',  () => {
    let page;
    let context
    test.beforeAll( async ({browser}) => {
        page = await browser.newPage(); 
        loginPage = new LoginPage(page);
        home = new Home(page);
        checkout = new Checkout(page);
        await loginPage.goto();
        await loginPage.login(home.userName, home.passWord);
        await page.click(home.buttonADD);
        await page.click(home.buttonCart);
        await page.click('[data-test="checkout"]');
        await checkout.checksenkeyOK(checkout.first_Name, checkout.last_Name, checkout.postall_code);
        await page.click('[data-test="finish"]')

    })
    
    test('check click button Back_home', async () => {
        await checkout.checkClickbutton('[data-test="back-to-products"]','https://www.saucedemo.com/inventory.html')
    })
    
    test('check click icon shoppingcart', async () => {
        await checkout.checkClickbutton('[data-test="shopping-cart-link"]', 'https://www.saucedemo.com/cart.html')
    })

    test.afterAll(async () => {
        if (page) {
            await page.close();  
        }
        if (context) {
            await context.close();  
        }
    });

});