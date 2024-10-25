import {Page, test, expect, Locator} from '@playwright/test'



export class datePicker{

    constructor(private page: Page){
        this.page = page;
    }

    async checkYearMont(year: string, month: string){
        while (true) {
            const currentYear = await this.page.locator(".ui-datepicker-year").textContent();
            const currentMonth = await this.page.locator('.ui-datepicker-month').textContent();
    
            
            if (currentYear === year && currentMonth === month) {
                console.log('da so sanh')
                break;
            }
    
            await this.page.click("[title='Next']"); 
        }
    
    }

    async checkDate(date: string){
        const dates = await this.page.$$("a.ui-state-default");

        for (const dt of dates) {
            const text = await dt.textContent();
            console.log(text);

            if (text === date) { 
                await dt.click(); 
                await this.page.waitForTimeout(5000);
                break;
            }
        }
    }
    
}
