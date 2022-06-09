const mongoose = require('mongoose');
const { db } = require('./api/user/model');
const { MONGO_URL } = require('./constants');

mongoose
    .connect(MONGO_URL, { useNewUrlParser: true, maxPoolSize: 10 })
    .then(() => {
        console.log('Mongoose connected');
    });
module.exports = db;
