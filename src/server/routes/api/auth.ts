import _ from 'lodash';
import { Router, Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import { body, checkSchema, validationResult } from 'express-validator';
import UserLoginValidationSchema from './validation/userAuthValidationSchema';
import BadRequestError from '../../lib/errors/BadRequestError';
import User, { IUser } from '../../model/user';
import hashPassword from '../../util/hashPassword';
import verifyPassword from '../../util/verifyPassword';
import UnauthorizedRequestError from '../../lib/errors/UnauthorizedRequestError';


const route = Router();
route.post(
  '/api/login-local', [
    body('email', 'email field is missing')
      .isEmail().withMessage('invalid email address'),
    body('password', 'password field is missing'),
  ],
  async (req: Request, res: Response) => {
    console.log(JSON.stringify(req.body));

    const result = validationResult(req);
    if (!result.isEmpty()) {
      throw BadRequestError.from(result);
    }

    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user || !verifyPassword(password, user.passwordHash)) {
      throw new UnauthorizedRequestError('Invalid login or password');
    }

    const webTokenString = jwt.sign(user.toObject(), process.env.WEB_TOKEN_SECRET);
    res.status(200);
    res.json({
      jwt: webTokenString,
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
    const existingUser = await User.findOne({ name: email });
    if (existingUser) {
      throw new BadRequestError('User with such name already exists');
    }

    const passwordHash = hashPassword(password);
    const user: IUser = {
      name: email,
      email,
      passwordHash,
    };
    const savedUser = await new User(user).save();
    res.status(200);
    res.json(_.omit(savedUser.toObject(), 'passwordHash'));
  },
);

export default route;
