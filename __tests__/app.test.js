const authTest = require('./testFunc/auth');
const bookTest = require('./testFunc/book');
const userTest = require('./testFunc/user');
const adminTest = require('./testFunc/admin');
const categoryTest = require('./testFunc/category');
const app = require('../app');
const dropCollections = require('./util/db-clearing');
const connectDB = require('./util/db-connection');
const disconnectDB = require('./util/db-disconnection');
const makeUser = require('./util/test-user');
const makeAdmin = require('./util/test-admin');

const people = {};

describe('Main test', () => {
  beforeAll(async () => {
    await connectDB();
    await dropCollections();
    people.user = await makeUser();
    people.admin = await makeAdmin();
    console.log('Mongo connected');
  });
  afterAll(async () => {
    await dropCollections();
    await disconnectDB();
    console.log('Mongoose disconnected');
  });
  describe('book test', bookTest(app, people));
  describe('user test', userTest(app, people));
  describe('admin test', adminTest(app, people));
  describe('category test', categoryTest(app, people));
  describe('auth test', authTest(app, people));
});
