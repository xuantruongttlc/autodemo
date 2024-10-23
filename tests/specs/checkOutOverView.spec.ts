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
        await home.buttonADD.click();
        await home.buttonCart.click();
        await page.click('[data-test="checkout"]');
        await checkout.checksendkeyOK(checkout.first_Name, checkout.last_Name, checkout.postall_code);

    })
    
    test('check click name product', async () => {
        await checkout.checkClickbutton(home.nameProduct,home.urlProduct);
    })

    test('check click button_cancel', async () => {
        await checkout.checkClickbutton(page.locator('[data-test="cancel"]'),'https://www.saucedemo.com/inventory.html' )
    })

    test('check click button_finish', async () => {
        await checkout.checkClickbutton(page.locator('[data-test="finish"]'), 'https://www.saucedemo.com/checkout-complete.html' )
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