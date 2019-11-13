const logger = require('./logs/logger.js');
const Page = require('./Page');
const { By, until, Key } = require("selenium-webdriver");

class GoogleResPage extends Page {

    async initDriver(driver) {
        logger.debug(`run GoogleresPage.initDriver()`);
        this.driver = driver;
    }

    async getDriver() {
        logger.debug(`run GoogleresPage.getDriver()`);
        return this.driver;
    }
    async nextPage() {
        logger.debug(`run GoogleresPage.nextPage()`);
        await this.driver.wait(until.elementLocated(By.id('pnnext')));
        await this.driver.findElement(By.id('pnnext'))
            .then(element => element.click());
    }
    async getNumOfResults() {
        logger.debug(`run GoogleresPage.getNumOfResults()`);
        let resultStats = await this.driver.findElement(By.xpath('//*[@id="resultStats"]'));
        let resultString = await resultStats.getText();
        return resultString.slice(0, resultString.indexOf(','));
    }

    async getTimeOfSearching() {
        logger.debug(`run GoogleresPage.getTimeOfSearching`);
        let resultStats = await this.driver.findElement(By.xpath('//*[@id="resultStats"]'));
        let resultString = await resultStats.getText();
        return resultString.slice(resultString.indexOf('(') + 1, resultString.indexOf(')'));
    }


    async getResultsBodies() { 
        logger.debug(`run GoogleresPage.getResultsBodies`);
        return await this.driver.findElements(By.xpath('//span[@class="st"]'));
    }

    async getResultsHeaders() {
        logger.debug(`run GoogleresPage.getResultsHeaders()`);
        return await this.driver.findElements(By.className('LC20lb'));
    }

    async getResultsUrls() {
        logger.debug(`run GoogleresPage.getResultsUrls()`);
        return await this.driver.findElements(By.xpath('//cite'));
    }

}

module.exports = new GoogleResPage();