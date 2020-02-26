const csrf = require('csurf');
const bodyParser = require('body-parser');

const csrfProtection = csrf({ cookie: true });
const parseForm = bodyParser.urlencoded({ extended: false });

module.exports = {
    csrfProtection,
    parseForm,
};
