import _ from 'lodash';
import { Router, Request, Response } from 'express';
import { body, checkSchema, validationResult } from 'express-validator';
import UserLoginValidationSchema from './validation/userAuthValidationSchema';
import BadRequestError from '../../lib/errors/BadRequestError';
import User, { IUser } from '../../model/user';
import hashPassword from '../../util/hashPassword';
import verifyPassword from '../../util/verifyPassword';
import UnauthorizedRequestError from '../../lib/errors/UnauthorizedRequestError';
import { createJwtToken } from '../../lib/jwtAuthentication';
import { requestsLogger } from '../../lib/loggers';
import initializeNewUserData from '../../lib/initializeNewUserData';

const route = Router();
route.post(
  '/api/login-local', [
    body('email', 'email field is missing')
      .isEmail().withMessage('invalid email address'),
    body('password', 'password field is missing'),
  ],
  async (req: Request, res: Response) => {
    const result = validationResult(req);
    if (!result.isEmpty()) {
      throw BadRequestError.from(result);
    }

    const { email, password } = req.body;
    requestsLogger.logAuthenticationTry(email);

    const user = await User.findOne({ email });
    if (!user || !verifyPassword(password, user.passwordHash)) {
      requestsLogger.logAuthenticationSuccess(email, false);
      throw new UnauthorizedRequestError('Invalid login or password');
    }

    requestsLogger.logAuthenticationSuccess(email, true);
    const webTokenString = createJwtToken({ userId: user._id });
    res.status(200);
    res.json({
      authentication: webTokenString,
    });
  },
);

route.post(
  '/api/register-local',
  checkSchema(UserLoginValidationSchema),
  async (req: Request, res: Response) => {
    const result = validationResult(req);
    if (!result.isEmpty()) {
      throw BadRequestError.from(result);
    }

    const { email, password } = req.body;
    requestsLogger.logRegistrationTry(email);
    const existingUser = await User.findOne({ name: email });
    if (existingUser) {
      requestsLogger.logRegistrationSuccess(email, false);
      throw new BadRequestError('User with such name already exists');
    }

    const passwordHash = hashPassword(password);
    const user: IUser = {
      name: email,
      email,
      passwordHash,
    };
    const savedUser = await new User(user).save();
    await initializeNewUserData(savedUser);
    requestsLogger.logRegistrationSuccess(email, true);
    res.status(200);
    res.json(_.omit(savedUser.toObject(), 'passwordHash'));
  },
);

// eslint-disable-next-line import/prefer-default-export
export { route as authRoute };
