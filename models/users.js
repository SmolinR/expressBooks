const mongoose = require('mongoose');

const schema = mongoose.Schema({
    login: String,
    password: String,
    token: String,
    avarageRating: Number,
    isAdmin: Boolean
})

module.exports = mongoose.model('users', schema)