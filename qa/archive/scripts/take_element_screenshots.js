const { chromium } = require('playwright');
const path = require('path');

async function main() {
  const browser = await chromium.launch();
  const context = await browser.newContext();
  const page = await context.newPage();
  
  await page.goto('http://localhost:8080');
  
  // Wait for the ring to be present
  await page.waitForSelector('#s-ring');
  
  // Scroll down a bit to trigger lazy loading
  await page.evaluate(() => window.scrollBy(0, 1000));
  await page.waitForTimeout(500);
  await page.evaluate(() => window.scrollBy(0, 1000));
  await page.waitForTimeout(500);
  await page.evaluate(() => window.scrollBy(0, 1000));
  await page.waitForTimeout(500);
  
  const viewports = [
    { name: 'desktop', width: 1920, height: 1080 },
    { name: 'tablet', width: 768, height: 1024 },
    { name: 'mobile', width: 375, height: 812 }
  ];
  
  for (const vp of viewports) {
    await page.setViewportSize({ width: vp.width, height: vp.height });
    
    // Scroll the #s-ring perfectly into view
    await page.evaluate(() => {
      document.querySelector('#s-ring').scrollIntoView({ behavior: 'instant', block: 'center' });
    });
    
    await page.waitForTimeout(1000);
    
    // Take screenshot of the #s-ring element specifically
    const ringEl = await page.$('#s-ring');
    await ringEl.screenshot({ path: path.join(__dirname, `sring_element_${vp.name}.png`) });
  }

  await browser.close();
}
main().catch(console.error);
