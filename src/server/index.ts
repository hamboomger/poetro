import express from 'express';
import dotenv from 'dotenv-flow';
import apiRouter from './routes/api/index';
import { customErrorsHandler, logErrors } from './lib/errors';
import connectToDatabase from './lib/connectToDatabase';

const SERVER_PORT = Number(process.env.PORT || 8080);

dotenv.config();
connectToDatabase().catch((err) => {
  console.log('Error connecting to database: ', err);
});

const app = express();

app.use(express.json());

app.use(apiRouter);
app.use(logErrors);
app.use(customErrorsHandler);

app.listen(SERVER_PORT, (err) => {
  if (err) {
    console.log(err);
  }
});

export default app;
