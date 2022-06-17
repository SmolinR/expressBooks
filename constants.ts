require('dotenv').config();

interface ENV extends NodeJS.ProcessEnv {
  PORT: string
  MONGO_URL: string
  FRONTEND_URL: string
  MONGO_TEST_URL: string
}
const {
  PORT, MONGO_URL, FRONTEND_URL, MONGO_TEST_URL,
} = process.env as ENV;

export { MONGO_URL, FRONTEND_URL, PORT, MONGO_TEST_URL, }
