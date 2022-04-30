const mongoose = require('mongoose');
const express = require('express')
const router = express.Router();
const categories = require('../models/categories');

router
    .get('/', async function(req, res) {
        const allCategories = await categories.find()
        res.status(200).send(allCategories)

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