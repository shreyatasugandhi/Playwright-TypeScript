import { test, expect } from '@playwright/test';
import path from 'path';
import fs from 'fs';


test('File upload example', async ({ page }) => {

  await page.goto('https://the-internet.herokuapp.com/upload');

  // Absolute path to the file you want to upload
  const filePath = path.resolve(__dirname, 'Sample.txt');

  // Upload file
  await page.setInputFiles('input#file-upload', filePath);

  // Click Upload button
  await page.locator('input#file-submit').click();

  // Validate upload success
  await expect(page.locator('h3')).toHaveText('File Uploaded!');
  await expect(page.locator('#uploaded-files')).toHaveText('Sample.txt');
});



test('File download example', async ({ page, context }) => {

  await page.goto('https://the-internet.herokuapp.com/download');

  // Prepare download folder
  const downloadPath = path.resolve(__dirname, 'downloads');
  if (!fs.existsSync(downloadPath)) fs.mkdirSync(downloadPath, { recursive: true });

  // Listen for download
  const [download] = await Promise.all([
    page.waitForEvent('download'),  // Wait for download event
    page.locator('a:has-text("some-file.txt")').click()  // Replace with actual file name on site
  ]);

  // Save downloaded file
  const filePath = path.join(downloadPath, await download.suggestedFilename());
  await download.saveAs(filePath);

  // Validate file exists
  expect(fs.existsSync(filePath)).toBeTruthy();
});
