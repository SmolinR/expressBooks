import mongoose from 'mongoose';
import { MONGO_TEST_URL } from '../../constants';

async function connectionFunc() {
  await mongoose.connect(MONGO_TEST_URL);
}
export default connectionFunc;
