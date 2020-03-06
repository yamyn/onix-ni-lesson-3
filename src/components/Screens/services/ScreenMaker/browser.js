const puppeteer = require('puppeteer');
const url = 'http://localhost:3000/v1/users';

/**
 * @function
 * @param {string} screenName - name for create screen
 * @returns {Promise < imgPath >}
 */
async function makeScreen() {
    try {
        const browser = await puppeteer.launch();
        const page = await browser.newPage();
        page.setViewport({
            width: 1920,
            height: 1080,
        });
        await page.goto(url, { waitUntil: 'domcontentloaded' });
        const screen = await page.screenshot({
            fullPage: true,
            type: 'png',
        });

        await browser.close();
        return screen;
    } catch (error) {
        throw error;
    }
}

module.exports = makeScreen;
