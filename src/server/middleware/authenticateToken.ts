import { RequestHandler, Request } from 'express';
import httpContext from 'express-http-context';
import { getTokenPayload } from '../lib/jwtAuthentication';
import User from '../model/user';
import { getCurrentUser } from '../lib/currentUser';

const JWT_PARAMETER_NAME = 'authorization';

const authenticateToken: RequestHandler = (req, res, next) => {
  // if user object is already set, then authorization already happened (used for testing purposes)
  if (getCurrentUser()) {
    next();
    return;
  }

  const token = req.headers[JWT_PARAMETER_NAME];
  if (!token) {
    res.sendStatus(401);
    return;
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

    httpContext.set('user', user.toObject());
    next();
  });
};

export default authenticateToken;