const { chromium } = require('playwright');
const path = require('path');

async function main() {
  const browser = await chromium.launch();
  const context = await browser.newContext();
  const page = await context.newPage();
  await page.goto('file:///' + path.join(__dirname, 'site/index.html').replace(/\\/g, '/'));
  
  await page.evaluate(() => document.querySelector('.states-car').scrollIntoView({block: 'center'})); await page.waitForTimeout(500);
  
  await page.click('.states-car [data-sc-next]'); // Next
  
  for (let i = 0; i < 10; i++) {
    await page.screenshot({ path: path.join(__dirname, `test_frame_${i}.png`) });
    await page.waitForTimeout(70);
  }

  await browser.close();
}
main().catch(console.error);
