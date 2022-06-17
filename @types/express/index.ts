import {IUser} from '../../api/user/model';

declare global {
  namespace Express {
    interface Request {
      user: IUser;
    }
  }
}