const ScreensModel = require('../model');

/**
 * @exports
 * @method findAll
 * @param {}
 * @summary get list of all screenLinks
 * @returns Promise<ScreensModel[]>
 */
function findAll() {
    return ScreensModel.find({}).exec();
}

/**
 * @exports
 * @method create
 * @param {Object} screen
 * @summary create a new screenLink
 * @returns {Promise<ScreensModel>}
 */
function create(screenLink) {
    return ScreensModel.create(screenLink);
}

module.exports = {
    findAll,
    create,
};
