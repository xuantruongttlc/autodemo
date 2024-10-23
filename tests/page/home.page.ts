import { Locator, Page, expect } from '@playwright/test';



export class Home{
  readonly page: Page;
  readonly userName: string;
  readonly passWord: string;
  readonly buttonCart: Locator;
  readonly urlShoppingCart: string;
  readonly nameProduct: Locator;
  readonly urlProduct: string;
  readonly buttonADD: Locator;
  readonly buttonRemove: Locator;



  constructor(page: Page) {
    this.page = page;
    this.userName = process.env.USER_NAME || '';
    this.passWord = process.env.PASS_WORD || '';
    this.buttonCart = page.locator('[data-test="shopping-cart-link"]');
    this.urlShoppingCart = 'https://www.saucedemo.com/cart.html';
    this.nameProduct = page.locator(process.env.NAME_PRODUCT!);
    this.urlProduct = process.env.ITEM_PRODUCT || '';
    this.buttonADD = page.locator(process.env.BUTTON_ADD_PRODUCT!)
    this.buttonRemove = page.locator(process.env.BUTTON_REMOVE!);
    
    if (!this.userName || !this.passWord) {
        throw new Error("Missing environment variables");
    }
  }

  async checkProduct(status: string){
    if(status === "Remove"){
        await this.page.goto(this.urlShoppingCart);
                
        const product = await this.nameProduct;
        await expect(product).toBeVisible();
    }
    else{
        await this.page.goto(this.urlShoppingCart);
                
        const product = await this.nameProduct
        await expect(product).not.toBeVisible();
    }
  }

  async checkFooter( icon: string, url: string){
        const [newPage] = await Promise.all([
            this.page.context().waitForEvent('page'),
            this.page.click(icon)
        ]);

        await newPage.waitForLoadState('domcontentloaded');

      
        await expect(newPage).toHaveURL(url);

       
        if (!newPage.isClosed()) {
          await newPage.close();
      }
  }

  async checkClickbutton(button: Locator, url: string){
        await button.click();
        await expect(this.page).toHaveURL(url);
        await this.page.goBack();
  }
}
