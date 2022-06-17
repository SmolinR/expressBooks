/**
 * @swagger
 *  tags:
 *      name: Books
 *      description: The books managing API
 */

import express, { Request, Response } from 'express';

const router = express.Router();
import { isAuth } from '../../middleware/is_authorized';
import Books from './model';
import users from '../user/model';
import randomNumber2 from '../../utils/rndNumb2';
import { bookPostValidation, bookGetValidation } from './validation';
import { IBookPost } from './interfaces/book-post.interface';
import { IBookGet } from './interfaces/book-get.interface';

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
  // eslint-disable-next-line consistent-return
  .get('/', async (req: Request<any, any, any, IBookGet> , res: Response) => {
    const { error } = bookGetValidation(req.query);
    if (error) {
      return res.status(400).json({ message: error.details[0].message });
    }
    if (req.query.users === 'true') {
      const allBooks = await Books.find().populate('authorId');
      res.status(200).json(allBooks);
    } else if (req.query.authorId) {
      const book = await Books.find({ authorId: req.query.authorId });
      if (!book) {
        res.status(404).json({ message: 'Книги этого автора не найдены' });
      } else {
        res.status(200).json(book);
      }
    } else {
      const allBooks2 = await Books.find();
      res.status(200).json(allBooks2);
    }
  });

/**
 * @swagger
 * /books/{id}:
 *          get:
 *              summary: Return book by id
 *              tags: [Books]
 *              parameters:
 *                 - in: path
 *                   name: id
 *                   schema:
 *                     type: string
 *                     required: true
 *                     description: The book id
 *              responses:
 *                      200:
 *                          desciption: Book found
 *                          content:
 *                              application/json:
 *                                  schema:
 *                                      $ref: '#/components/schemas/Book'
 *                      401:
 *                          description: User is not authorized
 *                      404:
 *                          description: The book is not found
 */

router
  .get('/:id', async (req: Request, res: Response) => {
    const oneBook = await Books.findOne({ _id: req.params.id });
    if (oneBook) {
      res.status(200).json(oneBook);
    } else {
      res.status(404).json({ message: 'Книга не найдена' });
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
  .post('/', async (req: Request<any, any, IBookPost> , res: Response) => {
    const { error } = bookPostValidation(req.body);
    if (error) {
      return res.status(400).json({ message: error.details[0].message });
    }
    const user = await users.findOne({ _id: req.body.authorId });
    if (user) {
      const book = new Books({
        title: req.body.title,
        authorId: req.body.authorId,
        rating: randomNumber2(0, 100),
      });
      await book.save();
      const avarageRating = await Books.aggregate([
        { $group: { _id: '$authorId', avg: { $avg: '$rating' } } },
      ]);
      user.avarageRating = avarageRating[0].avg;
      await user.save();
      return res.status(201).json({ message: 'Книга создана' });
    }
    return res.status(404).json({ message: 'Такого автора не существует' });
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
  .get('/:id/comments', async (req: Request, res: Response) => {
    const comment = await Books.findById(req.params.id);
    if (comment) {
      return res.status(200).json(comment.comment);
    }
    return res.status(404).json({ message: 'Книга не найдена' });
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
  .post('/:id/comments', async (req: Request, res: Response) => {
    const book = await Books.findById(req.params.id);
    if (book) {
      const comment = {
        text: req.body.text,
        date: new Date(),
        commentator: req.user.id,
      };
      book.comment.push(comment);
      await book.save();
      return res.status(201).json(book.comment);
    }
    return res.status(404).json({ message: 'Книга не найдена' });
  });

export default router;
