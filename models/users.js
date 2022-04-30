const mongoose = require('mongoose');
const books = require('./books');

const schema = mongoose.Schema({
    login: String,
    password: String,
    token: String,
    avarageRating: Number,
})

module.exports = mongoose.model('users', schema)