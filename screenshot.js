import { chromium } from 'playwright';

(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage();
  await page.goto('http://localhost:5173');
  await page.screenshot({ path: 'hero-screenshot.png', fullPage: true });
  await browser.close();
  console.log('Screenshot saved!');
})();
