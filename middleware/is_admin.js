const isAdmin = async function isAdm(req, res, next) {
    if (req.user.isAdmin) {
        return next();
    }
    return res.status(403).json({ message: 'Вы не имеете прав для совершения запроса' });
};
module.exports = isAdmin;
