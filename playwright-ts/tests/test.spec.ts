import { test, expect, Locator, selectors } from "@playwright/test";

test('working with dropdowns', async ({ page }) => {
    await page.goto('http://zero.webappsecurity.com/')
    await expect(page).toHaveTitle('Zero - Personal Banking - Loans - Credit Cards')

    
    // Cllicking on signin button
    await page.getByRole('button', {name: 'Signin'}).click()
    

    // LogIn
    await page.locator('id=user_login').fill('username')
    await page.locator('id=user_password').fill('password')
    await page.locator('[name=submit]').click()
    await page.goBack()

    await page.goto('http://zero.webappsecurity.com/bank/pay-bills.html')
    await page.locator('text=Purchase Foreign Currency').click()
    await page.getByRole('radio', {name: 'U.S. dollar (USD)'}).check();
    
    // locate the select box
    const selbox: Locator = await page.locator('id=pc_currency')
    selbox.selectOption({ value: 'DKK'})
    selbox.selectOption({ index: 8})
    selbox.selectOption({ label: 'China (yuan)'})

    await page.selectOption('id=pc_currency', { value: 'MXN' });

    // const allOptions = await page.$$(selbox + ' > option');
    const allOptions = await page.$$('#pc_currency > option');


    console.log(allOptions.length)

    

    await page.waitForTimeout(3000)

})