require("dotenv").config()
const MONGO_URL = process.env.MONGO_URL

const FRONTEND_URL = process.env.FRONTEND_URL

const PORT = process.env.PORT

module.exports = { MONGO_URL, FRONTEND_URL, PORT }