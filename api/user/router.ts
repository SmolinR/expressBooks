/**
 * @swagger
 *  tags:
 *      name: User
 *      description: The users managing API
 */
import express, { Request, Response, NextFunction } from 'express';

import isAuth from '../../middleware/is_authorized';
import users from './model';

const router = express.Router();
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
  .get('/me', async (req: Request, res: Response, next: NextFunction) => {
    try {
      return res.status(200).json(req.user);
    } catch (error) {
      return next(error);
    }
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
  .get('/', async (req: Request, res: Response, next: NextFunction) => {
    try {
      const allUsers = await users.find({}, { password: 0 });
      return res.status(200).json(allUsers);
    } catch (error) {
      return next(error);
    }
  });
export default router;
