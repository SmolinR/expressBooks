const mongoose = require('mongoose');

module.exports = async function disconnectionFunc() {
    await mongoose.connection.close();
};
