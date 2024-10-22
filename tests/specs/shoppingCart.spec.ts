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
        await page.click(home.buttonADD);
        await page.click(home.buttonCart);
    });

test.describe('Check out the buttons in the cart', () => {
    test ('Check click button Continue shopping', async ()=>{
        await home.checkClickbutton('[data-test="continue-shopping"]', 'https://www.saucedemo.com/inventory.html');
    })
    test ('Check click buttoncheckout', async ()=> {
        await home.checkClickbutton('[data-test="checkout"]','https://www.saucedemo.com/checkout-step-one.html' )
    })
})
test.describe('Check click item product', ()  => {
    test('check click name product', async () => {
        await home.checkClickbutton(home.nameProduct,home.urlProduct);
    })

     test('Check click button remote product', async () => {
        const buttoRemote = await page.locator(home.buttonRemove); 
        await buttoRemote.click();
        await expect(buttoRemote).not.toBeVisible();

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