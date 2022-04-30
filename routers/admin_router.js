const express = require('express');
const mongoose = require('mongoose');
const isAdmin = require('../middleware/is_admin');
const isAuth = require('../middleware/is_authorized');
const users = require('../models/users');
const { route } = require('./user_router');
const router = express.Router();

router.use(isAuth, isAdmin)

router
    .patch('/make-admin', async function(req, res) {
        const user = await users.findOne({ _id: req.query.id })
        if (user) {
            user.isAdmin = true
            await user.save()
            return res.status(200).send('Администратор успешно назначен')
        }
        res.status(404).send('Пользователь не найден')
    })
router
    .patch('/delete-admin', async function(req, res) {
        const user = await users.findOne({ _id: req.query.id })
        if (user) {
            user.isAdmin = false
            await user.save()
            return res.status(200).send('Администратор успешно снят')
        }
    })
module.exports = router