const puppeteer = require('puppeteer');
const url = 'http://localhost:3000/v1/users';

(async () => {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    page.setViewport({
        width: 1920,
        height: 1080,
    });
    await page.goto(url, { waitUntil: 'domcontentloaded' });
    await page.screenshot({ path: 'example.png', fullPage: true });

    await browser.close();
})();
