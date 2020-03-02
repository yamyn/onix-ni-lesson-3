const moment = require('moment');

/**
 * @function
 * @returns {string} screenName - to use current date as name for screen
 */
function getScreenName() {
    return moment()
        .utc()
        .format('YYYY-MM-DD__HH:mm');
}

module.exports = getScreenName;
