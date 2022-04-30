const { Router } = require('express');
const express = require('express');
const authRouter = require('./routers/auth_router')
const bookRouter = require('./routers/books_router')
const userRouter = require('./routers/user_router')
const usersRouter = require('./routers/users_router');
const categoriesRouter = require('./routers/categories_router')
const res = require('express/lib/response');
const { use } = require('express/lib/router');
const mongoose = require('mongoose')
const { MONGO_URL } = require('./constants');
const categories = require('./models/categories');
mongoose
    .connect(MONGO_URL, { useNewUrlParser: true })
    .then(() => {
        const app = express()
        app.use(express.json())
        app.use('/auth', authRouter)
        app.use('/users', usersRouter)
        app.use('/user', userRouter);
        app.use('/books', bookRouter);
        app.use('/categories', categoriesRouter)


        app.listen(3000, () => {
            console.log("Server has started!")
        })
    })