import {Page, test, expect, Locator} from '@playwright/test'
import fs from 'fs';

export class dowload_File{

    constructor(private page: Page){
        this.page = page;
    }

    async dowloadfile(buttondowload: Locator){
            const downloadPromise = this.page.waitForEvent('download');
            await buttondowload.click();
            const download = await downloadPromise;
            const suggestedFilename = download.suggestedFilename(); 
            await download.saveAs('./tests/File/' + suggestedFilename); 
            return suggestedFilename;
    }
    async generateFile(loctext: string, textInput: string, buttonGenerate: string){
        await this.page.type(loctext, textInput);
        await this.page.waitForTimeout(500)
        await this.page.click(buttonGenerate);
        await this.page.waitForTimeout(500)
    }

    async checkupLoadSuccess(filePath: string){
        const downloadPath = './tests/File/'; 
        const fullPath = downloadPath + filePath; 
    
        const fileExists = fs.existsSync(fullPath); 
        await expect(fileExists).toBe(true); 
        console.log(`Dowload ${filePath} success`); 
    }
}