/**
 * @swagger
 * components:
 *   schemas:
 *     Book:
 *       type: object
 *       required:
 *         - title
 *         - author
 *         - finished
 *       properties:
 *         id:
 *           type: integer
 *           description: The auto-generated id of the book.
 *         title:
 *           type: string
 *           description: The title of your book.
 *         authorId:
 *           type: String
 *           description: Id of book`s author.
 *         rating:
 *           type: Number
 *           description: Have you finished reading it?
 *         comment:
 *           type: array
 *           description: The array of text, date and commentator`s id.
 *       example:
 *          title: The Pragmatic Programmer
 *          authorId: 4564534756jdfn43534
 *          rating: 40
 *          comment: [{text: some text, date: new Date(), commentator: user.id}]
 */

/**
 * @swagger
 *  tags:
 *      name: Books
 *      description: The books managing API
 */

const express = require('express');
const res = require('express/lib/response');

const router = express.Router();
const isAuth = require('../middleware/is_authorized');
const books = require('../models/books');
const users = require('../models/users');
const randomNumber2 = require('../utils/rndNumb2');

router.use(isAuth);

/**
 * @swagger
 * /books:
 *      get:
 *          summary: Returns the list of all books, if u type authorId in body u get books of this author, if u type users=true in query parameters
 *          tags: [Books]
 *          parameters:
 *              - in: query
 *                name: authorId
 *                schema:
 *                  type: string
 *                  description: The author`s id
 *              - in: query
 *                name: users
 *                schema:
 *                  type: boolean
 *                  description: Users parameter for authorId
 *          responses:
 *              200:
 *                  description: The list of the books
 *                  content:
 *                      application/json:
 *                       schema:
 *                          type: array
 *                          items:
 *                              $ref: '#/components/schemas/Book'
 *              401:
 *                  description: User is not authorized
 *
 */

router
    .get('/', async (req, res) => {
        if (req.query.users === 'true') {
            const allBooks = await books.find().populate('authorId');
            res.status(200).send(allBooks);
        } else if (req.query.authorId) {
            const book = await books.find({ authorId: req.query.authorId });
            if (!book) {
                res.status(404).send('Книги этого автора не найдены');
            } else {
                res.status(200).send(book);
            }
        } else {
            const allBooks2 = await books.find();
            res.status(200).send(allBooks2);
        }
    });

/**
 * @swagger
 *  /books:
 *       post:
 *          summary: Create a new book
 *          tags: [Books]
 *          requestBody:
 *              required: true
 *              content:
 *                  application/json:
 *                      schema:
 *                          $ref: '#/components/schemas/Book'
 *                      example:
 *                          title: string
 *                          authorId: string
 *          responses:
 *              201:
 *                  description: The book was created
 *                  content:
 *                      application/json:
 *                          $ref: '#/components/schemas/Book'
 *              401:
 *                  description: User is not authorized
 *              404:
 *                  description: The book`s author is not found
 *
 *
 *
 */

router
    .post('/', async (req, res) => {
        const user = await users.findOne({ _id: req.body.authorId });
        if (user) {
            const book = new books({
                title: req.body.title,
                authorId: req.body.authorId,
                rating: randomNumber2(0, 100),
            });
            await book.save();
            const avarageRating = await books.aggregate([
                { $group: { _id: '$authorId', avg: { $avg: '$rating' } } },
            ]);
            console.log(avarageRating);
            user.avarageRating = avarageRating[0].avg;
            await user.save();
            return res.status(201).send('Книга создана');
        }
        res.status(404).send('Такого автора не существует');
    });

/**
 * @swagger
 * /books/{id}/comments:
 *                  get:
 *                      summary: Get comments to book by id
 *                      tags: [Books]
 *                      parameters:
 *                          - in: path
 *                            name: id
 *                            schema:
 *                              type: string
 *                            required: true
 *                            description: The book id
 *                      responses:
 *                          200:
 *                              description: The book comments by id
 *                              contens:
 *                                  application/json:
 *                                      schema:
 *                                          $ref: '#/components/schemas/Book'
 *                          401:
 *                              description: User is not authorized
 *                          404:
 *                             description: The book is not found
 *
 *
 */

router
    .get('/:id/comments', async (req, res) => {
        console.log(req.params.id);
        const comment = await books.findById(req.params.id);
        if (comment) {
            return res.status(200).send(comment.comment);
        }
        res.status(404).send('Книга не найдена');
    });

/**
 * @swagger
 * /books/{id}/comments:
 *                 post:
 *                      summary: Create comment to book by id
 *                      tags: [Books]
 *                      requestBody:
 *                          required: true
 *                          content:
 *                              application/json:
 *                                  schema:
 *                                      $ref: '#/components/schemas/Book'
 *                                  example:
 *                                      text: string
 *                      parameters:
 *                          - in: path
 *                            name: id
 *                            schema:
 *                              type: string
 *                            required: true
 *                            description: The book id
 *                      responses:
 *                          201:
 *                              description: The comment was successfully created
 *                              content:
 *                                  application/json:
 *                                          $ref: '#/components/schemas/Book'
 *                          404:
 *                              description: The book is not found
 *
 */

router
    .post('/:id/comments', async (req, res) => {
        const book = await books.findById(req.params.id);
        if (book) {
            const comment = {
                text: req.body.text,
                date: new Date(),
                commentator: req.user.id,
            };
            book.comment[book.comment.length] = comment;
            await book.save();
            return res.status(201).send(book.comment);
        }
        res.status(404).send('Книга не найдена');
    });

module.exports = router;