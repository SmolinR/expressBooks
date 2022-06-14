const users = require('../api/user/model');

const isAuth = async function isAuthorized(req, res, next) {
  const user = await users.findOne({ token: req.header('Authorization') });
  if (!req.header('Authorization')) {
    return res.status(401).json({ message: 'Не авторизировано' });
  }
  if (user) {
    req.user = user;
    return next();
  }
  return res.status(401).json({ message: 'Не авторизировано' });
};
module.exports = isAuth;
