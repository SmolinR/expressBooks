import User from '../../api/user/model';
import { ITestUser } from '../interfaces/user.interface';

const makeUser = async () => {
  const user = new User({
    login: 'ruhaUser',
    password: '123',
    isAdmin: false,
    token: 'mjxcf78z36',
  });
  await user.save();
  return user.toObject() as ITestUser;
};
export default makeUser;
