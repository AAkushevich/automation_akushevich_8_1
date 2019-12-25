require('jasmine');
require('chromedriver');
const { Builder } = require('selenium-webdriver');
const webdriver = require('selenium-webdriver');
const mainSteamPage = require('./testData/SteamMenuPage');
const gamePage = require('./testData/GamePage');
const GamesPage = require('./testData/ListGamesPage');
const downloadPage = require('./testData/DownloadSteamPage');
const config = require('./testData/canstantValues');
jasmine.DEFAULT_TIMEOUT_INTERVAL = config.DEFAULT_TIMEOUT;

let chromeCapabilities = webdriver.Capabilities.chrome();
let chromeOptions = {
    'prefs': {"download.default_directory":config.download_path}
};
chromeCapabilities.set('chromeOptions', chromeOptions);
let driver = new Builder()
    .withCapabilities(chromeCapabilities)
    .build();

let textPrice, textFinalPrice, textDiscount, price, disc;

describe("Steam test", function() {

    beforeAll(async function () {
        await mainSteamPage.setDriver(driver);
        await mainSteamPage.open(config.SteamURL);
    });

    afterAll(async function(){
        await driver.quit();
    });

    it('Genre exists', async () => {
        await expect(await mainSteamPage.goMenuItem(config.game_genre)).toBeTrue();
        driver = await mainSteamPage.getDriver();
    });

    it("Check Discount or Price", async ()=>{
        await GamesPage.setDriver(driver);
        await GamesPage.goNewReleases();
        let maxDiscount = await GamesPage.findMaxDiscount();
        if(maxDiscount === null){
            let maxPrice = await GamesPage.findMaxPrice();
            textPrice = await maxPrice.getText();
            await maxPrice.click();
        }
        else {
            textDiscount = await maxDiscount.getText();
            textFinalPrice = await GamesPage.getPrice();
            await maxDiscount.click();
        }
        driver = await GamesPage.getDriver();
        await gamePage.setDriver(driver);
        await gamePage.EnterAgeGate(config.birth_year);
        gamePage.setDriver(driver);
        if(maxDiscount === null){
            price = await gamePage.getPrice();
            expect(price).toContain(textPrice);
        }
        else {
            disc = await gamePage.getDiscount();
            price = await gamePage.getFinalPrice();
            expect(disc).toContain(textDiscount);
            expect(price).toContain(textFinalPrice);
        }
    });

    it("Download Steam",async ()=>{
        mainSteamPage.setDriver(driver);
        await mainSteamPage.goSteamInstall();
        driver = await mainSteamPage.getDriver();
        await downloadPage.setDriver(driver);
        await downloadPage.downloadSteam();
        await downloadPage.waitDownload();
    });
});