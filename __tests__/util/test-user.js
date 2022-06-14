const User = require('../../api/user/model');

const makeUser = async () => {
  const user = new User({
    login: 'ruhaUser',
    password: '123',
    isAdmin: false,
    token: 'mjxcf78z36',
  });
  await user.save();
  return user;
};
module.exports = makeUser;
