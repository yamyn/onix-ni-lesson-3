const moment = require('moment');
const UserModel = require('./model');

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
                    $dateToString: { format: '%d-%m', date: '$createdAt' },
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
    ]);
    const userStatistic = {
        label: [],
        data: [],
    };
    userStatisticArr.map(obj => {
        userStatistic.label.push(obj._id);
        userStatistic.data.push(obj.number);
        return;
    });
    console.log(userStatisticArr);
    return userStatistic;
}

module.exports = getUserStat;
