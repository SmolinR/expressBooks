const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const swaggerJsdoc = require("swagger-jsdoc");
const swaggerUi = require("swagger-ui-express");
const authRouter = require('./routers/auth_router')
const bookRouter = require('./routers/books_router')
const userRouter = require('./routers/user_router')
const usersRouter = require('./routers/users_router');
const categoriesRouter = require('./routers/categories_router')
const adminRouter = require('./routers/admin_router')
const mongoose = require('mongoose')
const { MONGO_URL } = require('./constants');
const { FRONTEND_URL } = require('./constants')
const { PORT } = require('./constants')
mongoose
    .connect(MONGO_URL, { useNewUrlParser: true })
    .then(() => {
        const app = express()
        app.use(cors({
            origin: FRONTEND_URL
        }))
        app.use(bodyParser.urlencoded({ extended: true }))
        app.use(bodyParser.json())
        app.use(express.json())
        app.use('/auth', authRouter)
        app.use('/users', usersRouter)
        app.use('/user', userRouter);
        app.use('/books', bookRouter);
        app.use('/categories', categoriesRouter)
        app.use('/admin', adminRouter)

        const options = {
            definition: {
                openapi: "3.0.0",
                info: {
                    title: "Books app documentation",
                    version: "0.1.0",
                    description: "There is all routes for this app",
                    license: {
                        name: "MIT",
                        url: "https://spdx.org/licenses/MIT.html",
                    },
                    contact: {
                        name: "SmolinR",
                        url: "https://github.com/SmolinR",
                        email: "rslnsmln@gmail.com",
                    },
                },
                security: [{
                    "ApiKeyAuth": []
                }],
                components: {
                    "securitySchemes": {
                        "ApiKeyAuth": {
                            "type": "apiKey",
                            "description": "API key to authorize requests.",
                            "name": "Authorization",
                            "in": "header"
                        }
                    },
                },
                servers: [{
                    url: "http://localhost:3000",
                }, ],
            },
            apis: ['./routers/*'],
        };

        const specs = swaggerJsdoc(options);
        app.use(
            "/api-docs",
            swaggerUi.serve,
            swaggerUi.setup(specs, { explorer: true })
        );



        app.listen(PORT, () => {
            console.log(`Server has started on port${PORT}!`)
        })
    })