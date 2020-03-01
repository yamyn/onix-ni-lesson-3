const emailsListModel = require('./model');

/**
 * @exports
 * @method findAll
 * @param {}
 * @summary get list of all document-emails
 * @returns Promise<UserModel[]>
 */
function findAll() {
    return emailsListModel.find({}).exec();
}

/**
 * @exports
 * @method create
 * @param {object} emailList
 * @summary create a new user
 * @returns {Promise<UserModel>}
 */
function create(emailList) {
    return emailsListModel.create(emailList);
}

module.exports = {
    findAll,
    create,
};
