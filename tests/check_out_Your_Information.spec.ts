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
        
        await expect(errorLocator).toBeVisible({ timeout: 5000 });

        const errorMessage = await errorLocator.textContent();

        await expect(errorMessage.trim()).toBe(expectedMessage);
        const closeButton = await page.locator('[data-test="error-button"]');

        await closeButton.click();
        await expect(errorLocator).not.toBeVisible({ timeout: 5000 });
    };


test.describe('check_out_Your_Information',  () => {
 
    test ('Check button cancel' , async () =>{
        await page.click('[data-test="cancel"]')
        await expect(page).toHaveURL('https://www.saucedemo.com/cart.html')
        page.goBack();
    })

    // Empty firtname, lastname and zipcode
    test('Empty firtname, lastname, postalcode', async () => {
        await page.locator('[data-test="continue"]').click();
        await checkErrorMessage('Error: First Name is required');
    });    
    //Enter data valid 
    test('Enter data valid', async () => {
        await page.fill('[data-test="firstName"]', "Dang");
        await page.fill('[data-test="lastName"]', "Truong");
        await page.fill('[data-test="postalCode"]', "123456");
        await page.locator('[data-test="continue"]').click();
        await expect(page).toHaveURL('https://www.saucedemo.com/checkout-step-two.html')
        page.goBack();
    });   
})

test.describe('check firtname', () => {
    // Empty firtname
    test('Empty firtname', async () => {
        await page.fill('[data-test="lastName"]', "Truong");
        await page.fill('[data-test="postalCode"]', "08324");
        await page.locator('[data-test="continue"]').click();
        await checkErrorMessage('Error: First Name is required');
    });

    // Empty space in firtname
    test('Empty space firtname', async () => {
        await page.fill('[data-test="firstName"]', "          ");
        await page.fill('[data-test="lastName"]', "Truong");
        await page.fill('[data-test="postalCode"]', "08324");
        await page.locator('[data-test="continue"]').click();
        await page.goBack();
    });

    // Enter a space between firtname
    test('Enter a space between firtname', async () => {
        await page.fill('[data-test="firstName"]', "standard_      user");
        await page.fill('[data-test="lastName"]', "Truong");
        await page.fill('[data-test="postalCode"]', "08324");
        await page.locator('[data-test="continue"]').click();
        await expect(page).toHaveURL('https://www.saucedemo.com/checkout-step-two.html')
        await page.goBack();
    });
    //Enter special characters firtname
    test('enter special characters firtname', async () => {
        await page.fill('[data-test="firstName"]', "!@#@!$@$@!$$$!@$#%$^%&*^(*&^%#@!");
        await page.fill('[data-test="lastName"]', "Truong");
        await page.fill('[data-test="postalCode"]', "08324");
        await page.locator('[data-test="continue"]').click();
        await expect(page).toHaveURL('https://www.saucedemo.com/checkout-step-two.html')
        await page.goBack();
    });


    //Enter lowercase input firtname
    test('Enter lowercase input firtname', async () => {
        await page.fill('[data-test="firstName"]', "dang");
        await page.fill('[data-test="lastName"]', "Truong");
        await page.fill('[data-test="postalCode"]', "08324");
        await page.locator('[data-test="continue"]').click();
        await expect(page).toHaveURL('https://www.saucedemo.com/checkout-step-two.html')
        await page.goBack();
    });

    //Enter uppercase letters in firtname
    test('Enter uppercase in firtname', async () => {
        await page.fill('[data-test="firstName"]', "DANG");
        await page.fill('[data-test="lastName"]', "Truong");
        await page.fill('[data-test="postalCode"]', "08324");
        await page.locator('[data-test="continue"]').click();
        await expect(page).toHaveURL('https://www.saucedemo.com/checkout-step-two.html')
        await page.goBack();
    });

    //Enter number in firtname
    test('Enter number in firtname', async () => {
        await page.fill('[data-test="firstName"]', "1234566");
        await page.fill('[data-test="lastName"]', "Truong");
        await page.fill('[data-test="postalCode"]', "08324");
        await page.locator('[data-test="continue"]').click();
        await expect(page).toHaveURL('https://www.saucedemo.com/checkout-step-two.html')
        await page.goBack();
    });
    

    // Nhập chữ, số, ký tự đặc biệt vao firtname
    test('Enter number, text, special characters in firtname', async () => {
        await page.fill('[data-test="firstName"]', "Dang123#");
        await page.fill('[data-test="lastName"]', "Truong");
        await page.fill('[data-test="postalCode"]', "08324");
        await page.locator('[data-test="continue"]').click();
        await expect(page).toHaveURL('https://www.saucedemo.com/checkout-step-two.html')
        await page.goBack();
    });
})

test.describe('check lastname', () => {
     //lastname
    // Empty lastname
    test('Empty lastname', async () => {
        await page.fill('[data-test="firstName"]', "Dang");
        await page.fill('[data-test="postalCode"]', "08324");
        await page.locator('[data-test="continue"]').click();
        await checkErrorMessage('Error: Last Name is required');
    });

    // Empty space in lastname
    test('Empty space in lastname', async () => {
        await page.fill('[data-test="firstName"]', "Dang");
        await page.fill('[data-test="lastName"]', "            ");
        await page.fill('[data-test="postalCode"]', "08324");
        await page.locator('[data-test="continue"]').click();
        await page.goBack();
    });

    // Enter a space between in lastname
    test('Enter a space between lastname', async () => {
        await page.fill('[data-test="firstName"]', "Dang");
        await page.fill('[data-test="lastName"]', "Truo         ng");
        await page.fill('[data-test="postalCode"]', "08324");
        await page.locator('[data-test="continue"]').click();
        await expect(page).toHaveURL('https://www.saucedemo.com/checkout-step-two.html')
        await page.goBack();
    });
    //Enter special characters in lastname
    test('enter special characters in lastname', async () => {
        await page.fill('[data-test="firstName"]', "Dang");
        await page.fill('[data-test="lastName"]', "!@#@!$@$@!$$$!@$#%$^%&*^(*&^%#");
        await page.fill('[data-test="postalCode"]', "08324");
        await page.locator('[data-test="continue"]').click();
        await expect(page).toHaveURL('https://www.saucedemo.com/checkout-step-two.html')
        await page.goBack();
    });


    //Enter lowercase input in lastname
    test('enter lowercase input in lastname', async () => {
        await page.fill('[data-test="firstName"]', "DANG");
        await page.fill('[data-test="lastName"]', "truong");
        await page.fill('[data-test="postalCode"]', "08324");
        await page.locator('[data-test="continue"]').click();
        await expect(page).toHaveURL('https://www.saucedemo.com/checkout-step-two.html')
        await page.goBack();
    });

    //Enter uppercae letters in lastname
    test('Enter uppercase letters in lastname', async () => {
        await page.fill('[data-test="firstName"]', "Dang");
        await page.fill('[data-test="lastName"]', "TRUONG");
        await page.fill('[data-test="postalCode"]', "08324");
        await page.locator('[data-test="continue"]').click();
        await expect(page).toHaveURL('https://www.saucedemo.com/checkout-step-two.html')
        await page.goBack();
    });

    //Enter number in lastname
    test('Enter number in lastname', async () => {
        await page.fill('[data-test="firstName"]', "Dang");
        await page.fill('[data-test="lastName"]', "123444");
        await page.fill('[data-test="postalCode"]', "08324");
        await page.locator('[data-test="continue"]').click();
        await expect(page).toHaveURL('https://www.saucedemo.com/checkout-step-two.html')
        await page.goBack();
    });
    

    // Enter text, number special character in lastname
    test('Enter text, number, special character in lastname', async () => {
        await page.fill('[data-test="firstName"]', "Dang");
        await page.fill('[data-test="lastName"]', "Truong123#");
        await page.fill('[data-test="postalCode"]', "08324");
        await page.locator('[data-test="continue"]').click();
        await expect(page).toHaveURL('https://www.saucedemo.com/checkout-step-two.html')
        await page.goBack();
    });
})

test.describe('check postalcode', () => {
    //postal-code
    // Empty in postal-code
    test('Empty in postal-code', async () => {
        await page.fill('[data-test="firstName"]', "Dang");
        await page.fill('[data-test="lastName"]', "Dang");
        await page.locator('[data-test="continue"]').click();
        await checkErrorMessage('Error: Postal Code is required');
    });

    // Enter space in postal-code
    test('Enter space in postal-code', async () => {
        await page.fill('[data-test="firstName"]', "Dang");
        await page.fill('[data-test="lastName"]', "Truong");
        await page.fill('[data-test="postalCode"]', "        ");
        await page.locator('[data-test="continue"]').click();
        await page.goBack();
    });

    // Enter a space between in postal-code
    test('Enter a space between in postal-code', async () => {
        await page.fill('[data-test="firstName"]', "Dang");
        await page.fill('[data-test="lastName"]', "Truong");
        await page.fill('[data-test="postalCode"]', "08        324");
        await page.locator('[data-test="continue"]').click();
        await expect(page).toHaveURL('https://www.saucedemo.com/checkout-step-two.html')
        await page.goBack();
    });
    //Enter special characters postal-code
    test('Enter special characters postal-code', async () => {
        await page.fill('[data-test="firstName"]', "Dang");
        await page.fill('[data-test="lastName"]', "Truong");
        await page.fill('[data-test="postalCode"]', "@#@!$@$@!$$$!@$#%$^%&*^(*&^%#");
        await page.locator('[data-test="continue"]').click();
        await expect(page).toHaveURL('https://www.saucedemo.com/checkout-step-two.html')
        await page.goBack();
    });


    //Enter lowercase input in postal-code
    test('Enter lowercase input in postal-code', async () => {
        await page.fill('[data-test="firstName"]', "DANG");
        await page.fill('[data-test="lastName"]', "Truong");
        await page.fill('[data-test="postalCode"]', "trndsfdsf");
        await page.locator('[data-test="continue"]').click();
        await expect(page).toHaveURL('https://www.saucedemo.com/checkout-step-two.html')
        await page.goBack();
    });

    //Enter uppercase letters in postal-code
    test('Enter uppercase letters in postal-code', async () => {
        await page.fill('[data-test="firstName"]', "Dang");
        await page.fill('[data-test="lastName"]', "Truong");
        await page.fill('[data-test="postalCode"]', "HHAHAHA");
        await page.locator('[data-test="continue"]').click();
        await expect(page).toHaveURL('https://www.saucedemo.com/checkout-step-two.html')
        await page.goBack();
    });

    //enter number in postal-code 
    test('Enter number in postal-code', async () => {
        await page.fill('[data-test="firstName"]', "Dang");
        await page.fill('[data-test="lastName"]', "123444");
        await page.fill('[data-test="postalCode"]', "08324");
        await page.locator('[data-test="continue"]').click();
        await expect(page).toHaveURL('https://www.saucedemo.com/checkout-step-two.html')
        await page.goBack();
    });
    

    // Nhập chữ, số, ký tự đặc biệt vao postal-code
    test('Enter text, number, special character in postal-code', async () => {
        await page.fill('[data-test="firstName"]', "Dang");
        await page.fill('[data-test="lastName"]', "Truong123#");
        await page.fill('[data-test="postalCode"]', "Truong08324!@@!›");
        await page.locator('[data-test="continue"]').click();
        await expect(page).toHaveURL('https://www.saucedemo.com/checkout-step-two.html')
        await page.goBack();
    });

})
 test.afterAll(async () => {
        if (page) {
            await page.close();  
        }
        if (context) {
            await context.close();  
        }
    });