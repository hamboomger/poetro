import mongoose from 'mongoose';
import server from '../index';

before(async () => {
  if (process.env.NODE_ENV !== 'test') {
    throw Error('Test should be running only in test environment, aborted.');
  }
});

after(async () => {
  await mongoose.disconnect();
  console.log('Disconnected from mongodb test database');
  await server.close();
  console.log('Express http server got closed');
});
