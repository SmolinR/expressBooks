const mongoose = require('mongoose');

const schema = mongoose.Schema({
    login: String,
    password: String,
    token: String,
    avarageRating: Number,
    isAdmin: { type: Boolean, default: false },
});

module.exports = mongoose.model('users', schema);