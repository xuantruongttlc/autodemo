import {test, expect} from '@playwright/test'

test.describe('check_out_Your_Information',  () => {
    let page;
    let context;
    test.beforeAll( async ({browser}) => {
        context = await browser.newContext();
        page = await context.newPage();
        await page.goto('https://www.saucedemo.com/');
        await page.fill('#user-name', "standard_user");
        await page.fill('#password', "secret_sauce");
        await page.click('id=login-button');
        await page.click('[data-test="shopping-cart-link"]')
        await page.click('[data-test="checkout"]')
    })
    const checkErrorMessage = async (expectedMessage) => {
        const errorLocator = page.locator('h3[data-test="error"]');
        
        await expect(errorLocator).toBeVisible({ timeout: 5000 });

        const errorMessage = await errorLocator.textContent();

        await expect(errorMessage.trim()).toBe(expectedMessage);
        const closeButton = await page.locator('[data-test="error-button"]');

        await closeButton.click();
        await expect(errorLocator).not.toBeVisible({ timeout: 5000 });
    };
    test ('Check button cancel' , async () =>{
        await page.click('[data-test="cancel"]')
        await expect(page).toHaveURL('https://www.saucedemo.com/cart.html')
        page.goBack();
    })

    // TH bỏ trống firtname và lastname và zipcode
    test('Empty firtname, lastname, postalcode', async () => {
        await page.locator('[data-test="continue"]').click();
        await checkErrorMessage('Error: First Name is required');
    });

   // TH bỏ trống firtname
    test('Empty firtname', async () => {
        await page.fill('[data-test="lastName"]', "Truong");
        await page.fill('[data-test="postalCode"]', "08324");
        await page.locator('[data-test="continue"]').click();
        await checkErrorMessage('Error: First Name is required');
    });

    // TH nhập space vào firtname
    test('Empty space firtname', async () => {
        await page.fill('[data-test="firstName"]', "          ");
        await page.fill('[data-test="lastName"]', "Truong");
        await page.fill('[data-test="postalCode"]', "08324");
        await page.locator('[data-test="continue"]').click();
        await page.goBack();
    });

    // Nhập firtname có khoảng trắng
    test('Enter a space between firtname', async () => {
        await page.fill('[data-test="firstName"]', "standard_      user");
        await page.fill('[data-test="lastName"]', "Truong");
        await page.fill('[data-test="postalCode"]', "08324");
        await page.locator('[data-test="continue"]').click();
        await expect(page).toHaveURL('https://www.saucedemo.com/checkout-step-two.html')
        await page.goBack();
    });
    //Nhập ký tự đặc biệt firtname
    test('enter special characters firtname', async () => {
        await page.fill('[data-test="firstName"]', "!@#@!$@$@!$$$!@$#%$^%&*^(*&^%#@!");
        await page.fill('[data-test="lastName"]', "Truong");
        await page.fill('[data-test="postalCode"]', "08324");
        await page.locator('[data-test="continue"]').click();
        await expect(page).toHaveURL('https://www.saucedemo.com/checkout-step-two.html')
        await page.goBack();
    });


    //Nhập ký tự chữ thường firtname
    test('enter lowercase input firtname', async () => {
        await page.fill('[data-test="firstName"]', "dang");
        await page.fill('[data-test="lastName"]', "Truong");
        await page.fill('[data-test="postalCode"]', "08324");
        await page.locator('[data-test="continue"]').click();
        await expect(page).toHaveURL('https://www.saucedemo.com/checkout-step-two.html')
        await page.goBack();
    });

    //Nhập ký tự chữ in hoa vao firtname
    test('enter uppercase letters', async () => {
        await page.fill('[data-test="firstName"]', "DANG");
        await page.fill('[data-test="lastName"]', "Truong");
        await page.fill('[data-test="postalCode"]', "08324");
        await page.locator('[data-test="continue"]').click();
        await expect(page).toHaveURL('https://www.saucedemo.com/checkout-step-two.html')
        await page.goBack();
    });

    //Nhập ký tự số vao firtname
    test('enter number', async () => {
        await page.fill('[data-test="firstName"]', "1234566");
        await page.fill('[data-test="lastName"]', "Truong");
        await page.fill('[data-test="postalCode"]', "08324");
        await page.locator('[data-test="continue"]').click();
        await expect(page).toHaveURL('https://www.saucedemo.com/checkout-step-two.html')
        await page.goBack();
    });
    

    // Nhập chữ, số, ký tự đặc biệt vao firtname
    test('enter firtname', async () => {
        await page.fill('[data-test="firstName"]', "Dang123#");
        await page.fill('[data-test="lastName"]', "Truong");
        await page.fill('[data-test="postalCode"]', "08324");
        await page.locator('[data-test="continue"]').click();
        await expect(page).toHaveURL('https://www.saucedemo.com/checkout-step-two.html')
        await page.goBack();
    });
   


    //lastname
    // TH bỏ trống lastname
    test('Empty lastname', async () => {
        await page.fill('[data-test="firstName"]', "Dang");
        await page.fill('[data-test="postalCode"]', "08324");
        await page.locator('[data-test="continue"]').click();
        await checkErrorMessage('Error: Last Name is required');
    });

    // TH nhập space vào firtname
    test('Empty space lastname', async () => {
        await page.fill('[data-test="firstName"]', "Dang");
        await page.fill('[data-test="lastName"]', "            ");
        await page.fill('[data-test="postalCode"]', "08324");
        await page.locator('[data-test="continue"]').click();
        await page.goBack();
    });

    // Nhập lastname có khoảng trắng
    test('Enter a space between lasrname', async () => {
        await page.fill('[data-test="firstName"]', "Dang");
        await page.fill('[data-test="lastName"]', "Truo         ng");
        await page.fill('[data-test="postalCode"]', "08324");
        await page.locator('[data-test="continue"]').click();
        await expect(page).toHaveURL('https://www.saucedemo.com/checkout-step-two.html')
        await page.goBack();
    });
    //Nhập ký tự đặc biệt lastname
    test('enter special characters lastname', async () => {
        await page.fill('[data-test="firstName"]', "Dang");
        await page.fill('[data-test="lastName"]', "!@#@!$@$@!$$$!@$#%$^%&*^(*&^%#");
        await page.fill('[data-test="postalCode"]', "08324");
        await page.locator('[data-test="continue"]').click();
        await expect(page).toHaveURL('https://www.saucedemo.com/checkout-step-two.html')
        await page.goBack();
    });


    //Nhập ký tự chữ thường lastname
    test('enter lowercase input lastname', async () => {
        await page.fill('[data-test="firstName"]', "DANG");
        await page.fill('[data-test="lastName"]', "truong");
        await page.fill('[data-test="postalCode"]', "08324");
        await page.locator('[data-test="continue"]').click();
        await expect(page).toHaveURL('https://www.saucedemo.com/checkout-step-two.html')
        await page.goBack();
    });

    //Nhập ký tự chữ in hoa vao lastname
    test('enter uppercase letters lastname', async () => {
        await page.fill('[data-test="firstName"]', "Dang");
        await page.fill('[data-test="lastName"]', "TRUONG");
        await page.fill('[data-test="postalCode"]', "08324");
        await page.locator('[data-test="continue"]').click();
        await expect(page).toHaveURL('https://www.saucedemo.com/checkout-step-two.html')
        await page.goBack();
    });

    //Nhập ký tự số vao lastname
    test('enter number lastname', async () => {
        await page.fill('[data-test="firstName"]', "Dang");
        await page.fill('[data-test="lastName"]', "123444");
        await page.fill('[data-test="postalCode"]', "08324");
        await page.locator('[data-test="continue"]').click();
        await expect(page).toHaveURL('https://www.saucedemo.com/checkout-step-two.html')
        await page.goBack();
    });
    

    // Nhập chữ, số, ký tự đặc biệt vao lastname
    test('enter firtname lastname', async () => {
        await page.fill('[data-test="firstName"]', "Dang");
        await page.fill('[data-test="lastName"]', "Truong123#");
        await page.fill('[data-test="postalCode"]', "08324");
        await page.locator('[data-test="continue"]').click();
        await expect(page).toHaveURL('https://www.saucedemo.com/checkout-step-two.html')
        await page.goBack();
    });
   

    //postal-code
    // TH bỏ trống lastname
    test('Empty postal-code', async () => {
        await page.fill('[data-test="firstName"]', "Dang");
        await page.fill('[data-test="lastName"]', "Dang");
        await page.locator('[data-test="continue"]').click();
        await checkErrorMessage('Error: Postal Code is required');
    });

    // TH nhập space vào firtname
    test('Empty space postal-code', async () => {
        await page.fill('[data-test="firstName"]', "Dang");
        await page.fill('[data-test="lastName"]', "Truong");
        await page.fill('[data-test="postalCode"]', "        ");
        await page.locator('[data-test="continue"]').click();
        await page.goBack();
    });

    // Nhập lastname có khoảng trắng
    test('Enter a space between postal-code', async () => {
        await page.fill('[data-test="firstName"]', "Dang");
        await page.fill('[data-test="lastName"]', "Truong");
        await page.fill('[data-test="postalCode"]', "08        324");
        await page.locator('[data-test="continue"]').click();
        await expect(page).toHaveURL('https://www.saucedemo.com/checkout-step-two.html')
        await page.goBack();
    });
    //Nhập ký tự đặc biệt lastname
    test('enter special characters postal-code', async () => {
        await page.fill('[data-test="firstName"]', "Dang");
        await page.fill('[data-test="lastName"]', "Truong");
        await page.fill('[data-test="postalCode"]', "@#@!$@$@!$$$!@$#%$^%&*^(*&^%#");
        await page.locator('[data-test="continue"]').click();
        await expect(page).toHaveURL('https://www.saucedemo.com/checkout-step-two.html')
        await page.goBack();
    });


    //Nhập ký tự chữ thường lastname
    test('enter lowercase input postal-code', async () => {
        await page.fill('[data-test="firstName"]', "DANG");
        await page.fill('[data-test="lastName"]', "Truong");
        await page.fill('[data-test="postalCode"]', "trndsfdsf");
        await page.locator('[data-test="continue"]').click();
        await expect(page).toHaveURL('https://www.saucedemo.com/checkout-step-two.html')
        await page.goBack();
    });

    //Nhập ký tự chữ in hoa vao lastname
    test('enter uppercase letters postal-code', async () => {
        await page.fill('[data-test="firstName"]', "Dang");
        await page.fill('[data-test="lastName"]', "Truong");
        await page.fill('[data-test="postalCode"]', "HHAHAHA");
        await page.locator('[data-test="continue"]').click();
        await expect(page).toHaveURL('https://www.saucedemo.com/checkout-step-two.html')
        await page.goBack();
    });

    //Nhập ký tự số vao lastname
    test('enter number postal-code', async () => {
        await page.fill('[data-test="firstName"]', "Dang");
        await page.fill('[data-test="lastName"]', "123444");
        await page.fill('[data-test="postalCode"]', "08324");
        await page.locator('[data-test="continue"]').click();
        await expect(page).toHaveURL('https://www.saucedemo.com/checkout-step-two.html')
        await page.goBack();
    });
    

    // Nhập chữ, số, ký tự đặc biệt vao lastname
    test('enter firtname postal-code', async () => {
        await page.fill('[data-test="firstName"]', "Dang");
        await page.fill('[data-test="lastName"]', "Truong123#");
        await page.fill('[data-test="postalCode"]', "Truong08324!@@!›");
        await page.locator('[data-test="continue"]').click();
        await expect(page).toHaveURL('https://www.saucedemo.com/checkout-step-two.html')
        await page.goBack();
    });






    test.afterAll(async () => {
        if (page) {
            await page.close();  
        }
        if (context) {
            await context.close();  
        }
    });
    
})