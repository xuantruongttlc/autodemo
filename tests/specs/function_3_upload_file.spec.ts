import { test, expect } from '@playwright/test';
import { uploadFile} from '../page/uploadFile.page';
import { Login } from '../page/login.page';

let page; 
let uploadfile: uploadFile; 

test.beforeAll(async ({ browser }) => {
    page = await browser.newPage(); 
    const login = new Login(page);
    uploadfile = new uploadFile(page); 
    await login.loginURL();
    await page.click(".dropdown-toggle[href='#']");
    await page.click("a[href='FileUpload.html']");
});

test.describe('Check uploadFile', () =>  {

    test('UploadFile', async () => {
        const upload = await page.locator('#input-4');
        await upload.setInputFiles(process.env.FILE1);
        await page.waitForTimeout(1000);
        await uploadfile.checkTobeVisible('//body/section[1]/div[1]/div[1]/div[1]/div[1]/div[1]/div[2]/div[1]/div[1]/div[1]/object[1]/div[1]/span[1]/i[1]')
    });
    
    test('Check click button remove', async () => {
        const buttonremove = "//span[contains(text(),'Remove')]"
        await uploadfile.checkTobeVisible(buttonremove);
        await page.click(buttonremove);
        await page.waitForTimeout(1000);
        await uploadfile.checkNotTobeVisible(buttonremove);
    });

    test('check click button UploadFile', async () => {
        const upload = await page.locator('#input-4');
        await upload.setInputFiles(process.env.FILE2);
        await page.waitForTimeout(1000);
        await uploadfile.checkTobeVisible("//body/section[1]/div[1]/div[1]/div[1]/div[1]/div[1]/div[2]/div[1]/div[1]/div[1]/object[1]/div[1]/span[1]/i[1]")
    });

    test('check Click button zoom', async () => {
        await page.click("//body/section[1]/div[1]/div[1]/div[1]/div[1]/div[1]/div[2]/div[1]/div[1]/div[2]/div[3]/div[1]/button[1]/i[1]")
       
        const popupSelector = '.modal-dialog'; 
        await page.waitForSelector(popupSelector);

       
        const popupVisible = await page.isVisible(popupSelector);
        expect(popupVisible).toBe(true);

       
        const popupTitle = await page.textContent(`${popupSelector} .modal-title`); 
        expect(popupTitle).toContain('Detailed Preview'); 
    })
});

test.afterAll(async () => {
    if (page) {
        await page.close(); 
    }
});
