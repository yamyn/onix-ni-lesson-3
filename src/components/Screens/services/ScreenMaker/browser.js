const puppeteer = require('puppeteer');
const url = 'http://localhost:3000/v1/users';
const path = require('path');

/**
 * @function
 * @param {string} screenName - name for create screen
 * @returns {Promise < imgPath >}
 */
async function makeScreen(screenName) {
    try {
        const imgPath = path.join(
            __dirname,
            'googleDrive',
            `${screenName}.png`,
        );
        const browser = await puppeteer.launch();
        const page = await browser.newPage();
        page.setViewport({
            width: 1920,
            height: 1080,
        });
        await page.goto(url, { waitUntil: 'domcontentloaded' });
        await page.screenshot({
            path: imgPath,
            fullPage: true,
        });

        await browser.close();
        return imgPath;
    } catch (error) {
        throw error;
    }
}

module.exports = makeScreen;
