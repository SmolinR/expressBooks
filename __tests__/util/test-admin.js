const User = require('../../api/user/model');

const makeAdmin = async () => {
  const admin = new User({
    login: 'ruhaAdmin',
    password: '123',
    isAdmin: true,
    token: 'z4ldj1gppj',
  });
  await admin.save();
  return admin;
};
module.exports = makeAdmin;
