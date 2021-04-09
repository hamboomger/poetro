import express from 'express';
import 'reflect-metadata';
import 'express-async-errors';
import dotenv from 'dotenv-flow';
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import passport from 'passport';
import { apiRoutes, authRoute } from './routes/api';
import logRequestMiddleware from './middleware/logRequests';
import auth from './middleware/auth';
import testAuth from './middleware/testAuth';
import { initPassportSerializationFunctions } from './config/passport';
import { connectToMongoDb } from './config/database';
import { customRequestErrorsHandler, invalidObjectIdErrorHandler, logUnhandledErrors } from './middleware/handleErrors';
import config from './config/config';

dotenv.config();
initPassportSerializationFunctions();
connectToMongoDb().catch((err) => {
  console.log('Error connecting to the database: ', err);
  process.exit();
});

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(passport.initialize());

app.use(logRequestMiddleware);
app.use(authRoute);

app.use(config.env.isTest() ? testAuth : auth);

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
