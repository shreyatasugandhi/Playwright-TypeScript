import { test, expect, Browser, chromium } from '@playwright/test'

test('Playwright Locator Techniques Demo', async ({ page }) => {
  const browser: Browser = await chromium.launch({
    headless: false,
    channel: 'chrome'
  });

  await page.goto('http://zero.webappsecurity.com/login.html')

  /* ============================================================
     1. Locate by ID
     Most stable and preferred when available
  ============================================================ */
  await page.locator('#user_login').fill('username')

  /* ============================================================
     2. Locate by Name attribute
     Useful when ID is missing
  ============================================================ */
  await page.locator('[name="user_password"]').fill('password')

  /* ============================================================
     3. Locate by CSS Selector
     Industry standard, flexible and fast
  ============================================================ */
  await page.locator('input.form-control').first().fill('cssUser')

  /* ============================================================
     4. Locate by XPath
     Use sparingly, but powerful for legacy apps
  ============================================================ */
  await page.locator('//input[@id="user_login"]').fill('xpathUser')

  /* ============================================================
     5. Locate by Text
     Best for links, buttons, visible labels
  ============================================================ */
  await page.locator('text=Sign in').click()

  /* ============================================================
     6. Locate by Partial Text
     Good for dynamic text
  ============================================================ */
  await page.locator('text=Sign').click()

  /* ============================================================
     7. Locate by Role (Recommended by Playwright)
     Accessibility-driven and future-proof
  ============================================================ */
  await page.getByRole('button', { name: 'Sign in' }).click()

  /* ============================================================
     8. Locate by Placeholder
     Excellent for modern UI forms
  ============================================================ */
  await page.getByPlaceholder('Login').fill('placeholderUser')

  /* ============================================================
     9. Locate by Label
     Strongly aligned with accessibility standards
  ============================================================ */
  await page.getByLabel('Password').fill('labelPassword')

  /* ============================================================
     10. Chained Locators
     Improves precision and readability
  ============================================================ */
  await page.locator('form').locator('#user_login').fill('chainedUser')

  /* ============================================================
     11. Index-based Locator
     Use only when no better option exists
  ============================================================ */
  await page.locator('input').nth(0).fill('indexUser')

  /* ============================================================
     12. Attribute-based Locator
     Flexible and resilient
  ============================================================ */
  await page.locator('input[type="text"]').fill('attributeUser')

})
