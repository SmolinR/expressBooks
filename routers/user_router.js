/**
 * @swagger
 *  tags:
 *      name: User
 *      description: The users managing API
 */
const express = require('express');

const router = express.Router();
const isAuth = require('../middleware/is_authorized');

router.use(isAuth);
/**
     * @swagger
     * /user:
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
    .get('/', async (req, res) => {
        res.status(200).send(req.user);
    });

module.exports = router;
