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
import nodemailer from 'nodemailer';
import jwt, { JsonWebTokenError, TokenExpiredError } from 'jsonwebtoken';
import randomString from '../../utils/rndString';
import Users from '../user/model';
import { signUpSchema, signInSchema, forgotPasswordSchema, resetPasswordSchema } from './validation';
import { ISignUp } from './interfaces/sign-up.interface';
import { ISignIn } from './interfaces/sign-in.interface';
import validate from '../../middleware/validate';
import { IForgot } from './interfaces/forgot-password.interface';
import { IPayloadForgot } from './interfaces/payload.interface';
import { PASSWORD_TOKEN_SECRET } from '../../constants';

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
 *                              email: string
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
 *                                  email: user`s email
 *                                  login: user`s login
 *                                  password: user`s password
 *                                  isAdmin: false
 *                  400:
 *                      description: JOI validation error.
 *                      content:
 *                          application/json:
 *                              schema:
 *                                  $ref: '#/components/schemas'
 *                              example:
 *                                  message: error.details
 *
 */

router
  .post('/sign-up', validate(signUpSchema), async (req: Request<any, any, ISignUp>, res: Response, next: NextFunction) => {
    try {
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(req.body.password, salt);
      const user = new Users({
        email: req.body.email,
        login: req.body.login,
        password: hashedPassword,
      });
      await user.save();
      return res.status(201).json({ message: 'User was registered' });
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
 *                              email: string
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
 *                      400:
 *                          description: JOI validation error.
 *                          content:
 *                              application/json:
 *                                  schema:
 *                                      $ref: '#/components/schemas'
 *                                  example:
 *                                      message: error.details
 *                      401:
 *                          description: Authorization validation error
 *                          content:
 *                          application/json:
 *                              schema:
 *                                  $ref: '#/components/schemas'
 *                              example:
 *                                  message: User is not authorized
 *
 */

router
  .post('/sign-in', validate(signInSchema), async (req: Request<any, any, ISignIn>, res: Response, next: NextFunction) => {
    try {
      const user = await Users.findOne({ email: req.body.email });
      if (!user) {
        return res.status(401).json({ message: 'Unauthorized' });
      }
      const validPassword = await bcrypt.compare(req.body.password, user.password);
      if (!validPassword) {
        return res.status(401).json({ message: 'Unauthorized' });
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
 *                          description: Successful logout
 *                          content:
 *                          application/json:
 *                              schema:
 *                                  $ref: '#/components/schemas'
 *                              example:
 *                                  message: Logout was successful
 *                    401:
 *                          description: Authorization validation error
 *                          content:
 *                          application/json:
 *                              schema:
 *                                  $ref: '#/components/schemas'
 *                              example:
 *                                  message: Unauthorized
 *
 */

router
  .delete('/logout', async (req: Request, res: Response, next: NextFunction) => {
    try {
      const user = await Users.findOne({ token: req.header('Authorization') });
      if (user) {
        user.token = null;
        await user.save();
        return res.status(200).json({ message: 'Logout was successful' });
      }
      return res.status(401).json({ message: 'Unauthorized' });
    } catch (error) {
      return next(error);
    }
  });

/**
 * @swagger
 * /auth/forgot-password:
 *      post:
 *          summary: Sending request for getting reset token
 *          tags: [Auth]
 *          requestBody:
 *              required: true
 *              content:
 *                  application/json:
 *                        schema:
 *                             $ref: '#/components/schemas/User'
 *                        example:
 *                             email: string
 *          responses:
 *                  200:
 *                      description: User has been found and API sent email with token.
 *                      content:
 *                              application/json:
 *                                  schema:
 *                                      $ref: '#/components/schemas/User'
 *                                  example:
 *                                      message: 'Email has been sent!'
 *                  400:
 *                          description: JOI validation error.
 *                          content:
 *                              application/json:
 *                                  schema:
 *                                      $ref: '#/components/schemas'
 *                                  example:
 *                                      message: error.details
 *                  404:
 *                      description: User not found, API won`t send email.
 *                      content:
 *                              application/json:
 *                                  schema:
 *                                      $ref: '#/components/schemas/User'
 *                                  example:
 *                                      message: 'User not found!'
 *                  500:
 *                      description: Error caused by NodeMailer or JWT.
 *                      content:
 *                              application/json:
 *                                  schema:
 *                                      $ref: '#/components/schemas/User'
 *                                  example:
 *                                      error: error.message
 *                                      name: error.name
 */

router
  .post('/forgot-password', validate(forgotPasswordSchema), async (req: Request<any, any, IForgot>, res: Response, next: NextFunction) => {
    try {
      const user = await Users.findOne({ email: req.body.email });
      if (user) {
        const transporter = nodemailer.createTransport({
          host: 'smtp.gmail.com',
          port: 587,
          secure: false,
          auth: {
            user: 'koropsystems@gmail.com',
            pass: 'qvoolmgoajpuwktg',
          },
        });
        const payload: IPayloadForgot = {
          id: user.id,
        };
        const passwordToken = jwt.sign(payload, PASSWORD_TOKEN_SECRET, { expiresIn: '10m' });
        console.log('aftertokensign');
        const message = {
          from: 'Korop Systems <koropsystems@gmail.com>',
          to: user.email,
          subject: '[KropBooks] Reset password',
          text: `Hello ${user.login},


          A request has been received to change the password for your KropBooks account.


          Your repair code - ${passwordToken}, time of expiration is 10 minutes.


          Thank you,
          The Korop-Systems Team`,
        };
        return transporter.sendMail(message, (err) => {
          if (err) return res.status(500).json(err);
          return res.status(200).json({ message: 'Email has been sent!' });
        });
      }
      return res.status(404).json({ message: 'User not found!' });
    } catch (error) {
      if (error instanceof JsonWebTokenError) {
        return res.status(500).json({
          error: error.message,
          name: error.name,
        });
      }
      return next(error);
    }
  });

/**
 * @swagger
 * /auth/reset-password:
 *      post:
 *          summary: User reseting password.
 *          tags: [Auth]
 *          requestBody:
 *              required: true
 *              content:
 *                application/json:
 *                      schema:
 *                          $ref: '#/components/schemas/User'
 *                      example:
 *                          resetToken: string
 *                          newPassword: string
 *          responses:
 *                  200:
 *                      description: User successfully reseted password.
 *                      content:
 *                              application/json:
 *                                  schema:
 *                                      $ref: '#/components/schemas/User'
 *                                  example:
 *                                      message: 'Password change successful'
 *                  400:
 *                          description: JOI validation error.
 *                          content:
 *                              application/json:
 *                                  schema:
 *                                      $ref: '#/components/schemas'
 *                                  example:
 *                                      message: error.details
 *                  403:
 *                      description: Error caused by JWTVerifyErrors.
 *                      content:
 *                              application/json:
 *                                  schema:
 *                                      $ref: '#/components/schemas/User'
 *                                  example:
 *                                      error: error.message
 *                                      name: error.name
 *                  404:
 *                      description: API couldn`t find user, error.
 *                      content:
 *                              application/json:
 *                                  schema:
 *                                      $ref: '#/components/schemas/User'
 *                                  example:
 *                                      message: 'User not found'
 *                  500:
 *                      description: JWTError or JWTExpiredError
 *                      content:
 *                              application/json:
 *                                  schema:
 *                                      $ref: '#/components/schemas/User'
 *                                  example:
 *                                      error: error.message
 *                                      name: error.name
 */

router
  .post('/reset-password', validate(resetPasswordSchema), async (req: Request, res: Response, next: NextFunction) => {
    try {
      const {
        resetToken, newPassword,
      } = req.body;
      jwt.verify(resetToken, PASSWORD_TOKEN_SECRET, async (err: any, data: any) => {
        if (err) {
          return res.status(403).json({
            error: err.message,
            name: err.name,
          });
        }
        const user = await Users.findOne({ _id: data.id });
        if (user) {
          const checkUnique = await bcrypt.compare(newPassword, user.password);
          if (checkUnique) {
            return res.status(422).json({
              message: 'New password should be different from old one.',
            });
          }
          const salt = await bcrypt.genSalt(10);
          const newHashed = await bcrypt.hash(newPassword, salt);
          user.password = newHashed;
          await user.save();
          return res.status(200).json({
            message: 'Password change successful',
          });
        }
        return res.status(404).json({
          message: 'User not found',
        });
      });
    } catch (error) {
      if (error instanceof JsonWebTokenError) {
        return res.status(500).json({
          error: error.message,
          name: error.name,
        });
      }
      if (error instanceof TokenExpiredError) {
        return res.status(500).json({
          error: error.message,
          name: error.name,
        });
      }
      return next(error);
    }
  });

export default router;
