/**
 * @swagger
 *  tags:
 *      name: Categories
 *      description: The categories managing API
 */

const express = require('express');

const router = express.Router();
const Categories = require('../models/categories');
const isAdmin = require('../middleware/is_admin');
const isAuth = require('../middleware/is_authorized');

router.use(isAuth, isAdmin);

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
    .get('/', async (req, res) => {
        const allCategories = await Categories.find();
        return res.status(200).send(allCategories);
    });
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
    .post('/', async (req, res) => {
        const category = new Categories({
            title: req.body.title,
            icon: req.body.icon,
        });
        await category.save();
        return res.status(201).send(category);
    });

module.exports = router;
