const Page = require('./Page');
const {By, until } = require('selenium-webdriver');
const config = require('./testData');
const fs = require('fs');
const path = require('path');
let driver;

class SteamPage extends Page {

    setDriver(value) {
        driver = value;
    }

    async downloadSteam(){
        let Button = await driver.wait (
            until.elementLocated(By.className('about_install')),
            20000
        ).click();
        let now = new Date();
    }

    async waitDownload(){
        let isDownloaded = false;
        
        while (!isDownloaded) {
            console.log(config.download_path);
            let files = fs.readdirSync(config.download_path);
            for (let file of files) {
                let filename = path.join(config.download_path, file);
                console.log(file);
                if(path.extname(file) === `.crdownload`){
                    isDownloaded = false;
                }
                else if (filename.toLowerCase.includes('steam')) {
                    isDownloaded = true;
                }
            }
        }
    }
}
module.exports = new SteamPage();