import express from 'express';
import dotenv from 'dotenv-flow';
import apiRouter from './routes/api/index';
import { customErrorsHandler, logErrors } from './lib/errors';
import connectToDatabase from './lib/connectToDatabase';

dotenv.config();

connectToDatabase().catch((err) => {
  console.log('Error connecting to database: ', err);
});

const app = express();

app.use(express.json());

app.use(apiRouter);
app.use(logErrors);
app.use(customErrorsHandler);

const SERVER_PORT = Number(process.env.SERVER_PORT || 8080);
app.listen(SERVER_PORT, (err) => {
  if (err) {
    console.log(err);
  } else {
    console.log(`Server started on port ${SERVER_PORT}`)
  }
});

export default app;
