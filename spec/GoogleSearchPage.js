const Page = require('./Page');
const logger = require('./logs/logger.js');
const { By, Key, until } = require("selenium-webdriver");

class GoogleSearchPage extends Page {

    async initDriver(driver) {
        logger.debug(`run GoogleSearchPage.initDriver()`);
        this.driver = driver;
    }

    async getDriver() {
        logger.debug(`run GoogleSearchPage.getDriver()`);
        return this.driver;
    }

    async waitUntilPageLoaded() {
        logger.debug(`run GoogleSearchPage.waitUntilPageLoaded()`);
        await this.driver.wait(until.elementsLocated(By.xpath('//span[@class="st"]')));
    }
    async openPage(path) {
        logger.debug(`run GoogleSearchPage.openPage()`);
        await super.open(this.driver, path);
    }

    async startSearch(searchString) { 
       logger.debug(`run GoogleSearchPage.startSearch()`);
       let searchForm = await this.driver.findElement(By.name('q')); 
       await searchForm.sendKeys(searchString);
       await searchForm.sendKeys(Key.ENTER);
    }

    // constructor(driver) {
    //     super();
    //     this.driver = driver;
    // }
}

module.exports = new GoogleSearchPage();