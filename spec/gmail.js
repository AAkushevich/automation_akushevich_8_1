const fs = require('fs');
const {google} = require('googleapis');
const testData = require('./testData.js');

    exports.authorize = function authorize(logger) {

        logger.debug('Start gmail.js(authorize)');
        
        let content = fs.readFileSync(testData.crediatailsJsonPath);
        const { client_secret, client_id, redirect_uris } = JSON.parse(content).installed;
        const oAuth2Client = new google.auth.OAuth2(client_id, client_secret, redirect_uris[0]);
        let token = fs.readFileSync(testData.tokenJsonPath);
        oAuth2Client.setCredentials(JSON.parse(token));

        return oAuth2Client;
    };

    exports.getMessagesCount = async function(logger, oAuth2Client) {
        await logger.debug('Get messages count');
        let messagesList = await getAllMessages(oAuth2Client, logger);
        return await messagesList.data.messages.length;
    };

    async function getAllMessages(auth, logger) {
        await logger.debug('Get all messages');
        const gmail = await google.gmail({ version: 'v1', auth });
        return await gmail.users.messages.list({ userId: 'me' });
    }

    async function getMessageData(id, auth, logger) {
        await logger.debug('Get message data');
        const gmail = await google.gmail({ version: 'v1', auth });
        return await gmail.users.messages.get({ userId: 'me', id: id });
    }

    exports.getSubjects = async function getSubjects(logger, auth) {
        let allMessages = await getAllMessages(auth, logger);
        let subjects = [];

        for(let { id } of allMessages.data.messages) {
            let messageData = await getMessageData(id, auth, logger);
            for (let { name, value } of messageData.data.payload.headers) {
                if (name === 'Subject') {
                    subjects.push(value);
                    await messageLog(messageData, logger, value);
                    break;
                }
            }
        }
        return subjects;
    };

    async function messageLog(messageData, logger, subject) {
        logger.debug("Print message info");
        let body = await getBody(messageData, logger);
        let deadline = await getDeadline(messageData, logger);
        logger.info(`Задание: ${subject}\r\nСрок выполнения: ${ deadline }\r\nТело письма:\r\n${ body }`);
    }

    async function getBody(messageData, logger) {
        logger.debug('Get message body');
        let base64 = await require('js-base64').Base64;
        let bodyData = await messageData.data.payload.parts[0].body.data;
        return base64.decode(bodyData).replace(/[*]/g, '');
    }

    async function getDeadline(messageData, logger) {
        logger.debug('Get deadline');
        let body = await getBody(messageData, logger);
        let searchString = "выполнения";
        let Deadline = await body.slice(body.indexOf(searchString) + searchString.length + 3, body.indexOf(searchString) + searchString.length + 33);
        return Deadline;
    }