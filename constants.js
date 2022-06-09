require('dotenv').config();

const {
    PORT, MONGO_URL, FRONTEND_URL, MONGO_TEST_URL,
} = process.env;

module.exports = {
    MONGO_URL, FRONTEND_URL, PORT, MONGO_TEST_URL,
};
