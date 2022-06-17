import mongoose, { AnyArray, Document, Schema } from 'mongoose';
import { IUser } from '../user/model';

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
interface IComment {
  text: string
  date: Date
  commentator: string
}
interface IBook {
  title: string,
  authorId: mongoose.Schema.Types.ObjectId |  IUser,
  rating: number,
  comment: Array<IComment>
  icon?: string,
}
const schema = new Schema<IBook>({
  title: String,
  authorId: { type: mongoose.Schema.Types.ObjectId, ref: 'users' },
  rating: Number,
  comment: { type: mongoose.Schema.Types.Array, default: [] },
  icon: String,
});

export default mongoose.model('books', schema);
