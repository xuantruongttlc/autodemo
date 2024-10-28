import {Page, test, expect, Locator} from '@playwright/test'



export class Alert{

    constructor(private page: Page){
        this.page = page;
    }

    async checkAlert(){
        this.page.once('dialog', async dialog => {
            expect(dialog.type()).toContain("alert");
            expect(dialog.message()).toContain("I am an alert box!"); 
            await dialog.accept();
        })
    }

    async checkAlertConfirm( status: string){
        console.log("dang check ok and cancel");
        this.page.once('dialog', async dialog => {
            expect(dialog.type()).toContain("confirm");
            expect(dialog.message()).toContain("Press a Button !"); 
            if(status === "ok"){
                await dialog.accept();
                await expect(this.page.locator("(//p[@id='demo'])[1]")).toHaveText("You pressed Ok")
                console.log('click button ok')
            }
            else{
                await dialog.dismiss();
                await expect(this.page.locator("(//p[@id='demo'])[1]")).toHaveText("You Pressed Cancel")
                console.log('click button cancel')
            }
            

        })
    }

    async checkAlertTextbox(text: string) {
        this.page.once('dialog', async dialog => {
            expect(dialog.type()).toContain("prompt");
            expect(dialog.message()).toContain("Please enter your name");
            expect(dialog.defaultValue()).toContain("Automation Testing user"); 
            await dialog.accept(text);
        });
    }
    
    
}
