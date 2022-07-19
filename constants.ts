import dotenv from 'dotenv';

dotenv.config();

interface ENV extends NodeJS.ProcessEnv {
  PORT: string
  MONGO_URL: string
  FRONTEND_URL: string
  MONGO_TEST_URL: string
  PASSWORD_TOKEN_SECRET: string
}
const {
  PORT, MONGO_URL, FRONTEND_URL, MONGO_TEST_URL, PASSWORD_TOKEN_SECRET,
} = process.env as ENV;

export {
  MONGO_URL, FRONTEND_URL, PORT, MONGO_TEST_URL, PASSWORD_TOKEN_SECRET,
};
