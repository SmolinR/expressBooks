import {
  NextFunction, Request, Response,
} from 'express';

const isAdmin = async function isAdm(req: Request, res: Response, next: NextFunction) {
  if (req.user.isAdmin) {
    return next();
  }
  return res.status(403).json({ message: 'Вы не имеете прав для совершения запроса' });
};
export default isAdmin;
