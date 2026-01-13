import { test, expect } from '@playwright/test';

// Data sets for parameterized testing
const testData = [
  { username: 'user1', password: 'pass1' },
  { username: 'user2', password: 'pass2' },
  { username: 'user3', password: 'pass3' },
];

test.describe('Parameterized Test Demo', () => {

  // Iterate over each data set
  for (const data of testData) {

    test(`Login test for ${data.username}`, async ({ page }) => {

      // Navigate to login page
      await page.goto('https://the-internet.herokuapp.com/login');

      // Fill username and password fields
      await page.fill('#username', data.username);
      await page.fill('#password', data.password);

      // Click login button
      await page.click('button[type="submit"]');

      // Validate successful login or error message
      // Using dynamic assertion depending on username/password
      await expect(page.locator('#flash')).toBeVisible();

    });

  }

});
