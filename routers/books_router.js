const { query } = require('express');
const express = require('express');
const router = express.Router();
const isAuth = require('../middleware/is_authorized')
const books = require('../models/books');
const users = require('../models/users');
const randomNumber = require('../utils/rndNumb');
const randomNumber2 = require('../utils/rndNumb2');


router.use(isAuth)

router
    .get('/', async function(req, res) {
        if (req.query.users == 'true') {
            const allBooks = await books.find().populate('authorId');
            res.status(200).send(allBooks)
        } else if (req.query.authorId) {
            const book = await books.find({ authorId: req.query.authorId })
            console.log(book)
            if (!book) {
                res.status(404).send('Книги этого автора не найдены')
            } else {
                res.status(200).send(book)
            }

        } else {
            const allBooks2 = await books.find();
            res.status(200).send(allBooks2)
        }
    })
router
    .post('/', async function(req, res) {
        const user = await users.findOne({ _id: req.query.authorId })
        if (user) {
            const book = new books({
                title: req.query.title,
                authorId: req.query.authorId,
                rating: randomNumber2(0, 100)
            })
            await book.save();
            let avarageRating = await books.aggregate([
                { $group: { _id: "$authorId", avg: { $avg: "$rating" } } },
            ])
            console.log(avarageRating)
            user.avarageRating = avarageRating[0].avg;
            await user.save();
            return res.status(201).send('Книга создана')
        }
        res.status(404).send('Такого автора не существует');


    })

router
    .get('/:id/comments', async function(req, res) {
        const comment = await books.findById(req.params.id)
        res.send(comment.comment)
    })

router
    .post('/:id/comments', async function(req, res) {
        const book = await books.findById(req.params.id)
        let comment = {
            text: req.query.text,
            date: new Date(),
            commentator: req.user.id
        }
        book.comment[book.comment.length] = comment
        await book.save()
        res.send(book.comment)
    })

module.exports = router