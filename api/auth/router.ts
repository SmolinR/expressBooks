/**
 * @swagger
 *  tags:
 *      name: Auth
 *      description: The auth managing API
 */
import {
  NextFunction, Request, Response, Router,
} from 'express';

import bcrypt from 'bcrypt';
import randomString from '../../utils/rndString';
import Users from '../user/model';
import { signUpSchema, signInSchema } from './validation';
import { ISignUp } from './interfaces/sign-up.interface';
import { ISignIn } from './interfaces/sign-in.interface';
import validate from '../../middleware/validate';

const router = Router();

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
  .post('/sign-up', validate(signUpSchema), async (req: Request<any, any, ISignUp>, res: Response, next: NextFunction) => {
    try {
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(req.body.password, salt);
      const user = new Users({
        login: req.body.login,
        password: hashedPassword,
      });
      await user.save();
      return res.status(201).json({ message: 'Пользователь зарегестрирован' });
    } catch (error) {
      return next(error);
    }
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
  .post('/sign-in', validate(signInSchema), async (req: Request<any, any, ISignIn>, res: Response, next: NextFunction) => {
    try {
      const user = await Users.findOne({ login: req.body.login });
      if (!user) {
        return res.status(401).json({ message: 'Не авторизовано' });
      }
      const validPassword = await bcrypt.compare(req.body.password, user.password);
      if (!validPassword) {
        return res.status(401).json({ message: 'Не авторизовано' });
      }
      user.token = randomString(10);
      await user.save();
      return res.status(201).json({ token: user.token });
    } catch (error) {
      return next(error);
    }
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
  .delete('/logout', async (req: Request, res: Response, next: NextFunction) => {
    try {
      const user = await Users.findOne({ token: req.header('Authorization') });
      if (user) {
        user.token = null;
        await user.save();
        return res.status(200).json({ message: 'Выход произошел успешно' });
      }
      return res.status(401).json({ message: 'Не авторизовано' });
    } catch (error) {
      return next(error);
    }
  });

export default router;
