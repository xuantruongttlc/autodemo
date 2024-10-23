import { test, expect, Page } from '@playwright/test';
import { LoginPage } from '../page/login.page';
import { Home } from '../page/home.page';
import { Checkout } from '../page/lcheckout.page';



let page : Page;
let loginPage: LoginPage
let home: Home
let checkout: Checkout


    test.beforeAll(async ({ browser }) => {
        page = await browser.newPage(); 
        loginPage = new LoginPage(page);
        home = new Home(page);
        checkout = new Checkout(page);
        await loginPage.goto();
        await loginPage.login(home.userName, home.passWord);
        await home.buttonADD.click();
        await home.buttonCart.click();
        await page.click('[data-test="checkout"]');
    });

test.describe('check_out_Your_Information',  () => {
 
        test ('Check click button cancel' , async () =>{
            await checkout.checkClickbutton(page.locator('[data-test="cancel"]'), 'https://www.saucedemo.com/cart.html')
        }) 
    
        test ('Check login accessfull', async () => {
            await checkout.checksendkeyOK(checkout.first_Name, checkout.last_Name, checkout.postall_code);
            await page.goBack();
        });     
})
    
    test.describe('Check empty fields',  () => {
        test('Check empty firtname, lastname, postalcode', async () => {
            await checkout.checkdsendkeysfail("","","");
            await checkout.checkMessage('Error: First Name is required');
        });
    
        test('check empty in firtname field', async () => {
            await checkout.checkdsendkeysfail("", checkout.last_Name, checkout.postall_code)
            await checkout.checkMessage('Error: First Name is required');
        });
    
        test('Check empty in lastname field', async () => {
            await checkout.checkdsendkeysfail(checkout.first_Name, "", checkout.postall_code);
            await checkout.checkMessage('Error: Last Name is required');
        });
    
         test('Check empty in postal-code field', async () => {
            await checkout.checkdsendkeysfail(checkout.first_Name, checkout.last_Name, "");
            // await page.waitForLoadState('networkidle')
            await checkout.checkMessage('Error: Postal Code is required');
        });
    })
    
    test.describe('check firtname', () => {

        test('Check empty space firtname', async () => {
            await checkout.checksendkeyOK("            ", checkout.last_Name, checkout.postall_code);
        });
    
        test('Check enter a space between firtname', async () => {
            await checkout.checksendkeyOK("stand_    user", checkout.last_Name, checkout.postall_code);
        });
    
        test('Check enter special characters firtname', async () => {
            await checkout.checksendkeyOK("!@##$#%%%^&%&**&*&^&##@", checkout.last_Name, checkout.postall_code);
        });
    
        test('Check enter lowercase input firtname', async () => {
            await checkout.checksendkeyOK("dang", checkout.last_Name, checkout.postall_code);
        });
    
        
        test('Check enter uppercase in firtname', async () => {
            await checkout.checksendkeyOK("DANG", checkout.last_Name, checkout.postall_code);
        });
    
        //Enter number in firtname
        test('Check enter number in firtname', async () => {
            await checkout.checksendkeyOK("121343543", checkout.last_Name, checkout.postall_code);
        });
        
        test('Check enter number, text, special characters in firtname', async () => {
            await checkout.checksendkeyOK("Dang123##", checkout.last_Name, checkout.postall_code);
        });
    
        test.afterEach(async () =>{
            await page.goBack();
        })
    })
    
    test.describe('check lastname field ', () => {
    
        test('Check empty space in lastname field', async () => {
            await checkout.checksendkeyOK(checkout.first_Name, "           ", checkout.postall_code);
        });
    
        test('Check enter a space between lastname field ', async () => {
            await checkout.checksendkeyOK(checkout.first_Name, "Truong       sad", checkout.postall_code);
        });

        test('Check enter special characters in lastname field', async () => {
            await checkout.checksendkeyOK(checkout.first_Name, "!@@@@@$##%^&&!#%$&^*&&)(&", checkout.postall_code);
        });
    
        test('Check enter lowercase input in lastname field', async () => {
            await checkout.checksendkeyOK(checkout.first_Name, "truong", checkout.postall_code);
        });
    
        test('Check enter uppercase letters in lastname field', async () => {
            await checkout.checksendkeyOK(checkout.first_Name, "TRUONG", checkout.postall_code);
        });
    
        test('Check enter number in lastname field', async () => {
            await checkout.checksendkeyOK(checkout.first_Name, "123543546", checkout.postall_code);
        });
        
        test('Check enter text, number, special character in lastname field', async () => {
            await checkout.checksendkeyOK(checkout.first_Name, "Truong123###", checkout.postall_code);
        });
    
        test.afterEach(async () =>{
            await page.goBack();
        })
    })
    
    test.describe('check postalcode field', () => {
        
        test('Check enter space in postal-code field', async () => {
            await checkout.checksendkeyOK(checkout.first_Name, checkout.last_Name, "           ");
        });
    
        test('Check enter a space between in postal-code field', async () => {
            await checkout.checksendkeyOK(checkout.first_Name, checkout.last_Name, "213     3123421");
            
        });
  
        test('Check enter special characters postal-code field', async () => {
            await checkout.checksendkeyOK(checkout.first_Name, checkout.last_Name, "!@$##%^%&&*^&$%^#@@");
        });
    
        test('Check enter lowercase input in postal-code field', async () => {
            await checkout.checksendkeyOK(checkout.first_Name, checkout.last_Name, "tretfgdgfdg");
        });

        test('Check enter uppercase letters in postal-code Field', async () => {
            await checkout.checksendkeyOK(checkout.first_Name, checkout.last_Name, "HAHAHAAH");
        });
    
        test('Check enter number in postal-code field', async () => {
            await checkout.checksendkeyOK(checkout.first_Name, checkout.last_Name, "98919844");
        });
        
        test('Check enter text, number, special character in postal-code field', async () => {
            await checkout.checksendkeyOK(checkout.first_Name, checkout.last_Name, "Truong`23223442!!!!");
        });
    
        test.afterEach(async () =>{
            await page.goBack();
        })
    })
    test.afterAll(async () => {
        if (page) {
            await page.close(); 
        }
    });