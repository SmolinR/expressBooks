/**
 * @swagger
 *  tags:
 *      name: Categories
 *      description: The categories managing API
 */

import express, { Request, Response, NextFunction } from 'express';

import Categories, { ICategory } from './model';
import isAdmin from '../../middleware/is_admin';
import isAuth from '../../middleware/is_authorized';
import categoriesSchema from './validation';
import validate from '../../middleware/validate';

const router = express.Router();
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
  .get('/', async (req: Request, res: Response, next: NextFunction) => {
    try {
      const allCategories = await Categories.find();
      return res.status(200).json(allCategories);
    } catch (error) {
      return next(error);
    }
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
  .post('/', validate(categoriesSchema), async (req: Request<any, any, ICategory>, res: Response, next: NextFunction) => {
    try {
      const category = new Categories({
        title: req.body.title,
        icon: req.body.icon,
      });
      await category.save();
      return res.status(201).json(category);
    } catch (error) {
      return next(error);
    }
  });

export default router;
