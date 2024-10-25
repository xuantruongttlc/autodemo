import { Page, Locator, expect } from '@playwright/test';
import { execPath } from 'process';

export class popUp{
    constructor(private page: Page){
        this.page = page;
    }


    async checkFullscreen(){
        const isFullscreen = await this.page.evaluate(() => {
            return document.fullscreenElement !== null;
        });

        expect(isFullscreen).toBe(true);
        console.log("check fullcreen")
    }
    async checkNotFullscreen(){
        const isFullscreen = await this.page.evaluate(() => {
            return document.fullscreenElement !== null;
        });

        expect(isFullscreen).toBe(false);
        console.log("check not fullcreen")
    }

    // async checkBorderless(selector: string) {
    //     const isNotBorderless = await this.page.evaluate((sel) => {
    //         const element = document.querySelector(sel);
    //         if (!element){
    //             return false;
    //         } 
    //         console.log('aria-pressed = false');
    //         return element.getAttribute('aria-pressed') === 'false';
    //     }, selector);
    
    //     expect(isNotBorderless).toBe(false);  
    //     console.log("checkNotBorderless");
    // }
    async checkBorderless(selector: string) {
        const buttonboderlessnotfull = await this.page.locator(selector)
        await expect(buttonboderlessnotfull).toBeVisible();
    }

    async checkNotBorderless(selector: string) {
        const buttonboderlessfull = await this.page.locator(selector)
        await expect(buttonboderlessfull).toBeVisible();
    }
    

    async checkButtonClose (){
            const popupSelector = '.modal-dialog'; 
            await this.page.waitForSelector(popupSelector, { state: 'hidden' });
            const popupHidden = await this.page.isHidden(popupSelector);
            expect(popupHidden).toBe(true);
            const titleVisible = await this.page.isVisible(`${popupSelector} .modal-title`);
            expect(titleVisible).toBe(false);   
            console.log("check button close")
    }
    
    
}