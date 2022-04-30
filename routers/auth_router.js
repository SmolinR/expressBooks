const express = require('express');
const { route } = require('express/lib/application');
const router = express.Router();
const randomNumber = require('../utils/rndNumb');
const randomString = require('../utils/rndString');
const users = require('../models/users');
const { default: mongoose } = require('mongoose');
const books = require('../models/books');

router
    .post('/sign-up', async function(req, res) {
        const user = new users({
            login: req.query.login,
            password: req.query.password,
        })
        await user.save()


        res.status(201).send('Пользователь зарегестрирован')

    })

router
    .post('/sign-in', async function(req, res) {
        const user = await users.findOne({ login: req.query.login, password: req.query.password })
        if (user) {
            let newToken = {
                token: randomString(10)
            }
            user.token = newToken.token
            await user.save();
            res.status(201).send(user.token)
        } else {
            res.status(401).send('Не авторизовано')
        }

    })

router
    .delete('/logout', async function(req, res) {
        const user = await users.findOne({ token: req.header("Authorization") });
        if (user) {
            user.token = null
            await user.save();
            return res.status(200).send('Выход произошел успешно')
        }
        res.status(401).send('Не авторизовано')

    })

module.exports = router;