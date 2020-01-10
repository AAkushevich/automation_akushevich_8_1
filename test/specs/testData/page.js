const logger = require('./logger').logger;

const credSelector = new String(`android=new UiSelector().resourceId("{0}")`);

String.prototype.format = function() {
    stringObject = this; 
    for (argIndex in arguments) { 
        stringObject = stringObject.replace(`{${argIndex}}`, arguments[argIndex]) 
    } 
    return stringObject
}

class Page {

    async click(selector, count) {
        let element = await $(selector);
        if (count === undefined) {
            count = 1;
        }
        logger.trace(`Click: ${selector} ${count} times`);
        for (let i = 0; i < count; i++)
            await element.click();
    }

    async back() {
        logger.trace('Back page');
        driver.back();
    }

    async setCreeds(selector, length) {
        logger.trace(`Random creeds ${selector}`);
        let creed = await $(credSelector.format(selector));
        await creed.setValue(this.getRandomStrByLength(length));
    }

    async getError(selector) {
        logger.trace('Error');
        let err = await $(selector);
        return await err.getText();
    }

    getRandomStrByLength(length) {
        var string = '';
        while (string.length < length)
            string += Math.random().toString(36).substring(2);
        return string.substring(0, length);
    }
}

module.exports = new Page();
