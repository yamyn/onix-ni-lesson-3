const { Schema } = require('mongoose');
const connections = require('../../config/connection');

const EmailsListSchema = new Schema(
    {
        emails: {
            type: Array,
            required: true,
        },
    },
    {
        timestamps: true,
    },
    {
        collection: 'emailList',
        versionKey: false,
    },
);

module.exports = connections.model('EmailsListSchema', EmailsListSchema);
