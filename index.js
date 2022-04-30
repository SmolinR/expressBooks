const express = require('express');
const cors = require('cors');
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
        app.use(express.json())
        app.use('/auth', authRouter)
        app.use('/users', usersRouter)
        app.use('/user', userRouter);
        app.use('/books', bookRouter);
        app.use('/categories', categoriesRouter)
        app.use('/admin', adminRouter)


        app.listen(PORT, () => {
            console.log(`Server has started on port${PORT}!`)
        })
    })