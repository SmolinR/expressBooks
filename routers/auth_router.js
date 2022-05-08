/**
 * @swagger
 * components:
 *   schemas:
 *     User:
 *       type: object
 *       required:
 *         - login
 *         - password
 *       properties:
 *         id:
 *           type: integer
 *           description: The auto-generated id of the book.
 *         login:
 *           type: string
 *           description: The name of user.
 *         password:
 *           type: string
 *           description: User`s password.
 *         token:
 *           type: string
 *           description: User`s authorization token
 *         avarageRating:
 *           type: number
 *           description: The avarage rating of user`s books.
 *         isAdmin:
 *           type: boolean
 *           description: Does user have admin permissions, default is false
 *       example:
 *          login: Ruslan
 *          password: 123
 *          token: z4ld41tppo
 *          avarageRating: 56
 *          isAdmin: false
 */

/**
 * @swagger
 *  tags:
 *      name: Auth
 *      description: The auth managing API
 */
const express = require('express');
const router = express.Router();
const randomString = require('../utils/rndString');
const Users = require('../models/users');

/**
 * @swagger
 * /auth/sign-up:
 *          post:
 *              summary: User sign up
 *              tags: [Auth]
 *              requestBody:
 *                  required: true
 *                  content:
 *                      application/json:
 *                          schema:
 *                              $ref: '#/components/schemas/User'
 *                          example:
 *                              login: string
 *                              password: string
 *              responses:
 *                  201:
 *                      description: User was signed up
 *                      content:
 *                          application/json:
 *                              schema:
 *                                  $ref: '#/components/schemas'
 *                              example:
 *                                  id: user`s id
 *                                  login: user`s login
 *                                  password: user`s password
 *                                  isAdmin: false
 *
 */

router
    .post('/sign-up', async (req, res) => {
        const user = new Users({
            login: req.body.login,
            password: req.body.password,
        });
        await user.save();

        res.status(201).send('Пользователь зарегестрирован');
    });

/**
 * @swagger
 * /auth/sign-in:
 *          post:
 *              summary: User sign in
 *              tags: [Auth]
 *              requestBody:
 *                  required: true
 *                  content:
 *                      application/json:
 *                          schema:
 *                              $ref: '#/components/schemas/User'
 *                          example:
 *                              login: string
 *                              password: string
 *              responses:
 *                      201:
 *                          description: User signed in, created auth token
 *                          content:
 *                              application/json:
 *                                  schema:
 *                                      $ref: '#/components/schemas/User'
 *                                  example:
 *                                      token: tjgcf46z31
 *                      401:
 *                          description: User is not authorized
 *
 */

router
    .post('/sign-in', async (req, res) => {
        const user = await users.findOne({ login: req.body.login, password: req.body.password });
        if (user) {
            const newToken = {
                token: randomString(10),
            };
            user.token = newToken.token;
            await user.save();
            res.status(201).send(user.token);
        } else {
            res.status(401).send('Не авторизовано');
        }
    });

/**
 * @swagger
 * /auth/logout:
 *          delete:
 *                  summary: Logout, deleting auth token
 *                  tags: [Auth]
 *                  parameters:
 *                      - in: header
 *                        name: Authorization
 *                        schema:
 *                          type: string
 *                          required: true
 *                  responses:
 *                          200:
 *                              description: User was logedout
 *                          401:
 *                              description: User is not authorized
 *
 */

router
    .delete('/logout', async (req, res) => {
        const user = await users.findOne({ token: req.header('Authorization') });
        if (user) {
            user.token = null;
            await user.save();
            return res.status(200).send('Выход произошел успешно');
        }
        return res.status(401).send('Не авторизовано');
    });

module.exports = router;