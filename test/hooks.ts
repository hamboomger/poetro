import dotenv from 'dotenv-flow';
import mongoose from 'mongoose';
import connectMongoose from '../src/server/lib/connectToDatabase';

before(async () => {
  dotenv.config();
  if (process.env.NODE_ENV !== 'test') {
    throw Error('Test should be running only in test environment, aborted.');
  }
  await connectMongoose();
});

after(async () => {
  console.log('tear down');
  await mongoose.disconnect();
});
