import mongoose, { Schema } from 'mongoose';
/**
 * @swagger
 * components:
 *   schemas:
 *     User:
 *       type: object
 *       required:
 *         - login
 *         - password
 *       properties:
 *         id:
 *           type: integer
 *           description: The auto-generated id of the book.
 *         login:
 *           type: string
 *           description: The name of user.
 *         password:
 *           type: string
 *           description: User`s password.
 *         token:
 *           type: string
 *           description: User`s authorization token
 *         avarageRating:
 *           type: number
 *           description: The avarage rating of user`s books.
 *         isAdmin:
 *           type: boolean
 *           description: Does user have admin permissions, default is false
 *       example:
 *          login: Ruslan
 *          password: 123
 *          token: z4ld41tppo
 *          avarageRating: 56
 *          isAdmin: false
 */
export interface IUser {
  id: string,
  login: string,
  password: string,
  token: string | null,
  avarageRating: number,
  isAdmin: boolean,
}
const schema = new Schema<IUser>({
  login: String,
  password: String,
  token: String,
  avarageRating: Number,
  isAdmin: { type: Boolean, default: false },
});
export default mongoose.model('users', schema);
