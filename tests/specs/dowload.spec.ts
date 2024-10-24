import { dowload_File } from './../page/dowloadfile.page';
import { test, expect } from '@playwright/test';
import { Login } from '../page/login.page';
import fs from 'fs';

let page;
let dowloadFile: dowload_File; 

test.beforeAll(async ({ browser }) => {
    page = await browser.newPage(); 
    const login = new Login(page);
    dowloadFile = new dowload_File(page); 
    await login.loginURL();
    await page.click(".dropdown-toggle[href='#']");
    await page.click("a[href='FileDownload.html']");
});

test.describe('Check dowloadloadFile', () => {
    test('DowloadFile', async () => {
        await page.waitForTimeout(1000);
        const buttonDowload  = await page.getByRole('link', { name: 'Download' })
        const downloadedFileName = await dowloadFile.dowloadfile(buttonDowload); 
        await dowloadFile.checkupLoadSuccess(downloadedFileName);
    });

    test('DowloadFileTxt textbox', async () => {
        const textInput = await process.env.TEXTTXT!;
        const buttonDowload  = await page.locator('#link-to-download')
        await dowloadFile.generateFile('#textbox', textInput, "(//button[@id='createTxt'])[1]")
        const downloadedFileName = await dowloadFile.dowloadfile(buttonDowload); 
        await dowloadFile.checkupLoadSuccess(downloadedFileName);
        
    });

    test('DowloadFilePDF textbox', async () => {
        const textInput = await process.env.TEXTPDF!;
        const buttonDowload  = await page.locator('#pdf-link-to-download') 
        await dowloadFile.generateFile('#pdfbox', textInput, "#createPdf")
        const downloadedFileName = await dowloadFile.dowloadfile(buttonDowload); 
        await dowloadFile.checkupLoadSuccess(downloadedFileName);
        
    });
});

test.afterAll(async () => {
    if (page) {
        await page.close(); 
    }
});
