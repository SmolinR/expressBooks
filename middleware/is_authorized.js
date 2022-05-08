const users = require('../models/users');

const isAuth = async function isAuthorized(req, res, next) {
    const user = await users.findOne({ token: req.header('Authorization') });
    if (!req.header('Authorization')) {
        return res.status(401).send('Не авторизировано');
    }
    if (user) {
        req.user = user;
        return next();
    }
    return res.status(401).send('Не авторизировано');
};
module.exports = isAuth;
