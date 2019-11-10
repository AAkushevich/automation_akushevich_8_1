const Page = require('./Page');
const { By, Key, until } = require("selenium-webdriver");

class GoogleSearchPage extends Page {

    async initDriver(driver) {
        this.driver = driver;
    }

    async getDriver() {
        return this.driver;
    }

    async waitUntilPageLoaded() {
        await this.driver.wait(until.elementsLocated(By.xpath('//span[@class="st"]')));
    }
    async openPage(path) {
        await super.open(this.driver, path);
    }

    async startSearch(searchString) { 
       let searchForm = await this.driver.findElement(By.name('q')); 
       await searchForm.sendKeys(searchString);
       await searchForm.sendKeys(Key.ENTER);
    //    => {
    //         searchForm.sendKeys(searchString).then(() => {
    //             searchForm.sendKeys(Key.ENTER);
    //         });
    //     });
    }

    // constructor(driver) {
    //     super();
    //     this.driver = driver;
    // }
}

module.exports = new GoogleSearchPage();