/**
 * @swagger
 * components:
 *   schemas:
 *     Categories:
 *       type: object
 *       required:
 *         - title
 *         - icon
 *       properties:
 *         id:
 *          type: string
 *          description: Id of category.
 *         title:
 *           type: string
 *           description: Title of category.
 *         icon:
 *           type: string
 *           description: Icon of category
 *       example:
 *          id: 626d45403f06a5f6fe50ce21
 *          title: Comedy
 *          icon: URL of icon
 */

/**
 * @swagger
 *  tags:
 *      name: Categories
 *      description: The categories managing API
 */




const mongoose = require('mongoose');
const express = require('express')
const router = express.Router();
const categories = require('../models/categories');
const isAdmin = require('../middleware/is_admin');
const isAuth = require('../middleware/is_authorized');

router.use(isAuth, isAdmin)

/**
 * @swagger
 * /categories:
 *          get:
 *              summary: Returns list of all categories.
 *              tags: [Categories]
 *              responses:
 *                      200:
 *                          description: The list of categories
 *                          content:
 *                              aplication/json:
 *                                  schema:
 *                                      type: array
 *                                      items:
 *                                          $ref: '#/components/schemas/Categories'
 *                      401:
 *                          description: User is not authorized
 *                      403:
 *                          description: User doesn`t have permissions
 */

router
    .get('/', async function(req, res) {
        const allCategories = await categories.find()
        return res.status(200).send(allCategories)
    })
    /**
     * @swagger
     *  /categories:
     *          post:
     *              summary: Create new category, admin permission only
     *              tags: [Categories]
     *              requestBody:
     *                  required: true
     *                  content:
     *                      application/json:
     *                              schema:
     *                                  $ref: '#/components/schemas/Categories'
     *              responses:
     *                      201:
     *                          description: The category was created
     *                          content:
     *                              application/json:
     *                                  $ref: '#/components/schemas/Categories'
     *                      401:
     *                          description: User is not authorized
     *                      403:
     *                          description: User doesn`t have permissions
     *                          
     */
router
    .post('/', async function(req, res) {
        const category = new categories({
            title: req.body.title,
            icon: req.body.title
        })
        await category.save()
        res.status(201).send(category)
    })

module.exports = router