import { Page } from '@playwright/test';
import fs from 'fs';
import path from 'path';

export async function takeScreenshot(page: Page, name: string): Promise<void> {
  const dir = path.resolve(process.cwd(), 'tests/test-results/screenshots');
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }

  const filePath = path.join(dir, `${name}-${Date.now()}.png`);
  await page.screenshot({ path: filePath, fullPage: true });
}
