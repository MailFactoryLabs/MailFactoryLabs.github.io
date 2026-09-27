const { chromium } = require('playwright');
const path = require('path');

async function testViewport(browser, width, height, namePrefix) {
  const context = await browser.newContext({ viewport: { width, height } });
  const page = await context.newPage();
  await page.goto('http://localhost:8080');
  await page.evaluate(() => { 
    // Scroll so that the states-car is visible
    const car = document.querySelector('.states-car');
    if(car) car.scrollIntoView({ block: 'center' });
  });
  await page.waitForTimeout(2000); // let it settle
  await page.screenshot({ path: path.join(__dirname, `${namePrefix}_1_initial.png`) });

  await page.click('[data-sc-next]');
  await page.waitForTimeout(1000);
  await page.screenshot({ path: path.join(__dirname, `${namePrefix}_2_next.png`) });

  await page.click('[data-sc-prev]');
  await page.waitForTimeout(1000);
  await page.screenshot({ path: path.join(__dirname, `${namePrefix}_3_prev.png`) });

  await context.close();
}

async function main() {
  const browser = await chromium.launch({ headless: true });
  await testViewport(browser, 1280, 1000, 'task8_desktop');
  await testViewport(browser, 768, 1024, 'task8_tablet');
  await testViewport(browser, 375, 812, 'task8_mobile');
  await browser.close();
}
main().catch(console.error);
