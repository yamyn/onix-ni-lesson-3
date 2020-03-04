const moment = require('moment');
const UserModel = require('../model');

/**
 * @function
 * @param {number} dayCount - count day ago
 * @returns {object} userStatistic
 */
async function getUserStat(dayCount) {
    const lastMonthDay =
        moment()
            .utc()
            .dayOfYear() - dayCount;
    const userStatisticArr = await UserModel.aggregate([
        {
            $project: {
                createdAt: 1,
                dayOfYear: {
                    $dayOfYear: '$createdAt',
                },
            },
        },
        {
            $project: {
                MonthDayUTC: {
                    $dateToString: { format: '%m-%d', date: '$createdAt' },
                },
                dayOfYear: 1,
                isThisMonth: { $gte: ['$dayOfYear', lastMonthDay] },
                count: { $add: [1] },
            },
        },
        { $match: { isThisMonth: true } },
        {
            $group: {
                _id: '$MonthDayUTC',
                number: { $sum: '$count' },
            },
        },
        { $sort: { _id: 1, number: 1 } },
    ]);
    const userStatistic = {
        labels: [],
        count: [],
    };
    userStatisticArr.map(obj => {
        userStatistic.labels.push(obj._id);
        userStatistic.count.push(obj.number);
        return;
    });

    return userStatistic;
}

module.exports = getUserStat;
