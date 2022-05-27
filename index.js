const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const swaggerJsdoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');
const mongoose = require('mongoose');
const authRouter = require('./api/auth/router');
const bookRouter = require('./api/book/router');
const usersRouter = require('./api/user/router');
const categoriesRouter = require('./api/category/router');
const adminRouter = require('./api/admin/router');
const { MONGO_URL, FRONTEND_URL } = require('./constants');
const options = require('./swagger-options');

mongoose
    .connect(MONGO_URL, { useNewUrlParser: true })
    .then(() => {
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
        const PORT = process.env.PORT || 3000;

        app.listen(PORT, () => {
            // eslint-disable-next-line no-console
            console.log(`Server has started on port ${PORT}!`);
        });
    });
