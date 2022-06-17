import authTest from './testFunc/auth';
import bookTest from './testFunc/book';
import userTest from './testFunc/user';
import adminTest from './testFunc/admin';
import categoryTest from './testFunc/category';
import app from '../app';
import dropCollections from './util/db-clearing';
import connectDB from './util/db-connection';
import disconnectDB from './util/db-disconnection';
import makeUser from './util/test-user';
import makeAdmin from './util/test-admin';
import { IPeople } from './interfaces/people.interfaces';

const people = {} as IPeople;

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
