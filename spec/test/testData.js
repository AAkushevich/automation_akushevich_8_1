const downloadsFolder = require('downloads-folder');
exports.searchString = "steam";
exports.fileExtension = `.crdownload`;
exports.downloadPath = downloadsFolder();
exports.gameGenre = 'Action';
exports.birthYear = 1999;
exports.SteamURL = 'https://store.steampowered.com';
exports.DEFAULT_TIMEOUT = 120000;

String.prototype.format = function() {
    stringObject = this; 
    for (argIndex in arguments) { 
        stringObject = stringObject.replace(`{${argIndex}}`, arguments[argIndex]) 
    } 
    return stringObject
}