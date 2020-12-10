import { RequestHandler } from 'express';
import httpContext from 'express-http-context';
import { getTokenPayload } from '../lib/jwtAuthentication';
import User from '../model/user';
import UnauthorizedRequestError from '../lib/errors/UnauthorizedRequestError';

const JWT_PARAMETER_NAME = 'authorization';

const authenticateToken: RequestHandler = (req, res, next) => {
  // pass authentication process to the next authenticateTestUser middleware
  if (process.env.NODE_ENV === 'test') {
    next();
    return;
  }

  const token = req.headers[JWT_PARAMETER_NAME];
  if (!token) {
    throw new UnauthorizedRequestError('No jwt token in the header');
  }

  const payload = getTokenPayload(token);
  if (!payload) {
    res.sendStatus(403);
    return;
  }
  User.findById(payload.userId, (err, user) => {
    if (err) {
      console.log(err);
      res.sendStatus(403);
      return;
    }
    if (user === null) {
      console.log('Failed to fetch user: invalid user id in payload: ', payload.userId);
      res.sendStatus(401);
      return;
    }

    httpContext.set('user', user.toObject());
    next();
  });
};

export default authenticateToken;
