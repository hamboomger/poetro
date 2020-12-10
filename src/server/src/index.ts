/* eslint-disable import/newline-after-import,import/first */
import express from 'express';
require('express-async-errors');

import httpContext from 'express-http-context';
import dotenv from 'dotenv-flow';
import bodyParser from 'body-parser';
import passport from 'passport';
import { apiRoutes, authRoute } from './routes/api';
import { customRequestErrorsHandler, invalidObjectIdErrorHandler, logUnhandledErrors } from './lib/errorHandlers';
import connectToDatabase from './lib/connectToDatabase';
import { initPassportSerializationFunctions } from './passportConfig';
import authenticateToken from './middleware/authenticateToken';
import authenticateTestUser from './middleware/authenticateTestUser';

dotenv.config();
initPassportSerializationFunctions();

connectToDatabase().catch((err) => {
  console.log('Error connecting to database: ', err);
});

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(passport.initialize());
app.use(httpContext.middleware);

app.use(authRoute);

app.use(authenticateToken);
app.use(authenticateTestUser);

app.use(apiRoutes);
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
