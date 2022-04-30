 const users = require('../models/users')
 const isAuth = async function isAuthorized(req, res, next) {
     const user = await users.findOne({ token: req.header("Authorization") })
     if (user) {
         req.user = user
         return next();
     }
     res.status(401).send('Не авторизировано')
 }
 module.exports = isAuth