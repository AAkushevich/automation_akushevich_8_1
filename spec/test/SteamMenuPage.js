const Page = require('./Page');
const { By, until } = require('selenium-webdriver');
let driver;

const genresDivLocator = 'genre_flyout';
const menuElementsLocator = 'popup_menu_item';
const elementNameAttribute = 'innerText';
const hrefAttribute = 'href';

class SteamMenuPage extends Page {

    setDriver(value) {
        driver = value;
    }

    getDriver() {
        return driver;
    }

    open(path) {
        super.open(path, driver);
    }

    async goMenuItem(genreName) {
        await driver.wait(until.elementLocated(By.id(genresDivLocator)));
        let genresDiv = await driver.findElement(By.id(genresDivLocator));
        let elements = await genresDiv.findElements(By.className(menuElementsLocator));

        for (let element of elements) {
            const elementName = (await element.getAttribute(elementNameAttribute)).trim();
            const elementHref = await element.getAttribute(hrefAttribute);
            if (genreName === elementName) {
                await driver.get(elementHref);
                return true;
            }
        }
        return false;
    }
    
}

module.exports = new SteamMenuPage();