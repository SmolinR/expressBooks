const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const swaggerJsdoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');
const authRouter = require('./api/auth/router');
const bookRouter = require('./api/book/router');
const usersRouter = require('./api/user/router');
const categoriesRouter = require('./api/category/router');
const adminRouter = require('./api/admin/router');
const { FRONTEND_URL } = require('./constants');
const options = require('./swagger-options');

const app = express();
app.use(cors({
  origin: FRONTEND_URL,
}));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.json());
app.use('/auth', authRouter);
app.use('/users', usersRouter);
app.use('/books', bookRouter);
app.use('/categories', categoriesRouter);
app.use('/admin', adminRouter);
const specs = swaggerJsdoc(options);

app.use(
  '/api-docs',
  swaggerUi.serve,
  swaggerUi.setup(specs, { explorer: true }),
);
module.exports = app;
