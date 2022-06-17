import { IUser } from '../../api/user/model';

export interface ITestUser extends IUser {
  _id: string
  token: string
}
