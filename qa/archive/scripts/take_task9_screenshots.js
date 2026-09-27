const { chromium } = require('playwright');
const path = require('path');

async function testSequence(browser, width, height, namePrefix) {
  const context = await browser.newContext({ viewport: { width, height } });
  const page = await context.newPage();
  await page.goto('http://localhost:8080');
  await page.evaluate(() => { 
    const car = document.querySelector('.states-car');
    if(car) car.scrollIntoView({ block: 'center' });
  });
  
  // CENTER = 01
  await page.waitForTimeout(2000);
  await page.screenshot({ path: path.join(__dirname, `${namePrefix}_C01.png`) });

  // NEXT to CENTER = 02
  await page.click('[data-sc-next]');
  await page.waitForTimeout(1000);
  await page.screenshot({ path: path.join(__dirname, `${namePrefix}_C02.png`) });

  // NEXT to CENTER = 03
  await page.click('[data-sc-next]');
  await page.waitForTimeout(1000);
  await page.screenshot({ path: path.join(__dirname, `${namePrefix}_C03.png`) });

  // NEXT to CENTER = 04
  await page.click('[data-sc-next]');
  await page.waitForTimeout(1000);
  await page.screenshot({ path: path.join(__dirname, `${namePrefix}_C04.png`) });

  // NEXT to CENTER = 05
  await page.click('[data-sc-next]');
  await page.waitForTimeout(1000);
  await page.screenshot({ path: path.join(__dirname, `${namePrefix}_C05.png`) });

  // PREVIOUS back to CENTER = 04
  await page.click('[data-sc-prev]');
  await page.waitForTimeout(1000);
  await page.screenshot({ path: path.join(__dirname, `${namePrefix}_C04_prev.png`) });

  await context.close();
}

async function main() {
  const browser = await chromium.launch({ headless: true });
  await testSequence(browser, 1280, 1000, 'task9_desktop');
  await browser.close();
}
main().catch(console.error);
