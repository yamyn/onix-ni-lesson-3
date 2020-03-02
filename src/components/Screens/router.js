const { Router } = require('express');
const ScreensComponent = require('../Screens');

const router = Router();

/**
 * Route serving list of screenLinks.
 * @name /v1/screens
 * @function
 * @inner
 * @param {string} path - Express path
 * @param {callback} middleware - Express middleware.
 */
router.get('/', ScreensComponent.findAll);

module.exports = router;
