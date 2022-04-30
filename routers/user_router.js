const express = require('express');
const router = express.Router();
const isAuth = require('../middleware/is_authorized')
const users = require('../models/users')

router.use(isAuth)

router
    .get('/', async function(req, res) {
        res.status(200).send(req.user)
    })
console.log('321')

module.exports = router