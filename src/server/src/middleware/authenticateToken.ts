import { RequestHandler } from 'express';
import httpContext from 'express-http-context';
import { getTokenPayload } from '../lib/jwtAuthentication';
import User from '../model/user';
import UnauthorizedRequestError from '../lib/errors/UnauthorizedRequestError';
import { logger } from '../lib/loggers';
import {setCurrentUser} from '../lib/currentUser';

const JWT_PARAMETER_NAME = 'authorization';

const authenticateToken: RequestHandler = (req, res, next) => {
  // pass authentication process to the next authenticateTestUser middleware
  if (process.env.NODE_ENV === 'test') {
    next();
    return;
  }

  const token = req.headers[JWT_PARAMETER_NAME] || req.cookies[JWT_PARAMETER_NAME];
  if (!token) {
    throw new UnauthorizedRequestError('No authorization token in the header or cookies');
  }

  const payload = getTokenPayload(token);
  if (!payload) {
    res.sendStatus(403);
    return;
  }
  User.findById(payload.userId, (err, user) => {
    if (err) {
      logger.error(err);
      res.sendStatus(403);
      return;
    }
    if (user === null) {
      logger.error('Failed to fetch user: invalid user id in payload: ', payload.userId);
      res.sendStatus(401);
      return;
    }

    setCurrentUser(user);
    next();
  });
};

export default authenticateToken;
