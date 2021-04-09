import mongoose from 'mongoose';

function hidePassword(connectionString: string): string {
  return connectionString.replace(/\/\/([^:]+):(.*)@/, '//$1:***@');
}

export async function connectToMongoDb() {
  const databaseURI = process.env.MONGODB_URI;
  if (databaseURI === undefined) {
    throw Error('MONGODB_URI environment variable is not provided');
  }

  console.log(`Connecting to the mongo db using URI: "${hidePassword(databaseURI)}"...`);
  await mongoose.connect(databaseURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    // Make Mongoose use `findOneAndRemove() without deprecation warnings`
    useFindAndModify: false,
  });
  console.log('Database connection succeeded');
}
