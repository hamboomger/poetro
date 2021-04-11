import _ from 'lodash';
import { Router, Request, Response } from 'express';
import { body, checkSchema, validationResult } from 'express-validator';
import { Container } from 'typedi';
import passport from 'passport';
import UserLoginValidationSchema from './validation/userAuthValidationSchema';
import BadRequestError from '../../lib/errors/BadRequestError';
import { AuthService } from '../../services/AuthService';
import { createJwtToken } from '../../lib/jwtAuthentication';
import { JWT_PARAMETER_NAME } from '../../middleware/auth';

function createJWTTokenForSerializedUser(req: Request): string {
  if (req.user === undefined || req.user.id === undefined) {
    throw new Error('Failed to login via google');
  }
  return createJwtToken({ userId: req.user.id });
}

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
    const jwtToken = await authService.loginLocal(email, password);
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
    const savedUser = await authService.registerLocal(name, email, password);
    res.status(200);
    res.json(_.omit(savedUser, 'passwordHash'));
  },
);

route.get(
  '/api/google',
  passport.authenticate('google', {
    scope: [
      'https://www.googleapis.com/auth/userinfo.profile',
      'https://www.googleapis.com/auth/userinfo.email',
    ],
  }),
);

route.get(
  '/api/google-callback',
  passport.authenticate('google', { failureRedirect: '/login' }),
  (req, res) => {
    const jwtToken = createJWTTokenForSerializedUser(req);
    res.cookie(JWT_PARAMETER_NAME, jwtToken);
    res.redirect('/');
  },
);
export { route as authRoute };
