const mongoose = require('mongoose');
const { MONGO_TEST_URL } = require('../../constants');

module.exports = async function connectionFunc() {
    await mongoose.connect(MONGO_TEST_URL, { useNewUrlParser: true });
};
