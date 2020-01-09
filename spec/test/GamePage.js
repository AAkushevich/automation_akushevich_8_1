const Page = require('./Page');
const {By, until} = require('selenium-webdriver');

const discountLocatorSelector = '//div[@class="game_purchase_action_bg"]//div[@class=\'discount_pct\']';
const finalPriceLocatorSelector = '(//div[@class=\'game_purchase_action_bg\']//div[@class=\'discount_final_price\'])[1]';
const priceLocatorSelector = '(//*[@class=\'game_purchase_price price\'])[1]';
const gamePageBackgroundSelector = 'game_page_background';
const birthdaySelector = "agegate_birthday_selector";
const viewPageButtonSelector = 'btnv6_blue_hoverfade';
const ageYearSelector = new String(`document.getElementById("ageYear").value = {0};`);
let driver;

class GamePage extends Page {

    setDriver(value) {
        driver = value;
    }

    getDriver() {
        return driver;
    }

    async getDiscount() {
        let discount = await driver.wait (
            until.elementLocated(By.xpath(discountLocatorSelector)),
            10000
        );
        return await discount.getText();
    }

    async getFinalPrice() {
        let price = await driver.findElement(By.xpath(finalPriceLocatorSelector));
        return await price.getText();
    }

    async getPrice() {
        let price = await driver.wait(
            until.elementLocated(By.xpath(priceLocatorSelector)),
            10000
        );
        return await price.getText();
    }

    async EnterAgeGate(year) {

        await driver.wait(until.elementLocated(By.className(gamePageBackgroundSelector)));
        let agegateExists = true;
        try {
            await driver.findElement(By.className(birthdaySelector));
        } catch (e) {
            agegateExists = false;
        }
        if (agegateExists) {
            await driver.executeScript(ageYearSelector.format(year));
            let viewPageBtn = await driver.findElement(By.className());
            await viewPageBtn.click(viewPageButtonSelector);
        }
    }
}

module.exports = new GamePage();