/**
 * @swagger
 *  tags:
 *      name: User
 *      description: The users managing API
 */
const express = require('express');

const router = express.Router();
const isAuth = require('../../middleware/is_authorized');
const users = require('./model');

router.use(isAuth);
/**
     * @swagger
     * /users/me:
     *      get:
     *          summary: Returns current authorized user
     *          tags: [User]
     *          responses:
     *                  200:
     *                      description: Current user
     *                      content:
     *                          application/json:
     *                              schema:
     *                                 $ref: '#/components/schemas/User'
     *                  401:
     *                      description: User is not authorized
     */
router
    .get('/me', async (req, res) => {
        res.status(200).json(req.user);
    });
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
    .get('/', async (req, res) => {
        const allUsers = await users.find();
        res.status(200).json(allUsers);
    });
module.exports = router;