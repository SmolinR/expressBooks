import mongoose from 'mongoose';
import { MONGO_URL } from './constants';

const connect = function dbconnect() {
  return mongoose
    .connect(MONGO_URL)
    .then(() => {
      console.log('Mongoose connected');
    });
};
export default connect;
