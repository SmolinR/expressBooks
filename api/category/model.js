const mongoose = require('mongoose');
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

const schema = mongoose.Schema({
  title: String,
  icon: String,
});

module.exports = mongoose.model('categories', schema);
