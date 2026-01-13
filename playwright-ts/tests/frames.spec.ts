import { test, expect } from '@playwright/test';

test('Insert text into iframe using TinyMCE API', async ({ page }) => {

  await page.goto('https://the-internet.herokuapp.com/iframe');

  const frame = page.frameLocator('#mce_0_ifr');
  const editorBody = frame.locator('body');

  // Insert text using TinyMCE API (only valid approach for this page)
  const textToInsert = 'Text inserted successfully using Playwright';

  await page.evaluate((text) => {
    // @ts-ignore
    tinymce.activeEditor.setContent(text);
  }, textToInsert);

  // Validate inserted text inside iframe
  await expect(editorBody).toContainText(textToInsert);
});

test('Insert text into nested frame using JavaScript', async ({ page }) => {

  await page.goto('https://the-internet.herokuapp.com/nested_frames');

  // Access bottom frame
  const bottomFrame = page.frame({ name: 'frame-bottom' });

  // Insert text into the frame body using JS
  const textToInsert = 'Text inserted into bottom nested frame';

  await bottomFrame!.evaluate((text) => {
    document.body.innerText = text;
  }, textToInsert);

  // Validate inserted text
  await expect(bottomFrame!.locator('body'))
    .toHaveText(textToInsert);
});


test('Insert text into LEFT nested frame', async ({ page }) => {

  await page.goto('https://the-internet.herokuapp.com/nested_frames');

  // Access top frame
  const topFrame = page.frame({ name: 'frame-top' });

  // Access left child frame
  const leftFrame = topFrame!
    .childFrames()
    .find(frame => frame.name() === 'frame-left');

  const textToInsert = 'Text inserted into LEFT frame';

  // Insert text via JS
  await leftFrame!.evaluate((text) => {
    document.body.innerText = text;
  }, textToInsert);

  // Validate text
  await expect(leftFrame!.locator('body'))
    .toHaveText(textToInsert);
});
