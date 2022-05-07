/**
 * @swagger
 *  tags:
 *      name: Admin permission
 *      description: The admin`s permission managing API
 */

const express = require('express');
const mongoose = require('mongoose');
const isAdmin = require('../middleware/is_admin');
const isAuth = require('../middleware/is_authorized');
const users = require('../models/users');
const { route } = require('./user_router');
const router = express.Router();

router.use(isAuth, isAdmin)

/**
 * @swagger
 * /admin/make-admin:
 *          patch:
 *              summary: Giving user admin permissions
 *              tags: [Admin permission]
 *              requestBody:
 *                  required: true
 *                  content:
 *                      application/json:
 *                          schema:
 *                              $ref: '#/components/schemas/User'
 *                          example:
 *                              id: string
 *              responses:
 *                  200:
 *                      description: User has received admin permissions
 *                  401:
 *                      description: User is not authorized
 *                  403: 
 *                      description: User dont have admin permissions to give it to other
 *                  
 */

router
    .patch('/make-admin', async function(req, res) {
        const user = await users.findOne({ _id: req.body.id })
        if (user) {
            user.isAdmin = true
            await user.save()
            return res.status(200).send('Администратор успешно назначен')
        }
        res.status(404).send('Пользователь не найден')
    })

/**
 * @swagger
 * /admin/delete-admin:
 *              patch:
 *                  summary: Deleting admin permissions of user
 *                  tags: [Admin permission]
 *                  requestBody:
 *                      required: true
 *                      content:
 *                          application/json:
 *                              schema:
 *                                  $ref: '#/components/schemas/User'
 *                              example:
 *                                  id: string
 *                  responses:
 *                      200:
 *                          description: User has lost admin permissions
 *                      401:
 *                          description: User is not authorized
 *                      403: 
 *                          description: User dont have admin permissions to give it to other
 *                  
 */

router
    .patch('/delete-admin', async function(req, res) {
        const user = await users.findOne({ _id: req.body.id })
        if (user) {
            user.isAdmin = false
            await user.save()
            return res.status(200).send('Администратор успешно снят')
        }
    })
module.exports = router