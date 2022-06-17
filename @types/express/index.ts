import { IUser } from '../../api/user/model';

 declare global {
 export namespace Express {
    export interface Request {
      user: IUser;
    }
  }
}
