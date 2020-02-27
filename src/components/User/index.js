const UserService = require('./service');
const UserValidation = require('./validation');
const ValidationError = require('../../error/ValidationError');
const getUserStat = require('./statistic');

/**
 * @function
 * @param {express.Request} req
 * @param {express.Response} res
 * @param {express.NextFunction} next
 * @returns {Promise < void >}
 */
async function findAll(req, res, next) {
    try {
        const users = await UserService.findAll();

        res.status(200).render('index', {
            csrfToken: req.csrfToken(),
            users,
        });
    } catch (error) {
        res.status(500).render('errors/validError.ejs', {
            method: 'get',
            name: error.name,
            message: null,
        });

        next(error);
    }
}

/**
 * @function
 * @param {express.Request} req
 * @param {express.Response} res
 * @param {express.NextFunction} next
 * @returns {Promise < void >}
 */
async function getStatistic(req, res, next) {
    try {
        const statistic = await getUserStat(30);

        res.status(200).render('statistic', {
            csrfToken: req.csrfToken(),
            statistic,
        });
    } catch (error) {
        res.status(500).render('errors/validError.ejs', {
            method: 'get',
            name: error.name,
            message: null,
        });

        next(error);
    }
}

/**
 * @function
 * @param {express.Request} req
 * @param {express.Response} res
 * @param {express.NextFunction} next
 * @returns {Promise < void >}
 */
async function findById(req, res, next) {
    try {
        const { error } = UserValidation.findById(req.params);

        if (error) {
            throw new ValidationError(error.details);
        }

        const user = await UserService.findById(req.params.id);

        return res.status(200).json({
            data: user,
        });
    } catch (error) {
        if (error instanceof ValidationError) {
            return res.status(422).json({
                error: error.name,
                details: error.message,
            });
        }

        res.status(500).json({
            message: error.name,
            details: error.message,
        });

        return next(error);
    }
}

/**
 * @function
 * @param {express.Request} req
 * @param {express.Response} res
 * @param {express.NextFunction} next
 * @returns {Promise < void >}
 */
async function create(req, res, next) {
    try {
        const { error } = UserValidation.create(req.body);

        if (error) {
            throw new ValidationError(error.details);
        }

        const user = await UserService.create(req.body);

        res.status(200).render('index', {
            csrfToken: req.csrfToken(),
            users: false,
            notify: 'createUser',
            user,
        });
    } catch (error) {
        if (error instanceof ValidationError) {
            return res.status(422).render('errors/validError.ejs', {
                csrfToken: req.csrfToken(),
                method: 'post',
                name: error.name,
                message: error.message[0].message,
            });
        }
        res.status(500).render('errors/validError.ejs', {
            csrfToken: req.csrfToken(),
            method: 'post',
            name: error.name,
            message: error.message,
        });
        return next(error);
    }
}

/**
 * @function
 * @param {express.Request} req
 * @param {express.Response} res
 * @param {express.NextFunction} next
 * @returns {Promise<void>}
 */
async function updateById(req, res, next) {
    try {
        const { error } = UserValidation.updateById(req.body);

        if (error) {
            throw new ValidationError(error.details);
        }

        const user = await UserService.updateById(req.body.id, req.body);

        res.status(200).render('index', {
            csrfToken: req.csrfToken(),
            users: false,
            notify: 'updateUser',
            user,
        });
    } catch (error) {
        if (error instanceof ValidationError) {
            return res.status(422).render('errors/validError.ejs', {
                csrfToken: req.csrfToken(),
                method: 'put',
                name: error.name,
                message: error.message[0].message,
                id: req.body.id,
            });
        }

        res.status(500).render('errors/validError.ejs', {
            csrfToken: req.csrfToken(),
            method: 'put',
            name: error.name,
            message: error.message,
            id: req.body.id,
        });

        return next(error);
    }
}

/**
 * @function
 * @param {express.Request} req
 * @param {express.Response} res
 * @param {express.NextFunction} next
 * @returns {Promise<void>}
 */
async function deleteById(req, res, next) {
    try {
        const { error } = UserValidation.deleteById(req.body);

        if (error) {
            throw new ValidationError(error.details);
        }

        const user = await UserService.deleteById(req.body.id);

        res.status(200).render('index', {
            csrfToken: req.csrfToken(),
            users: false,
            notify: 'deleteUser',
            user,
        });
    } catch (error) {
        if (error instanceof ValidationError) {
            return res.status(422).render('errors/validError.ejs', {
                method: 'delete',
                name: error.name,
                message: error.message[0].message,
            });
        }

        res.status(500).render('errors/validError.ejs', {
            method: 'delete',
            name: error.name,
            message: error.message,
        });

        return next(error);
    }
}

module.exports = {
    findAll,
    getStatistic,
    findById,
    create,
    updateById,
    deleteById,
};
