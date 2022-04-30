const { Router } = require('express');
const express = require('express');
const auth = require('./routers/auth_router')
const book = require('./routers/books_router')
const user_router = require('./routers/user_router')
const users_router = require('./routers/users_router');
const res = require('express/lib/response');
const { use } = require('express/lib/router');
const mongoose = require('mongoose')
const { MONGO_URL } = require('./constants')
mongoose
    .connect(MONGO_URL, { useNewUrlParser: true })
    .then(() => {
        const app = express()
        app.use(express.json())
        app.use('/auth', auth)
        app.use('/users', users_router)
        app.use('/user', user_router);
        app.use('/books', book);


        app.listen(3000, () => {
            console.log("Server has started!")
        })
    })