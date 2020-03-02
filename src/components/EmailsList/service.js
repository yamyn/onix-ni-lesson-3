const EmailsListModel = require('./model');

/**
 * @exports
 * @method findAll
 * @param {}
 * @summary get list of all document-emails
 * @returns Promise<EmailsListModel[]>
 */
function findAll() {
    return EmailsListModel.find({}).exec();
}

/**
 * @exports
 * @method create
 * @param {Object} emailList
 * @summary create a new emailList
 * @returns {Promise<EmailsListModel>}
 */
function create(emailList) {
    return EmailsListModel.create(emailList);
}

module.exports = {
    findAll,
    create,
};
