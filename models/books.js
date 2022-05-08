const mongoose = require('mongoose');

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

const schema = mongoose.Schema({
    title: String,
    authorId: { type: mongoose.Schema.Types.ObjectId, ref: 'users' },
    rating: Number,
    comment: { type: Array, default: [] },
});

module.exports = mongoose.model('books', schema);
