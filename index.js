const puppeteer = require('puppeteer');

const url = "https://www.okx.com/account/register";

(async () => {
    const browser = await puppeteer.launch({headless: false});
    const page = await browser.newPage();

    await page.goto('https://www.okx.com/account/register');

    // Wait for the element with the class "login-tabs-pane-list-container" to appear
    await page.waitForSelector('.login-tabs-pane-list-flex-shrink');

    //Clicking the Email tab
    await page.evaluate(() => {
        const elements = document.getElementsByClassName('login-tabs-pane-list-flex-shrink')[0].children;
        elements[1].click();
      });


    // Type text into the input field
    // Use page.evaluate to execute your JavaScript code in the browser context
    await page.evaluate(() => {
        const inputElement = document.getElementsByClassName('login-input-box account-input-wrapper')[0].children[1];

        // Check if the input element is found
        if (inputElement) {
        // Focus on the input field
        inputElement.focus();
        }
    });

    // Type text into the input field using page.keyboard
    await page.keyboard.type('makaren@gmail.com');

    // Trigger a blur event to focus out (simulate user clicking outside)
    await page.evaluate(() => {
        const inputElement = document.getElementsByClassName('login-input-box account-input-wrapper')[0].children[1];
        if (inputElement) {
        const blurEvent = new Event('blur', { bubbles: true });
        inputElement.dispatchEvent(blurEvent);
        }
    });


    // Click the submit button with the id "register-submit-btn"
    await page.click('#register-submit-btn');

    // Wait for the submit button to disappear
    await page.waitForSelector('#register-submit-btn', { hidden: true, timeout: 5000 }).catch(() => {});

    // Check if the element with class "verify-input-container" is now on the page
    const verifyInputContainerExists = await page.$('.verify-input-container');

    if (verifyInputContainerExists) {
        // Find all the "code-section" divs
        let verificationCode = "129031";

        const codeSections = await page.$$('.code-section');

        for (let i = 0; i < codeSections.length; i++) {
            const inputElement = await codeSections[i].$('input[type="tel"]');

            // Type the digit into the input field
            await inputElement.type(verificationCode.slice(i,i+1));
        }
    }

    let iSet = false;
    //Just In case Click
    if(iSet){
        await page.evaluate(() => {
            const loginElement = document.getElementsByClassName('login')[0];
            loginElement.click();
        });
    }

    await browser.close();
 })();