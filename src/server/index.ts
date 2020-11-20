/* eslint-disable import/newline-after-import,import/first */
import express from 'express';
require('express-async-errors');

import dotenv from 'dotenv-flow';
import apiRouter from './routes/api/index';
import { customRequestErrorsHandler, invalidObjectIdErrorHandler, logUnhandledErrors } from './lib/errorHandlers';
import connectToDatabase from './lib/connectToDatabase';

dotenv.config();

connectToDatabase().catch((err) => {
  console.log('Error connecting to database: ', err);
});

const app = express();

app.use(express.json());

app.use(apiRouter);
app.use(invalidObjectIdErrorHandler);
app.use(customRequestErrorsHandler);
app.use(logUnhandledErrors);

const SERVER_PORT = Number(process.env.SERVER_PORT || 3000);
const server = app.listen(SERVER_PORT, (err) => {
  console.log(err || `Server started on port ${SERVER_PORT}`);
});

export default server;
