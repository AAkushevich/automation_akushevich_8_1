const log = require('log4js');
const fs = require('fs-extra');

if (!fs.exists("./logs")) {
    fs.mkdir("./logs");
}

log.configure({
    appenders: {
        file: {
            type: 'file', 
            filename: 'logs/logs.txt', 
            pattern: 'yyyy-MM-dd-hh', 
            compress: false,
            flags: "w",
            
        },
        terminal: {
            type: 'stdout'
        }
    },
    categories: {
        trace: {
            appenders: ['file'], 
            level: 'trace'
        },
        default: { 
            appenders: ['file', 'terminal'], 
            level: 'all'
        },
    }
});

let logFileConsole = log.getLogger('default');
let logFile = log.getLogger('trace');

module.exports = {
    trace: str => logFile.trace(str),
    debug: str => logFileConsole.debug(str),
    info: str => logFileConsole.info(str),
    warn: str => logFileConsole.warn(str),
    error: str => logFileConsole.error(str),
    fatal: str => logFileConsole.fatal(str)
};

// module.exports = log.getLogger('file');
