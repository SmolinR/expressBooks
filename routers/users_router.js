const express = require('express');
const router = express.Router();
const users = require('../models/users');
const books = require('../models/books')
const { post } = require('./user_router');

/**
 * @swagger
 *  /users:
 *      get:
 *          summary: Returns the list of all users
 *          tags: [User]
 *          responses:
 *                  200:
 *                      description: The list of all users
 *                      content:
 *                          application/json:
 *                              schema:
 *                                  type: array
 *                                  items: 
 *                                      $ref: '#/components/schemas/User'
 */
router
    .get('/', async function(req, res) {
        const allUsers = await users.find();
        res.status(200).send(allUsers)
    })

module.exports = router