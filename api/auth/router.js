/**
 * @swagger
 *  tags:
 *      name: Auth
 *      description: The auth managing API
 */
const express = require('express');

const router = express.Router();
const randomString = require('../../utils/rndString');
const Users = require('../user/model');
const { signInValidation, signUpValidation } = require('./validation');

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
        const { error } = signUpValidation(req.body);
        if (error) {
            return res.status(400).json({ message: error.details[0].message });
        }
        const user = new Users({
            login: req.body.login,
            password: req.body.password,
        });
        await user.save();
        return res.status(201).json({ message: 'Пользователь зарегестрирован' });
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
        const { error } = signInValidation(req.body);
        if (error) {
            return res.status(400).json({ message: error.details[0].message });
        }
        const user = await Users.findOne({ login: req.body.login, password: req.body.password });
        if (user) {
            const newToken = {
                token: randomString(10),
            };
            user.token = newToken.token;
            await user.save();
            return res.status(201).json({ token: user.token });
        }
        return res.status(401).json({ message: 'Не авторизовано' });
    });

/**
 * @swagger
 * /auth/logout:
 *       delete:
 *              summary: Logout, deleting auth token
 *              tags: [Auth]
 *              parameters:
 *                 - in: header
 *                   name: Authorization
 *                   schema:
 *                      type: string
 *                      required: true
 *              responses:
 *                    200:
 *                        description: User was logedout
 *                    401:
 *                        description: User is not authorized
 *
 */

router
    .delete('/logout', async (req, res) => {
        const user = await Users.findOne({ token: req.header('Authorization') });
        if (user) {
            user.token = null;
            await user.save();
            return res.status(200).json({ message: 'Выход произошел успешно' });
        }
        return res.status(401).json({ message: 'Не авторизовано' });
    });

module.exports = router;
