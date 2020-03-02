const ScreenListService = require('./services/dBService');
/**
 * @function
 * @param {express.Request} req
 * @param {express.Response} res
 * @param {express.NextFunction} next
 * @returns {Promise < void >}
 */
async function findAll(req, res, next) {
    try {
        const screens = await ScreenListService.findAll();

        res.status(200).json({ screens });
    } catch (error) {
        res.status(500).json({ message: 'Something went wrong' });

        next(error);
    }
}

module.exports = {
    findAll,
};
