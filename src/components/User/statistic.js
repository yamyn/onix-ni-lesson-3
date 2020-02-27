const moment = require('moment');

function transformUserInfo(users) {
    const userData = {};
    // users.reduce((acc, user) => {
    //     if (acc !== moment(obj.dt_txt).format('dddd')) {
    //         acc = moment(obj.dt_txt).format('dddd');
    //         weatherAllInfoObj[`${acc}`] = [];
    //     }
    //     weatherAllInfoObj[`${acc}`].push(obj);
    //     return acc;
    // }, 0);
}

module.exports = transformUserInfo;
