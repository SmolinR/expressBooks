import { Request } from 'express';
import { IUser } from '../api/user/model';

export interface Req extends Request {
  user: IUser
}
