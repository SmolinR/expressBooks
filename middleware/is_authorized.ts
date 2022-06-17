import { NextFunction, Request, Response } from 'express';
import users from '../api/user/model';

const isAuth = async function isAuthorized(req: Request, res: Response, next: NextFunction) {
  const user = await users.findOne({ token: req.header('Authorization') }, { password: 0 });
  if (!req.header('Authorization')) {
    return res.status(401).json({ message: 'Не авторизировано' });
  }
  if (user) {
    req.user = user;
    return next();
  }
  return res.status(401).json({ message: 'Не авторизировано' });
};
export default isAuth;
