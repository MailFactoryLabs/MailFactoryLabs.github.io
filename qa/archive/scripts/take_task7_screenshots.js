const { chromium } = require('playwright');
const path = require('path');

async function main() {
  const browser = await chromium.launch({ headless: true });
  
  // Desktop
  let context = await browser.newContext({ viewport: { width: 1280, height: 1000 } });
  let page = await context.newPage();
  await page.goto('http://localhost:8080');
  await page.evaluate(() => { document.querySelector('#s-pulse').scrollIntoView(); });
  await page.waitForTimeout(2000);
  await page.screenshot({ path: path.join(__dirname, 'task7_pulse_desktop.png') });
  await context.close();

  // Tablet
  context = await browser.newContext({ viewport: { width: 768, height: 1024 } });
  page = await context.newPage();
  await page.goto('http://localhost:8080');
  await page.evaluate(() => { document.querySelector('#s-pulse').scrollIntoView(); });
  await page.waitForTimeout(2000);
  await page.screenshot({ path: path.join(__dirname, 'task7_pulse_tablet.png') });
  await context.close();

  // Mobile
  context = await browser.newContext({ viewport: { width: 375, height: 812 } });
  page = await context.newPage();
  await page.goto('http://localhost:8080');
  await page.evaluate(() => { document.querySelector('#s-pulse').scrollIntoView(); });
  await page.waitForTimeout(2000);
  await page.screenshot({ path: path.join(__dirname, 'task7_pulse_mobile.png') });
  await context.close();

  await browser.close();
}
main().catch(console.error);
