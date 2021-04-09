import _ from 'lodash';
import { Router, Request, Response } from 'express';
import { body, checkSchema, validationResult } from 'express-validator';
import { Container } from 'typedi';
import UserLoginValidationSchema from './validation/userAuthValidationSchema';
import BadRequestError from '../../lib/errors/BadRequestError';
import User, { IUser } from '../../models/user';
import hashPassword from '../../lib/util/hashPassword';
import verifyPassword from '../../lib/util/verifyPassword';
import UnauthorizedRequestError from '../../lib/errors/UnauthorizedRequestError';
import { createJwtToken } from '../../lib/jwtAuthentication';
import { requestsLogger } from '../../lib/loggers';
import initializeNewUserData from '../../lib/initializeNewUserData';
import { AuthService } from '../../services/AuthService';

const route = Router();
const authService = Container.get(AuthService);
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
    const { jwtToken } = await authService.login(email, password);
    res.status(200);
    res.json({
      authentication: jwtToken,
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

    const { name, email, password } = req.body;
    const savedUser = await authService.register(name, email, password);
    res.status(200);
    res.json(_.omit(savedUser.toObject(), 'passwordHash'));
  },
);

// eslint-disable-next-line import/prefer-default-export
export { route as authRoute };
