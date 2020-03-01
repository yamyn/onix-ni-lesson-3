/**
 * @exports
 * @extends Error
 */
class MongoError extends Error {
    /**
     * @constructor
     * @param {object} message
     */
    constructor(message) {
        super();
        this.message = message;
        this.name = 'MONGO_ERROR';
    }
}

module.exports = MongoError;
