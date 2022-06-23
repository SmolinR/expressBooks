import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import swaggerJsdoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';
import authRouter from './api/auth/router';
import bookRouter from './api/book/router';
import usersRouter from './api/user/router';
import categoriesRouter from './api/category/router';
import adminRouter from './api/admin/router';
import { FRONTEND_URL } from './constants';
import options from './swagger-options';
import errorHandler from './middleware/error';

const app = express();
app.use(cors({
  origin: FRONTEND_URL,
}));
app.use(errorHandler);
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
export default app;
