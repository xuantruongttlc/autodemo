import { Page, Locator, expect } from '@playwright/test';

export class uploadFile{
    constructor(private page: Page){
        this.page = page
    }

    async checkTobeVisible(button: string){
        const local = await this.page.locator(button)
        await expect(local).toBeVisible()
    }

    async checkNotTobeVisible(button: string){
        const local = await this.page.locator(button)
        await expect(local).not.toBeVisible()
    }

}