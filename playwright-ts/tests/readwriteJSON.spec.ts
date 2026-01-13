import { test, expect } from '@playwright/test';
import fs from 'fs';
import path from 'path';

/**
 * Ensure folder exists, create if missing
 */
const ensureFolder = (folderPath: string) => {
  if (!fs.existsSync(folderPath)) {
    fs.mkdirSync(folderPath, { recursive: true });
    console.log(`Folder created: ${folderPath}`);
  }
};

/**
 * Write JSON data to file
 */
const writeJson = (filePath: string, data: any) => {
  fs.writeFileSync(filePath, JSON.stringify(data, null, 2), 'utf-8');
  console.log(`JSON file written: ${filePath}`);
};

/**
 * Read JSON data from file
 */
const readJson = (filePath: string) => {
  const content = fs.readFileSync(filePath, 'utf-8');
  return JSON.parse(content);
};

test('Create folder, write JSON, then read it', async ({ page }) => {

  const folderPath = path.join(__dirname, 'data');
  const jsonFilePath = path.join(folderPath, 'loginData.json');

  // Ensure folder exists
  ensureFolder(folderPath);

  // Sample data to write
  const sampleData = [
    { username: 'user1', password: 'pass1' },
    { username: 'user2', password: 'pass2' },
    { username: 'user3', password: 'pass3' }
  ];

  // Write JSON file
  writeJson(jsonFilePath, sampleData);

  // Read back the JSON file
  const testData = readJson(jsonFilePath);
  console.log('Read JSON data:', testData);

  // Example usage in test: navigate and log usernames
  await page.goto('https://the-internet.herokuapp.com/login');
  
  for (const { username, password } of testData) {
    console.log(`Ready to test login for: ${username}`);
    // Actual login steps can be added here
  }

});
