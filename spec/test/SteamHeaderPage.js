const Page = require('./Page');
const { By, until } = require('selenium-webdriver');
let driver;

const steamInstallButtonLocator = "header_installsteam_btn";

class SteamHeaderPage extends Page {

    setDriver(value) {
        driver = value;
    }

    getDriver() {
        return driver;
    }

    open(path) {
        super.open(path, driver);
    }

    async goSteamInstall() {
        let Button = await driver.wait(
            until.elementLocated(By.className(steamInstallButtonLocator)),
            20000
        );
        Button.click();
    }
}

module.exports = new SteamHeaderPage();