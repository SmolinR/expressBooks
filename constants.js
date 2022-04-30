require("dotenv").config()
const MONGO_URL = process.env.MONGO_URL

const FRONTEND_URL = process.env.FRONTEND_URL

const PORT = process.env.PORT

module.exports = { PORT }
module.exports = { FRONTEND_URL }
module.exports = { MONGO_URL }