import { RequestHandler } from 'express';
import { Container } from 'typedi';
import { getTokenPayload } from '../lib/jwtAuthentication';
import UnauthorizedRequestError from '../lib/errors/UnauthorizedRequestError';
import { logger } from '../lib/loggers';
import { setCurrentUser } from '../lib/util/currentUser';
import { UserService } from '../services/user/UserService';

const JWT_PARAMETER_NAME = 'authorization';

const userService = Container.get(UserService);
const auth: RequestHandler = async (req, res, next) => {
  const token = req.headers[JWT_PARAMETER_NAME] || req.cookies[JWT_PARAMETER_NAME];
  if (!token) {
    throw new UnauthorizedRequestError('No authorization token in the header or cookies');
  }

  const payload = getTokenPayload(token);
  if (!payload) {
    res.sendStatus(403);
    return;
  }

  const user = await userService.getUserById(payload.userId);
  if (user === null) {
    logger.error('Failed to fetch user: invalid user id in payload: ', payload.userId);
    res.sendStatus(403);
    return;
  }

  setCurrentUser(user, req);
  next();
};

export default auth;
