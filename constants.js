require("dotenv").config()
const MONGO_URL = process.env.MONGO_URL

const FRONTEND_URL = process.env.FRONTEND_URL
module.exports = { FRONTEND_URL }
module.exports = { MONGO_URL }