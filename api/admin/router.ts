/**
 * @swagger
 *  tags:
 *      name: Admin permission
 *      description: The admin`s permission managing API
 */
import {
  Request, Response, Router,
} from 'express';
import isAdmin from '../../middleware/is_admin';
import isAuth from '../../middleware/is_authorized';
import { IMakeAdmin } from './interfaces/make-admin.interface';
import users from '../user/model';
import adminValidation from './validation';
import { IDeleteAdmin } from './interfaces/delete-admin.interface';

const router = Router();

router.use(isAuth, isAdmin);

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
  .patch('/make-admin', async (req: Request<any, any, IMakeAdmin>, res: Response) => {
    const { error } = adminValidation(req.body);
    if (error) {
      return res.status(400).json({ message: error.details[0].message });
    }
    const user = await users.findOne({ _id: req.body.id });
    if (user) {
      user.isAdmin = true;
      await user.save();
      return res.status(200).json({ message: 'Администратор успешно назначен' });
    }
    return res.status(404).json({ message: 'Пользователь не найден' });
  });

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
  .patch('/delete-admin', async (req: Request<any, any, IDeleteAdmin>, res: Response) => {
    const { error } = adminValidation(req.body);
    if (error) {
      return res.status(400).json({ message: error.details[0].message });
    }
    const user = await users.findOne({ _id: req.body.id });
    if (user) {
      user.isAdmin = false;
      await user.save();
      return res.status(200).json({ message: 'Администратор успешно снят' });
    }
    return res.status(404).json({ message: 'Пользователь не найден' });
  });
export default router;
