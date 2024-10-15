import { test, expect } from '@playwright/test';

test.describe('login', () => {
    let page;

    // Khởi tạo trang và điều hướng đến trang web trước khi bắt đầu các test
    test.beforeAll(async ({ browser }) => {
        page = await browser.newPage();
        await page.goto('https://www.saucedemo.com/');
    });

    // Hàm kiểm tra thông báo lỗi
    const checkErrorMessage = async (expectedMessage) => {
        // Kiểm tra xem thông báo lỗi có tồn tại không
        const errorLocator = page.locator('h3[data-test=error]');
        
        // Chờ để xem thông báo lỗi xuất hiện
        await expect(errorLocator).toBeVisible({ timeout: 5000 });

        const errorMessage = await errorLocator.textContent();
        console.log('Lỗi trả về là:', errorMessage);

        await expect(errorMessage.trim()).toBe(expectedMessage);
        const closeButton = await errorLocator.locator('button');

        // Nhấn nút đóng và kiểm tra rằng thông báo lỗi không còn hiển thị
        await closeButton.click();
        await expect(errorLocator).not.toBeVisible({ timeout: 5000 });
        console.log('Thông báo lỗi đã được đóng.');
    };

    // TH bỏ trống username và password
    test('Empty username and password', async () => {
        await page.click('id=login-button');
        await checkErrorMessage('Epic sadface: Username is required');
    });

    // TH bỏ trống username
    test('Empty username', async () => {
        await page.fill('#password', "secret_sauce");
        await page.click('id=login-button');
        await checkErrorMessage('Epic sadface: Username is required');
    });

    // TH nhập space và username
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

    // Không nhập password
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

    // Login Success
    test('login success', async () => {
        await page.fill('#user-name', "standard_user");
        await page.fill('#password', "secret_sauce");
        await page.click('id=login-button');

        const homeURL = await page.url();
        await expect(homeURL).toBe('https://www.saucedemo.com/inventory.html');

        const homeTitle = await page.title();
        await expect(homeTitle).toBe('Swag Labs');
    });

    // Đóng trang sau khi tất cả các test đã hoàn tất
    test.afterAll(async () => {
        await page.close();
    });
});
