import {test, expect} from '@playwright/test'
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

        const errorMessage = await errorLocator.textContent();

        await expect(errorMessage.trim()).toBe(expectedMessage);
        const closeButton = await page.locator('[data-test="error-button"]');

        await closeButton.click();
    };


test.describe('check_out_Your_Information',  () => {
 
    test ('Check click button cancel' , async () =>{
        await page.click('[data-test="cancel"]')
        await expect(page).toHaveURL('https://www.saucedemo.com/cart.html')
        page.goBack();
    }) 

    test ('Check login accessfull', async () => {
        await page.fill('[data-test="firstName"]', "Dang");
        await page.fill('[data-test="lastName"]', "Truong");
        await page.fill('[data-test="postalCode"]', "123456");
        await page.locator('[data-test="continue"]').click();
        await expect(page).toHaveURL('https://www.saucedemo.com/checkout-step-two.html')
        page.goBack();
    });     
})

test.describe('Check empty fields',  () => {
    test('Check empty firtname, lastname, postalcode', async () => {
        await page.locator('[data-test="continue"]').click();
        await checkErrorMessage('Error: First Name is required');
    });

    test('check empty in firtname field', async () => {
        await page.fill('[data-test="lastName"]', "Truong");
        await page.fill('[data-test="postalCode"]', "08324");
        await page.locator('[data-test="continue"]').click();
        await checkErrorMessage('Error: First Name is required');
    });

    test('Check empty in lastname field', async () => {
        await page.fill('[data-test="firstName"]', "Dang");
        await page.fill('[data-test="lastName"]', "");
        await page.fill('[data-test="postalCode"]', "08324");
        await page.locator('[data-test="continue"]').click();
        await page.waitForLoadState('networkidle')
        await checkErrorMessage('Error: Last Name is required');
    });

     test('Check empty in postal-code field', async () => {
        await page.fill('[data-test="firstName"]', "Dang");
        await page.fill('[data-test="lastName"]', "Truong");
        await page.fill('[data-test="postalCode"]', "");
        await page.locator('[data-test="continue"]').click();
        await page.waitForLoadState('networkidle')
        await checkErrorMessage('Error: Postal Code is required');
    });
})

test.describe('check firtname', () => {
    // Empty space in firtname
    test('Check empty space firtname', async () => {
        await page.fill('[data-test="firstName"]', "          ");
        await page.fill('[data-test="lastName"]', "Truong");
        await page.fill('[data-test="postalCode"]', "08324");
        await page.locator('[data-test="continue"]').click();
    });

    // Enter a space between firtname
    test('Check enter a space between firtname', async () => {
        await page.fill('[data-test="firstName"]', "standard_      user");
        await page.fill('[data-test="lastName"]', "Truong");
        await page.fill('[data-test="postalCode"]', "08324");
        await page.locator('[data-test="continue"]').click();
        await expect(page).toHaveURL('https://www.saucedemo.com/checkout-step-two.html')
    });
    //Enter special characters firtname
    test('Check enter special characters firtname', async () => {
        await page.fill('[data-test="firstName"]', "!@#@!$@$@!$$$!@$#%$^%&*^(*&^%#@!");
        await page.fill('[data-test="lastName"]', "Truong");
        await page.fill('[data-test="postalCode"]', "08324");
        await page.locator('[data-test="continue"]').click();
        await expect(page).toHaveURL('https://www.saucedemo.com/checkout-step-two.html')
    });


    //Enter lowercase input firtname
    test('Check enter lowercase input firtname', async () => {
        await page.fill('[data-test="firstName"]', "dang");
        await page.fill('[data-test="lastName"]', "Truong");
        await page.fill('[data-test="postalCode"]', "08324");
        await page.locator('[data-test="continue"]').click();
        await expect(page).toHaveURL('https://www.saucedemo.com/checkout-step-two.html')
    });

    //Enter uppercase letters in firtname
    test('Check enter uppercase in firtname', async () => {
        await page.fill('[data-test="firstName"]', "DANG");
        await page.fill('[data-test="lastName"]', "Truong");
        await page.fill('[data-test="postalCode"]', "08324");
        await page.locator('[data-test="continue"]').click();
        await expect(page).toHaveURL('https://www.saucedemo.com/checkout-step-two.html')
    });

    //Enter number in firtname
    test('Check enter number in firtname', async () => {
        await page.fill('[data-test="firstName"]', "1234566");
        await page.fill('[data-test="lastName"]', "Truong");
        await page.fill('[data-test="postalCode"]', "08324");
        await page.locator('[data-test="continue"]').click();
        await expect(page).toHaveURL('https://www.saucedemo.com/checkout-step-two.html')
    });
    

    // Nhập chữ, số, ký tự đặc biệt vao firtname
    test('Check enter number, text, special characters in firtname', async () => {
        await page.fill('[data-test="firstName"]', "Dang123#");
        await page.fill('[data-test="lastName"]', "Truong");
        await page.fill('[data-test="postalCode"]', "08324");
        await page.locator('[data-test="continue"]').click();
        await expect(page).toHaveURL('https://www.saucedemo.com/checkout-step-two.html')
    });

    test.afterEach(async () =>{
        await page.goBack();
    })
})

test.describe('check lastname field ', () => {

    // Empty space in lastname
    test('Check empty space in lastname field', async () => {
        await page.fill('[data-test="firstName"]', "Dang");
        await page.fill('[data-test="lastName"]', "            ");
        await page.fill('[data-test="postalCode"]', "08324");
        await page.locator('[data-test="continue"]').click();
    });

    // Enter a space between in lastname
    test('Check enter a space between lastname field ', async () => {
        await page.fill('[data-test="firstName"]', "Dang");
        await page.fill('[data-test="lastName"]', "Truo         ng");
        await page.fill('[data-test="postalCode"]', "08324");
        await page.locator('[data-test="continue"]').click();
        await expect(page).toHaveURL('https://www.saucedemo.com/checkout-step-two.html')
    });
    //Enter special characters in lastname
    test('Check enter special characters in lastname field', async () => {
        await page.fill('[data-test="firstName"]', "Dang");
        await page.fill('[data-test="lastName"]', "!@#@!$@$@!$$$!@$#%$^%&*^(*&^%#");
        await page.fill('[data-test="postalCode"]', "08324");
        await page.locator('[data-test="continue"]').click();
        await expect(page).toHaveURL('https://www.saucedemo.com/checkout-step-two.html')
    });


    //Enter lowercase input in lastname
    test('Check enter lowercase input in lastname field', async () => {
        await page.fill('[data-test="firstName"]', "DANG");
        await page.fill('[data-test="lastName"]', "truong");
        await page.fill('[data-test="postalCode"]', "08324");
        await page.locator('[data-test="continue"]').click();
        await expect(page).toHaveURL('https://www.saucedemo.com/checkout-step-two.html')
    });

    //Enter uppercae letters in lastname
    test('Check enter uppercase letters in lastname field', async () => {
        await page.fill('[data-test="firstName"]', "Dang");
        await page.fill('[data-test="lastName"]', "TRUONG");
        await page.fill('[data-test="postalCode"]', "08324");
        await page.locator('[data-test="continue"]').click();
        await expect(page).toHaveURL('https://www.saucedemo.com/checkout-step-two.html')
    });

    //Enter number in lastname
    test('Check enter number in lastname field', async () => {
        await page.fill('[data-test="firstName"]', "Dang");
        await page.fill('[data-test="lastName"]', "123444");
        await page.fill('[data-test="postalCode"]', "08324");
        await page.locator('[data-test="continue"]').click();
        await expect(page).toHaveURL('https://www.saucedemo.com/checkout-step-two.html')
    });
    

    // Enter text, number special character in lastname
    test('Check enter text, number, special character in lastname field', async () => {
        await page.fill('[data-test="firstName"]', "Dang");
        await page.fill('[data-test="lastName"]', "Truong123#");
        await page.fill('[data-test="postalCode"]', "08324");
        await page.locator('[data-test="continue"]').click();
        await expect(page).toHaveURL('https://www.saucedemo.com/checkout-step-two.html')
    });

    test.afterEach(async () =>{
        await page.goBack();
    })
})

test.describe('check postalcode field', () => {
    // Enter space in postal-code
    test('Check enter space in postal-code field', async () => {
        await page.fill('[data-test="firstName"]', "Dang");
        await page.fill('[data-test="lastName"]', "Truong");
        await page.fill('[data-test="postalCode"]', "        ");
        await page.locator('[data-test="continue"]').click();
    });

    // Enter a space between in postal-code
    test('Check enter a space between in postal-code field', async () => {
        await page.fill('[data-test="firstName"]', "Dang");
        await page.fill('[data-test="lastName"]', "Truong");
        await page.fill('[data-test="postalCode"]', "08        324");
        await page.locator('[data-test="continue"]').click();
        await expect(page).toHaveURL('https://www.saucedemo.com/checkout-step-two.html')
    });
    //Enter special characters postal-code
    test('Check enter special characters postal-code field', async () => {
        await page.fill('[data-test="firstName"]', "Dang");
        await page.fill('[data-test="lastName"]', "Truong");
        await page.fill('[data-test="postalCode"]', "@#@!$@$@!$$$!@$#%$^%&*^(*&^%#");
        await page.locator('[data-test="continue"]').click();
        await expect(page).toHaveURL('https://www.saucedemo.com/checkout-step-two.html')
    });


    //Enter lowercase input in postal-code
    test('Check enter lowercase input in postal-code field', async () => {
        await page.fill('[data-test="firstName"]', "DANG");
        await page.fill('[data-test="lastName"]', "Truong");
        await page.fill('[data-test="postalCode"]', "trndsfdsf");
        await page.locator('[data-test="continue"]').click();
        await expect(page).toHaveURL('https://www.saucedemo.com/checkout-step-two.html')
    });

    //Enter uppercase letters in postal-code
    test('Check enter uppercase letters in postal-code Field', async () => {
        await page.fill('[data-test="firstName"]', "Dang");
        await page.fill('[data-test="lastName"]', "Truong");
        await page.fill('[data-test="postalCode"]', "HHAHAHA");
        await page.locator('[data-test="continue"]').click();
        await expect(page).toHaveURL('https://www.saucedemo.com/checkout-step-two.html')
    });

    //enter number in postal-code 
    test('Check enter number in postal-code field', async () => {
        await page.fill('[data-test="firstName"]', "Dang");
        await page.fill('[data-test="lastName"]', "123444");
        await page.fill('[data-test="postalCode"]', "08324");
        await page.locator('[data-test="continue"]').click();
        await expect(page).toHaveURL('https://www.saucedemo.com/checkout-step-two.html')
    });
    

    // Nhập chữ, số, ký tự đặc biệt vao postal-code
    test('Check enter text, number, special character in postal-code field', async () => {
        await page.fill('[data-test="firstName"]', "Dang");
        await page.fill('[data-test="lastName"]', "Truong123#");
        await page.fill('[data-test="postalCode"]', "Truong08324!@@!›");
        await page.locator('[data-test="continue"]').click();
        await expect(page).toHaveURL('https://www.saucedemo.com/checkout-step-two.html')
    });

    test.afterEach(async () =>{
        await page.goBack();
    })

})
 test.afterAll(async () => {
        if (page) {
            await page.close();  
        }
        if (context) {
            await context.close();  
        }
    });