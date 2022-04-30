const mongoose = require('mongoose');
const express = require('express')
const router = express.Router();
const categories = require('../models/categories');
const isAdmin = require('../middleware/is_admin');
const isAuth = require('../middleware/is_authorized');

router.use(isAuth, isAdmin)

router
    .get('/', async function(req, res) {
        const allCategories = await categories.find()
        return res.status(200).send(allCategories)
    })

router
    .post('/', async function(req, res) {
        const category = new categories({
            title: req.query.title,
            icon: req.query.title
        })
        await category.save()
        res.status(200).send(category)
    })

module.exports = router