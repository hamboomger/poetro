import mongoose from 'mongoose';

async function connectMongoose() {
  const databaseURI = process.env.MONGODB_URI;
  if (databaseURI === undefined) {
    throw Error('MONGODB_URI environment variable is not provided');
  }

  await mongoose.connect(databaseURI, { useNewUrlParser: true });
}

export default connectMongoose;
