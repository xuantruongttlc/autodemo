

import { test, expect, Page } from '@playwright/test';
import { LoginPage } from '../page/login.page';



let page: Page;
let loginPage: LoginPage
const userName = process.env.USER_NAME!;
const passWord = process.env.PASS_WORD!;
  

test.beforeAll(async ({ browser  }) => {
        page = await browser.newPage(); 
        loginPage = new LoginPage(page);
        await loginPage.goto();
});


test.describe('check login', () =>{
        
        test('Check empty username and password fild', async () => {
            await loginPage.login("", "");
            await loginPage.checkMessage('Epic sadface: Username is required');
        });
    
        test('Check login success', async () => {
            await loginPage.login(userName, passWord)
    
            await expect(page).toHaveURL('https://www.saucedemo.com/inventory.html');
    
            const homeTitle = await page.title();
            await expect(homeTitle).toBe('Swag Labs');
            await page.goBack();
        });
});
    test.describe('Check username field', () => {
        
        test('Check empty username field', async () => {
            await loginPage.login("",passWord);
            await loginPage.checkMessage('Epic sadface: Username is required');
        });
    
      
        test('Check empty space username field ', async () => {
            await loginPage.login("         ",passWord);
            await loginPage.checkMessage('Epic sadface: Username and password do not match any user in this service');
        });
    
        
        test('Check enter a space between usernames field', async () => {
            await loginPage.login("standr     _user",passWord);
            await loginPage.checkMessage('Epic sadface: Username and password do not match any user in this service');
        });
    
        
        test('Check incorrect Username field information', async () => {
            await loginPage.login(userName + 1111,passWord);
            await loginPage.checkMessage('Epic sadface: Username and password do not match any user in this service');
        });
    })
    
    test.describe('check password field', () => {
        test('Check empty password field', async () => {
            await loginPage.login(userName, "");
            await loginPage.checkMessage('Epic sadface: Password is required');
        });
    
        
        test('Check empty space password field', async () => {
            await loginPage.login(userName, "        ");
            await loginPage.checkMessage('Epic sadface: Username and password do not match any user in this service');
        });
    
        
        test('Check enter a space between password field', async () => {
            await loginPage.login(userName, "secrect_     sauce");
            await loginPage.checkMessage('Epic sadface: Username and password do not match any user in this service');
        });
    
        
        test('Check incorrect password field information field', async () => {
            await loginPage.login(userName, passWord + 11111);
            await loginPage.checkMessage('Epic sadface: Username and password do not match any user in this service');
        });
    })
    
    test.describe('Check list accounts', () => {
        const { chromium } = require('playwright');
        const xlsx = require('xlsx');
        test ('Check login list account', async () =>{
            // const workBook = xlsx.tests('account.xlsx');
            const workBook = xlsx.readFile('/Users/macos/Documents/data/Tester/BHSOFT/saucedemo/tests/account.xlsx');
            const accounts = xlsx.utils.sheet_to_json(workBook.Sheets['Sheet1']); 
            console.log('Danh sách tài khoản:', accounts);
        
            for (const account of accounts) {
            
               
                await loginPage.login(account.username, account.password);
            
                const url = await page.url();
                if (url === 'https://www.saucedemo.com/inventory.html') {
                    console.log(`Login accessful: ${account.username}`);
                } else {
                    const messagerError = await page.locator("h3[data-test='error']").textContent();
                    console.log(`Login fail: ${account.username} with error`, messagerError);
                    continue
                }
                
                await  page.goBack();
        }
        });
    
    })

    test.afterAll(async () => {
        if (page) {
            await page.close(); 
        }
    });