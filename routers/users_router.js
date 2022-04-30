const express = require('express');
const router = express.Router();
const users = require('../models/users');
const books = require('../models/books')
const { post } = require('./user_router');

router
    .get('/', async function(req, res) {
        const allUsers = await users.find();
        res.status(200).send(allUsers)
    })

module.exports = router