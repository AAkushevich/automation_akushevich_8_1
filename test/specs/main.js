const defaultValues = require('./testData/constantValues');
const logger = require('./testData/logger').logger;
const Page = require('./testData/page');
const assert = require('assert').strict;

describe('Sign in test', function () {
  it('Sign in', async () => {
    logger.info('Start test');

    logger.info('Switch to QA');
    await Page.click(defaultValues.logo, 5);   
    await Page.click(defaultValues.QA1Button);
    await Page.back();

    logger.info('Try to sign in');
    await Page.click(defaultValues.loginButton);
    await Page.setCreeds(defaultValues.name, 5);
    await Page.setCreeds(defaultValues.password, 8);
    await Page.click(defaultValues.submit);

    const err = await Page.getError(defaultValues.error);
    expect(err).toContain(defaultValues.errors);
    logger.info('Test is over');
  });

});
