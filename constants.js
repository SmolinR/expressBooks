require('dotenv').config();

const { PORT, MONGO_URL, FRONTEND_URL } = process.env;

module.exports = { MONGO_URL, FRONTEND_URL, PORT };
