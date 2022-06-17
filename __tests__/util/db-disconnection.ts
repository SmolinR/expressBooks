import mongoose from 'mongoose';

async function disconnectionFunc() {
  await mongoose.connection.close();
};
export default disconnectionFunc;
