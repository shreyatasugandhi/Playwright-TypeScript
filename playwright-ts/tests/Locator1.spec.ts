import { test, expect, Browser, Page, Locator } from '@playwright/test'
import { chromium } from 'playwright'

test('Zero Bank locator test – Home, Login, Feedback', async () => {

  const browser: Browser = await chromium.launch({
    headless: false,
    channel: 'chrome'
  });

  const page: Page = await browser.newPage();

  await page.goto('http://zero.webappsecurity.com/');

  // ----------------------------
  // Home Page Locators
  // ----------------------------

  // 1. ID locator
  const searchBox: Locator = page.locator('#searchTerm');
  await searchBox.fill('online banking');

  // 2. Class name locator
  const logo: Locator = page.locator('.brand');
  console.log(await logo.isVisible());

  // 3. Text locator
  const signInBtn: Locator = page.locator('text=Signin');
  console.log(await signInBtn.isEnabled());
  await signInBtn.click();

  // ----------------------------
  // Login Page Locators
  // ----------------------------

  // 4. CSS locator
  const username: Locator = page.locator('css=input#user_login');
  const password: Locator = page.locator('css=input#user_password');

  await username.fill('username');
  await password.fill('password');

  // 5. XPath locator
  const submitBtn: Locator = page.locator('xpath=//input[@name="submit"]');
  console.log(await submitBtn.isEnabled());

  // navigate back intentionally (demo purpose)
  await page.goBack();

  // ----------------------------
  // Feedback Page Locators
  // ----------------------------

  const feedbackLink: Locator = page.locator('text=Feedback');
  await feedbackLink.click();

  const name: Locator = page.locator('#name');
  const email: Locator = page.locator('#email');
  const subject: Locator = page.locator('#subject');
  const comment: Locator = page.locator('#comment');

  await name.fill('Playwright User');
  await email.fill('playwright@test.com');
  await subject.fill('Automation Feedback');
  await comment.fill('Locator strategy validation using Playwright');

  await browser.close();

});
