require('jasmine');
const gmailApi = require('./gmail.js');
const logger = require('./logs/logger.js');
const testData = require('./testData.js');

let messagesCount = 0;
let oAuth2Client;

beforeAll(async function () {
    logger.debug('exports.authorize()');
    oAuth2Client = gmailApi.authorize(logger);
    }, 20000);

describe('GmailApi', function() {

    it('Check messages count', async function() {
        logger.debug('Check messages count');
        messagesCount = await gmailApi.getMessagesCount(logger, oAuth2Client);
        logger.info('Message count: ' + messagesCount);
        expect(messagesCount).toBe(2);
    },200000);

    it('Search in messages',async function() {
        logger.debug("Search in messages and print info");
        for(let sub of await gmailApi.getSubjects(logger, oAuth2Client)) {
            expect(sub.toLowerCase()).toContain(`${ testData.subjectSearch.toLowerCase() }`);
        }
    });

},20000);