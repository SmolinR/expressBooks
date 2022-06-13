const User = require('../../api/user/model');

const admin = new User({
  login: 'ruhaAdmin',
  password: '123',
  isAdmin: true,
  token: 'z4ldj1gppj',
});
admin.save();
module.exports = admin;
