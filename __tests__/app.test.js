const authTest = require('./testFunc/auth');
const bookTest = require('./testFunc/book');
const userTest = require('./testFunc/user');
const adminTest = require('./testFunc/admin');
const categoryTest = require('./testFunc/category');
const app = require('../app');
const dropCollections = require('./util/db-clearing');
const connectDB = require('./util/db-connection');
const disconnectDB = require('./util/db-disconnection');

jest.setTimeout(60000);

describe('Main test', () => {
    beforeAll(async () => {
        await connectDB();
        await dropCollections();
        console.log('Mongo connected');
    });
    afterAll(async () => {
        await dropCollections();
        await disconnectDB();
        console.log('Mongoose disconnected');
    });
    describe('auth test', authTest(app));
    describe('book test', bookTest(app));
    describe('user test', userTest(app));
    describe('admin test', adminTest(app));
    describe('category test', categoryTest(app));
});
