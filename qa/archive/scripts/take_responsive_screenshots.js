const { chromium } = require('playwright');
const path = require('path');

async function main() {
  const browser = await chromium.launch();
  const context = await browser.newContext();
  const page = await context.newPage();
  
  await page.goto('http://localhost:8080');
  await page.waitForTimeout(1000);
  
  const viewports = [
    { name: 'desktop', width: 1920, height: 1080 },
    { name: 'laptop', width: 1366, height: 768 },
    { name: 'tablet', width: 768, height: 1024 },
    { name: 'mobile', width: 375, height: 812 }
  ];
  
  for (const vp of viewports) {
    await page.setViewportSize({ width: vp.width, height: vp.height });
    await page.evaluate(() => document.querySelector('#s-ring').scrollIntoView({block: 'center'}));
    await page.waitForTimeout(500);
    await page.screenshot({ path: path.join(__dirname, `sring_${vp.name}.png`) });
  }

  await browser.close();
}
main().catch(console.error);
