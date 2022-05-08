const isAdmin = async function isAdm(req, res, next) {
    if (req.user.isAdmin) {
        return next();
    }
    return res.status(403).send('Вы не имеете прав для совершения запроса');
};
module.exports = isAdmin;