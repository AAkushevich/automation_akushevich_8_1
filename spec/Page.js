const logger = require('./logs/logger.js');
module.exports = class Page {

    async open(driver, path) {
       logger.debug("Page.open(path): " + path);
       await driver.get(path);
    }
    
};