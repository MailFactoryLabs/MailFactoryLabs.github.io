const { chromium } = require('playwright');
const path = require('path');

async function main() {
  const browser = await chromium.launch({ headless: true });
  const context = await browser.newContext({ viewport: { width: 1280, height: 1000 } });
  const page = await context.newPage();
  await page.goto('http://localhost:8080');
  await page.evaluate(() => { 
    const car = document.querySelector('.states-car');
    if(car) car.scrollIntoView({ block: 'center' });
  });
  
  await page.waitForTimeout(3000);
  
  // Click NEXT and capture during the transition
  await page.click('[data-sc-prev]');
  await page.waitForTimeout(300); // 300ms into the 700ms transition
  await page.screenshot({ path: path.join(__dirname, `task10_prev_1.png`) });

  await page.waitForTimeout(500); // Let it finish

  // Click NEXT again and capture
  await page.click('[data-sc-prev]');
  await page.waitForTimeout(350); 
  await page.screenshot({ path: path.join(__dirname, `task10_prev_2.png`) });

  await context.close();
  await browser.close();
}
main().catch(console.error);
