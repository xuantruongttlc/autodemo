import { Page, expect } from '@playwright/test';
import { Context } from 'vm';



export class Home{
  readonly page: Page;
  readonly userName: string;
  readonly passWord: string;
  readonly buttonCart: string;
  readonly urlShoppingCart: string;
  readonly nameProduct: string;
  readonly urlProduct: string;
  readonly buttonADD: string;
  readonly buttonRemove: string;



  constructor(page: Page) {
    this.page = page;
    this.userName = process.env.USER_NAME || '';
    this.passWord = process.env.PASS_WORD || '';
    this.buttonCart = process.env.BUTTON_SHOPPING_CART || '';
    this.urlShoppingCart = process.env.URL_SHOPPING_CART || '';
    this.nameProduct = process.env.NAME_PRODUCT4 || '';
    this.urlProduct = process.env.ITEM_PRODUCT4 || ''
    this.buttonADD = process.env.BUTTON_ADD_PRODUCT1 || '';
    this.buttonRemove = process.env.BUTTON_REMOTE1 ||'';
    
    if (!this.userName || !this.passWord || !this.buttonCart || !this.urlShoppingCart 
        || !this.nameProduct || !this.buttonADD || !this.buttonRemove || !this.urlProduct) {
        throw new Error("Missing environment variables");
    }
  }

  async checkProduct(status: string){
    if(status === "Remove"){
        await this.page.goto(this.urlShoppingCart);
                
        const product = await this.page.locator(this.nameProduct)
        await expect(product).toBeVisible();
    }
    else{
        await this.page.goto(this.urlShoppingCart);
                
        const product = await this.page.locator(this.nameProduct)
        await expect(product).not.toBeVisible();
    }
  }

  async checkFooter( icon: string, url: string){
        const [newPage] = await Promise.all([
            this.page.context().waitForEvent('page'),
            this.page.click(icon)
        ]);

        // Chờ trang trong tab mới tải hoàn tất
        await newPage.waitForLoadState('domcontentloaded');

        // Kiểm tra URL của tab mới
        await expect(newPage).toHaveURL(url);

        // Đóng tab mới
        if (!newPage.isClosed()) {
          await newPage.close();
      }
  }

  async checkClickbutton(button: string, url: string){
        await this.page.click(button);
        await expect(this.page).toHaveURL(url);
        await this.page.goBack();
  }
}
