import { test, expect, Browser, Page, Locator } from '@playwright/test'
import { chromium } from 'playwright'

test('Zero Bank full locator and interaction demo', async () => {

  const browser: Browser = await chromium.launch({ headless: false, channel: 'chrome' });
  const page: Page = await browser.newPage();

  // ---------------------------
  // Step 1: Home Page
  // ---------------------------
  await page.goto('http://zero.webappsecurity.com/');

  // Text selector - Click Sign in
  const signInBtn: Locator = page.locator('text=Signin');
  console.log('Sign in visible:', await signInBtn.isVisible());
  await signInBtn.click();

  // ---------------------------
  // Step 2: Login Page
  // ---------------------------
  const username: Locator = page.locator('#user_login'); // CSS selector by ID
  const password: Locator = page.locator('#user_password'); // CSS selector by ID
  const loginBtn: Locator = page.locator('input[type="submit"][value="Sign in"]'); // CSS attribute

  console.log('Username editable:', await username.isEditable());
  console.log('Password editable:', await password.isEditable());
  console.log('Login enabled:', await loginBtn.isEnabled());

  // Enter invalid credentials to trigger error page
  await username.fill('invalidUser');
  await password.fill('invalidPass');
  await loginBtn.click();

  // Check if error page appears using text locator
  const errorText: Locator = page.locator('text=Login and/or password are wrong');
  if (await errorText.count() > 0) {
    console.log('Error appeared:', await errorText.textContent());

    // Navigate back to login/home page
    await page.goBack();
  }

  // ---------------------------
  // Step 3: Login successfully
  // ---------------------------
  await username.fill('username'); // replace with valid test user
  await password.fill('password'); // replace with valid password
  await loginBtn.click();

//   const accountSummary: Locator = page.locator('text=Account Summary');
//   await expect(accountSummary).toBeVisible();
//   console.log('Logged in successfully');

  // Navigate back to login/home page
    await page.goBack();


  // ---------------------------
  // Step 4: Navigate to Pay Bills
  // ---------------------------
  await page.locator('text=Pay Bills').click();

  // ---------------------------
  // Step 5: Add Payee Page - Interactions
  // ---------------------------
  await page.locator('text=Add New Payee').click();

  // Text and CSS selectors
  const payeeName: Locator = page.locator('#np_new_payee_name');
  const payeeAddress: Locator = page.locator('#np_new_payee_address');
  const account: Locator = page.locator('#np_new_payee_account');
  const details: Locator = page.locator('#np_new_payee_details');

  await payeeName.fill('Playwright Payee');
  await payeeAddress.fill('123 Test Street');
  await account.fill('123456');
  await details.fill('Test automation payee');

  console.log('Payee Name visible:', await payeeName.isVisible());
  console.log('Account editable:', await account.isEditable());

  // Checkbox example
  const emailCheckbox: Locator = page.locator('#np_new_payee_emailNotification');
  if (!(await emailCheckbox.isChecked())) {
    await emailCheckbox.check();
  }
  console.log('Email checkbox checked:', await emailCheckbox.isChecked());

  // Radio button example (use chained locator for radio group)
  const paymentRadio: Locator = page.locator('#np_new_payee_paymentMethod input[type="radio"]');
  await paymentRadio.first().check();
  console.log('Radio first option checked:', await paymentRadio.first().isChecked());

  // Select box example
  const accountDropdown: Locator = page.locator('#np_new_payee_account');
  await accountDropdown.selectOption('123456');
  console.log('Dropdown option selected:', await accountDropdown.inputValue());

  // Submit new payee
  const addPayeeBtn: Locator = page.locator('#add_new_payee');
  await addPayeeBtn.click();

  // Verify confirmation message using text locator
  const payeeConfirmation: Locator = page.locator('text=The new payee Playwright Payee was successfully created.');
  await expect(payeeConfirmation).toBeVisible();
  console.log('Payee confirmation:', await payeeConfirmation.textContent());

  // ---------------------------
  // Step 6: Navigate to Fund Transfer
  // ---------------------------
  await page.locator('text=Transfer Funds').click();

  const fromAccount: Locator = page.locator('#tf_fromAccountId');
  const toAccount: Locator = page.locator('#tf_toAccountId');
  const amount: Locator = page.locator('#tf_amount');
  const transferBtn: Locator = page.locator('#btn_submit');

  await fromAccount.selectOption('Savings'); // CSS selector for select box
  await toAccount.selectOption('Checking');
  await amount.fill('500');

  console.log('Amount editable:', await amount.isEditable());
  console.log('Transfer button enabled:', await transferBtn.isEnabled());

  await transferBtn.click();

  // Verify transfer confirmation
  const transferConfirmation: Locator = page.locator('text=You successfully submitted your transaction.');
  await expect(transferConfirmation).toBeVisible();
  console.log('Transfer confirmation:', await transferConfirmation.textContent());

  // Close browser
  await browser.close();

});
