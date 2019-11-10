const Page = require('./Page');
const { By, until, Key } = require("selenium-webdriver");

class GoogleResPage extends Page {

    async initDriver(driver) {
        this.driver = driver;
    }

    async getDriver() {
        return this.driver;
    }
    async nextPage() {
        await this.driver.wait(until.elementLocated(By.id('pnnext')));
        await this.driver.findElement(By.id('pnnext'))
            .then(element => element.click());
    }
    async getNumOfResults() {
        let resultStats = await this.driver.findElement(By.xpath('//*[@id="resultStats"]'));
        let resultString = await resultStats.getText();
        return resultString.slice(0, resultString.indexOf(','));
    }

    async getTimeOfSearching() {
        let resultStats = await this.driver.findElement(By.xpath('//*[@id="resultStats"]'));
        let resultString = await resultStats.getText();
        return resultString.slice(resultString.indexOf('(') + 1, resultString.indexOf(')'));
    }


    async getResultsBodies() { 
        return await this.driver.findElements(By.xpath('//span[@class="st"]'));
    }

    async getResultsHeaders() {
        return await this.driver.findElements(By.className('LC20lb'));
    }

    async getResultsUrls() {
        return await this.driver.findElements(By.xpath('//cite'));
    }

}
module.exports = new GoogleResPage();