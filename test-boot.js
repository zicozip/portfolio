import { chromium } from 'playwright';

(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage();

  // Clear localStorage to simulate first visit
  await page.addInitScript(() => {
    localStorage.clear();
  });

  await page.goto('http://localhost:5173');

  // Wait a bit for boot animation to start
  await page.waitForTimeout(2000);

  await page.screenshot({ path: 'boot-animation-test.png', fullPage: true });

  // Wait for animation to complete
  await page.waitForTimeout(4000);

  await page.screenshot({ path: 'boot-animation-complete.png', fullPage: true });

  await browser.close();
  console.log('Screenshots saved!');
})();
