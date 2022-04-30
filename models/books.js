const mongoose = require('mongoose')
const users = require('./users')

const schema = mongoose.Schema({
    title: String,
    authorId: { type: mongoose.Schema.Types.ObjectId, ref: 'users' },
    rating: Number,
    comment: { type: Array, default: [] }
})

module.exports = mongoose.model('books', schema)