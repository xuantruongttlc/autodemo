import{test, expect} from '@playwright/test'
import { Login } from '../page/login.page';
import path from 'path';

let page;


test.beforeAll(async ({ browser }) => {
    page = await browser.newPage(); 
    const login = new Login(page); 
    await login.loginURL();
    await page.goto('https://demo.automationtesting.in/TinyMCE.html')
});
test ("page screenshot", async () => {
        await page.screenshot({path: 'tests/File/' + Date.now() + 'homepage.png'})

})


test ("full page screenshot", async () => {
    await page.screenshot({path: 'tests/File/' + Date.now() + 'fullhomepage.png', fullPage:true });

})
test ("Element screenshot", async () => {
    await page.locator("img[src='//tinymce.cachefly.net/shared-images/cdn-shutdown.png']").screenshot({path: 'tests/File/' + Date.now() + 'elementpage.png'});

})

test.afterAll(async () => {
    if (page) {
        await page.close(); 
    }
});