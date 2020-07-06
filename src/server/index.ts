/* eslint-disable import/newline-after-import,import/first */
import express from 'express';
require('express-async-errors');

import dotenv from 'dotenv-flow';
import bodyParser from 'body-parser';
import passport from 'passport';
import apiRouter from './routes/api/index';
import { customRequestErrorsHandler, invalidObjectIdErrorHandler, logUnhandledErrors } from './lib/errorHandlers';
import connectToDatabase from './lib/connectToDatabase';
import { initPassportSerializationFunctions, localStrategy } from './passportConfig';

dotenv.config();
passport.use(localStrategy);
initPassportSerializationFunctions();

connectToDatabase().catch((err) => {
  console.log('Error connecting to database: ', err);
});

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(passport.initialize());

app.use(apiRouter);
app.use(invalidObjectIdErrorHandler);
app.use(customRequestErrorsHandler);
app.use(logUnhandledErrors);

const SERVER_PORT = Number(process.env.SERVER_PORT || 3000);
const server = app.listen(SERVER_PORT, () => {
  console.log(`Server started on port ${SERVER_PORT}`);
}).on('error', (err) => {
  console.log('Error occurred while starting the server: ', err);
});

export default server;
