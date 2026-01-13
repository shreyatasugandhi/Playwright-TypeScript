import { test, expect, Browser, Page, Locator } from '@playwright/test'
import { chromium } from 'playwright'

test('Zero Bank – Interaction with different web elements', async () => {

  const browser: Browser = await chromium.launch({
    headless: false,
    channel: 'chrome'
  });

  const page: Page = await browser.newPage();

  // ------------------------------------------------
  // Step 1: Launch Application & Login
  // ------------------------------------------------
  await page.goto('http://zero.webappsecurity.com/');

  const signInBtn: Locator = page.locator('text=Signin');
  await signInBtn.click();

  const username: Locator = page.locator('#user_login');
  const password: Locator = page.locator('#user_password');
  const loginBtn: Locator = page.locator('input[type="submit"][value="Sign in"]');

  await username.fill('username');
  await password.fill('password');
  await loginBtn.click();

  // ------------------------------------------------
  // Step 2: Handle Security Error Page
  // ------------------------------------------------
  const securityError: Locator = page.locator('text=This site can’t provide a secure connection');
  if (await securityError.count() > 0) {
    console.log('Security error page detected');

    // Navigate back to home page
    await page.goBack();
    await page.goto('http://zero.webappsecurity.com/');
  }

  // ------------------------------------------------
  // Step 3: Navigate to Transfer Funds Page
  // ------------------------------------------------
  const transferFundsLink: Locator = page.locator('text=Transfer Funds');
  await expect(transferFundsLink).toBeVisible();
  await transferFundsLink.click();

  // ------------------------------------------------
  // Step 4: Interact with Different Elements
  // ------------------------------------------------

  // 1️⃣ Select box / Dropdown
  const fromAccount: Locator = page.locator('#tf_fromAccountId');
  const toAccount: Locator = page.locator('#tf_toAccountId');

  console.log('From Account enabled:', await fromAccount.isEnabled());
  await fromAccount.selectOption('Savings');

  console.log('To Account enabled:', await toAccount.isEnabled());
  await toAccount.selectOption('Checking');

  // 2️⃣ Textbox
  const amount: Locator = page.locator('#tf_amount');
  console.log('Amount editable:', await amount.isEditable());
  await amount.fill('250');

  const description: Locator = page.locator('#tf_description');
  await description.fill('Playwright fund transfer demo');

  // 3️⃣ Button
  const continueBtn: Locator = page.locator('#btn_submit');
  console.log('Continue button enabled:', await continueBtn.isEnabled());
  await continueBtn.click();

  // ------------------------------------------------
  // Step 5: Confirmation Page Interactions
  // ------------------------------------------------
  const confirmBtn: Locator = page.locator('#btn_submit');
  await expect(confirmBtn).toBeVisible();
  await confirmBtn.click();

  // ------------------------------------------------
  // Step 6: Validate Result Using Text Locator
  // ------------------------------------------------
  const successMsg: Locator = page.locator('text=You successfully submitted your transaction.');
  await expect(successMsg).toBeVisible();
  console.log('Success Message:', await successMsg.textContent());

  // ------------------------------------------------
  // Step 7: Checkbox & Radio Button Demo (Pay Bills)
  // ------------------------------------------------
  await page.locator('text=Pay Bills').click();
  await page.locator('text=Add New Payee').click();

  // Checkbox
  const notificationCheckbox: Locator = page.locator('#np_new_payee_emailNotification');
  if (!(await notificationCheckbox.isChecked())) {
    await notificationCheckbox.check();
  }
  console.log('Checkbox checked:', await notificationCheckbox.isChecked());

  // Radio Button (chained selector)
  const radioButtons: Locator = page.locator('#np_new_payee_paymentMethod input[type="radio"]');
  await radioButtons.first().check();
  console.log('Radio selected:', await radioButtons.first().isChecked());

  await browser.close();

});
