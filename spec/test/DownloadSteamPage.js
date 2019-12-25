const Page = require('./Page');
const {By, until } = require('selenium-webdriver');
const defaultValues = require('./testData');
const fs = require('fs');
const path = require('path');
let driver;

class SteamPage extends Page {

    setDriver(value) {
        driver = value;
    }

    async downloadSteam() {
        let Button = await driver.wait (
            until.elementLocated(By.className('about_install')),
            20000
        ).click();
    }

    async waitDownload() {
        let isDownloaded = false;
        
        while (!isDownloaded) {
            let files = fs.readdirSync(defaultValues.downloadPath);
            for (let file of files) {
                let filename = path.join(defaultValues.downloadPath, file);
                if(path.extname(file) === `.crdownload`){
                    isDownloaded = false;
                }
                else if (filename.toLowerCase().includes('steam')) {
                    isDownloaded = true;
                }
            }
        }
    }
}
module.exports = new SteamPage();