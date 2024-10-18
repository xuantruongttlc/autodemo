
import { test, expect } from '@playwright/test';
let page;


    // Khởi tạo trang và điều hướng đến trang web trước khi bắt đầu các test
    test.beforeAll(async ({ browser }) => {
        page = await browser.newPage();
        await page.goto('https://www.saucedemo.com/');
    });

    // Hàm kiểm tra thông báo lỗi
    const checkErrorMessage = async (expectedMessage) => {
        const errorLocator = page.locator('h3[data-test=error]');
        
        await expect(errorLocator).toBeVisible({ timeout: 5000 });

        const errorMessage = await errorLocator.textContent();

        await expect(errorMessage.trim()).toBe(expectedMessage);
        const closeButton = await errorLocator.locator('button');

        await closeButton.click();
        await expect(errorLocator).not.toBeVisible({ timeout: 5000 });
    };


test.describe('login', () =>{
        // TH bỏ trống username và password
        test('Empty username and password', async () => {
            await page.click('id=login-button');
            await checkErrorMessage('Epic sadface: Username is required');
        });
    
        // Login Success
        test('login success', async () => {
            await page.fill('#user-name', "standard_user");
            await page.fill('#password', "secret_sauce");
            await page.click('id=login-button');
    
            await expect(page).toHaveURL('https://www.saucedemo.com/inventory.html');
    
            const homeTitle = await page.title();
            await expect(homeTitle).toBe('Swag Labs');
            page.goBack();
        });
    });

test.describe('check username', () => {
    // TH bỏ trống username
    test('Empty username', async () => {
        await page.fill('#password', "secret_sauce");
        await page.click('id=login-button');
        await checkErrorMessage('Epic sadface: Username is required');
    });

    // TH nhập space vào username
    test('Empty space username', async () => {
        await page.fill('#user-name', "          ");
        await page.fill('#password', "secret_sauce");
        await page.click('id=login-button');
        await checkErrorMessage('Epic sadface: Username and password do not match any user in this service');
    });

    // Nhập username có khoảng trắng
    test('Enter a space between usernames', async () => {
        await page.fill('#user-name', "standard_      user");
        await page.fill('#password', "secret_sauce");
        await page.click('id=login-button');
        await checkErrorMessage('Epic sadface: Username and password do not match any user in this service');
    });

    // Nhập sai thông tin username
    test('Incorrect Username field information', async () => {
        await page.fill('#user-name', "standard_user111");
        await page.fill('#password', "secret_sauce");
        await page.click('id=login-button');
        await checkErrorMessage('Epic sadface: Username and password do not match any user in this service');
    });
})

test.describe('check password', () => {
    test('Empty password', async () => {
        await page.fill('#password', '');
        await page.fill('#user-name', "standard_user");
        await page.click('id=login-button');
        await checkErrorMessage('Epic sadface: Password is required');
    });

    // Nhập khoảng trắng vào password
    test('Empty space password', async () => {
        await page.fill('#user-name', "standard_user");
        await page.fill('#password', "          ");
        await page.click('id=login-button');
        await checkErrorMessage('Epic sadface: Username and password do not match any user in this service');
    });

    // Nhập password có chứa khoảng trắng
    test('Enter a space between password', async () => {
        await page.fill('#user-name', "standard_user");
        await page.fill('#password', "secret_          sauce");
        await page.click('id=login-button');
        await checkErrorMessage('Epic sadface: Username and password do not match any user in this service');
    });

    // Nhập sai password
    test('Incorrect password field information', async () => {
        await page.fill('#user-name', "standard_user");
        await page.fill('#password', "secret_sauce1111");
        await page.click('id=login-button');
        await checkErrorMessage('Epic sadface: Username and password do not match any user in this service');
    });
})

test.describe('Check list accounts', () => {
    const { chromium } = require('playwright');
    const xlsx = require('xlsx');
    test ('login list account', async () =>{
        // const workBook = xlsx.tests('account.xlsx');
        const workBook = xlsx.readFile('/Users/macos/Documents/data/Tester/BHSOFT/saucedemo/tests/account.xlsx');
        const accounts = xlsx.utils.sheet_to_json(workBook.Sheets['Sheet1']); 
        console.log('Danh sách tài khoản:', accounts);
    
        for (const account of accounts) {
        
            await page.fill('#user-name', account.username); 
            await page.fill('#password', account.password);  

        
            await page.click('id=login-button');  
            await page.waitForLoadState('networkidle')
        
            const url = await page.url();
            if (url === 'https://www.saucedemo.com/inventory.html') {
                console.log(`Login accessful: ${account.username}`);
            } else {
                const messagerError = await page.locator("h3[data-test='error']").textContent();
                console.log(`Login fail: ${account.username} with error`, messagerError);
                continue
            }
            
            page.goBack();
            await page.waitForLoadState('networkidle')
    }
    });

})

test.afterAll(async () => {
    await page.close();
});