const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const swaggerJsdoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');
const mongoose = require('mongoose');
const authRouter = require('./routers/auth_router');
const bookRouter = require('./routers/books_router');
const userRouter = require('./routers/user_router');
const usersRouter = require('./routers/users_router');
const categoriesRouter = require('./routers/categories_router');
const adminRouter = require('./routers/admin_router');
const { PORT, MONGO_URL, FRONTEND_URL } = require('./constants');
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
        app.use('/user', userRouter);
        app.use('/books', bookRouter);
        app.use('/categories', categoriesRouter);
        app.use('/admin', adminRouter);

        const specs = swaggerJsdoc(options);
        app.use(
            '/api-docs',
            swaggerUi.serve,
            swaggerUi.setup(specs, { explorer: true }),
        );

        app.listen(PORT, () => {
            // eslint-disable-next-line no-console
            console.log(`Server has started on port ${PORT}!`);
        });
    });
