const puppeteer = require('puppeteer-extra');
const cron = require('node-cron');
const googleSheet = require('./googleSheet');
const bot = require('./tgBot');
// const googleUsername = "sergeypetrov20012@gmail.com";
// const googlePassword = "Cw:77~m~3'SAa/%";



let today = new Date();
let day = String(today.getDate()).padStart(2,'0') - 1;
let month = String(today.getMonth()+1).padStart(2,'0');
let year = today.getFullYear();
today = day + '.' + month + '.' + year;

module.exports.getInfo =  async (date) => {
    const browser = await puppeteer.launch({
        headless: true,
        args: [
            '--no-sandbox',
            '-disable-gpu',
            '--enable-webgl',
            '--window-size=1920,1080'
        ]
    });

    const url = "https://docs.google.com/spreadsheets/d/1B90Z9gIBN8KnQUUq9KDZbN46Egc4HtbpCvu6Px2fw1Y/edit#gid=1552784607";
    const ua = 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AplleWebKit/537.36 (KHTML, like Gecko) Chrome/90.0.4430.91 Mobile Safari/537.36'

    const page = await browser.newPage();
    await page.setViewport({ width: 1920, height: 1080 });
    await page.setUserAgent(ua);
    await page.goto(url, {waitUntil: 'networkidle2'});
    // await page.type('input[type="email"]', googleUsername);
    // await page.keyboard.press('Enter');
    // await page.waitForTimeout(5000);
    // await page.type('input[type="password"]', googlePassword);
    // await page.keyboard.press('Enter');
    // await page.waitForTimeout(10000);
    const element = await page.$('#waffle-grid-container');
    await element.screenshot({path: `./screenshots/screenshot${date}.jpg`})
    await browser.close();

    let message = 'Отчет по продажам Адалт наклеек:\nЗа ' + today + '\n' + await googleSheet.getInformation(today);
    await bot.sendMessage(message);
    await bot.sendDocument(`./screenshots/screenshot${date}.jpg`)
}

// cron.schedule('18 16 * * 1,2,3,4,5', async () => {
//     await getInfo(today);
// })