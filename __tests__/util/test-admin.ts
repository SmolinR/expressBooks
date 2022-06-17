import User from '../../api/user/model';
import { ITestUser } from '../interfaces/user.interface';

const makeAdmin = async () => {
  const admin = new User({
    login: 'ruhaAdmin',
    password: '123',
    isAdmin: true,
    token: 'z4ldj1gppj',
  });
  await admin.save();
  return admin.toObject() as ITestUser;
};
export default makeAdmin;
