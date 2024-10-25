import { test, expect, Locator } from '@playwright/test';
import { uploadFile } from '../page/uploadFile.page';
import { Login } from '../page/login.page';
import { popUp } from '../page/popup.page';

let page; 
let uploadfile: uploadFile; 
let popup: popUp;

test.beforeAll(async ({ browser }) => {
    page = await browser.newPage(); 
    const login = new Login(page);
    uploadfile = new uploadFile(page); 
    popup = new popUp(page);
    await login.loginURL();
    await page.click(".dropdown-toggle[href='#']");
    await page.click("a[href='FileUpload.html']");
    const upload = await page.locator('#input-4');
    await upload.setInputFiles(process.env.FILE1);
    await page.click("(//button[@title='View Details'])[1]")
});

test.describe('Check about file', () => {

        test('check Click button resize-vertical', async () => {
            const buttonResize = await page.locator("(//i[@class='glyphicon glyphicon-resize-vertical'])[1]")
            const modalHeader = await page.locator("(//div[@class='modal-header'])[1]")
            await buttonResize.click();
            await page.waitForTimeout(1000);
            await expect(modalHeader).not.toBeVisible()
            await buttonResize.click();
            await expect(modalHeader).toBeVisible()

        })

        test('check click once on fullscreen button', async () => {
           
            await page.click("button[title='Toggle full screen']");

            await page.waitForTimeout(1000);
            await popup.checkFullscreen();

            await page.click(".glyphicon.glyphicon-fullscreen");

            await page.waitForTimeout(1000);
            await popup.checkNotFullscreen();
            
        })

        test('check Click button borderless', async () => {
            await page.click("button[title='Toggle borderless mode']")
            await page.waitForTimeout(1000);
            await popup.checkBorderless(".glyphicon.glyphicon-resize-full");

            await page.waitForTimeout(1000);
            await page.locator(".glyphicon.glyphicon-resize-full").click();
            await popup.checkNotBorderless("button[title='Toggle borderless mode']");

        })

        test('check Click button close', async () => {
            await page.click("button[title='Close detailed preview']")
            await page.waitForTimeout(1000);
            popup.checkButtonClose
        })
})

test.afterAll(async () => {
    if (page) {
        await page.close(); 
    }
});
