const { Schema } = require('mongoose');
const connections = require('../../config/connection');

const ScreensSchema = new Schema(
    {
        screenLink: {
            type: String,
            required: true,
        },
    },
    {
        timestamps: true,
    },
    {
        collection: 'screens',
        versionKey: false,
    },
);

module.exports = connections.model('Screens', ScreensSchema);
