import { test, expect } from '@playwright/test';
import fs from 'fs';
import path from 'path';

/**
 * Read CSV file and convert to array of objects
 */
const readCsv = (filePath: string) => {
  const csvContent = fs.readFileSync(filePath, 'utf-8');
  const lines = csvContent.split('\n').filter(line => line.trim() !== '');
  const headers = lines[0].split(',').map(h => h.trim());
  return lines.slice(1).map(line => {
    const values = line.split(',').map(v => v.trim());
    return headers.reduce((obj: any, header, idx) => {
      obj[header] = values[idx];
      return obj;
    }, {});
  });
};

/**
 * Write array of objects to CSV
 */
const writeCsv = (filePath: string, data: any[]) => {
  if (data.length === 0) return;
  const headers = Object.keys(data[0]);
  const lines = data.map(row => headers.map(h => row[h]).join(','));
  const csvContent = [headers.join(','), ...lines].join('\n');
  fs.writeFileSync(filePath, csvContent, 'utf-8');
};

test.describe('CSV Read & Write Demo', () => {

  const csvFilePath = path.join(__dirname, 'data', 'loginData.csv');
  const outputCsvPath = path.join(__dirname, 'data', 'loginData-output.csv');

  // Read CSV before running tests
  const testData = readCsv(csvFilePath);

  // Iterate through CSV rows
  for (const { username, password } of testData) {

    test(`Login test for ${username} from CSV`, async ({ page }) => {

      // Navigate to login page
      await page.goto('https://the-internet.herokuapp.com/login');

      // Fill username and password from CSV
      await page.fill('#username', username);
      await page.fill('#password', password);

      // Click login button
      await page.click('button[type="submit"]');

      // Validate login response
      await expect(page.locator('#flash')).toBeVisible();

    });

  }

  test('Write CSV after test', async () => {

    // Example: modify data and write to new CSV
    const updatedData = testData.map(row => ({
      ...row,
      status: 'tested'  // Add new column
    }));

    writeCsv(outputCsvPath, updatedData);

    console.log(`CSV written to: ${outputCsvPath}`);

  });

});
