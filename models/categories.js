const mongoose = require('mongoose');

const schema = mongoose.Schema({
    title: String,
    icon: String,
});

module.exports = mongoose.model('categories', schema);