const User = require('../../api/user/model');
const user = new User({
  login: 'ruhaUser',
  password: '123',
  isAdmin: false,
  token: 'mjxcf78z36',
});
user.save();
module.exports = user;
