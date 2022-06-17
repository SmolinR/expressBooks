import mongoose, { Schema } from 'mongoose';
/**
 * @swagger
 * components:
 *   schemas:
 *     Categories:
 *       type: object
 *       required:
 *         - title
 *         - icon
 *       properties:
 *         id:
 *          type: string
 *          description: Id of category.
 *         title:
 *           type: string
 *           description: Title of category.
 *         icon:
 *           type: string
 *           description: Icon of category
 *       example:
 *          id: 626d45403f06a5f6fe50ce21
 *          title: Comedy
 *          icon: URL of icon
 */
export interface ICategory {
  title: string
  icon: string
}
const schema = new Schema<ICategory>({
  title: String,
  icon: String,
});
export default mongoose.model('categories', schema);
