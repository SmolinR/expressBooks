const express = require('express');
const router = express.Router();
const isAuth = require('../middleware/is_authorized')

router.use(isAuth)

router
    .get('/', async function(req, res) {
        res.status(200).send(req.user)
    })

module.exports = router