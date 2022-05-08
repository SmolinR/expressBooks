require('dotenv').config();

const { MONGO_URL } = process.env;

const { FRONTEND_URL } = process.env;

const { PORT } = process.env;

module.exports = { MONGO_URL, FRONTEND_URL, PORT };
