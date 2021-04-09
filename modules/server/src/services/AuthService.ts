import { Service } from 'typedi';
import User, { UserModel, IUserDocument, CreateUser } from '../models/user';
import verifyPassword from '../lib/util/verifyPassword';
import { requestsLogger } from '../lib/loggers';
import UnauthorizedRequestError from '../lib/errors/UnauthorizedRequestError';
import { createJwtToken } from '../lib/jwtAuthentication';
import BadRequestError from '../lib/errors/BadRequestError';
import hashPassword from '../lib/util/hashPassword';
import initializeNewUserData from '../lib/initializeNewUserData';

@Service()
export class AuthService {
  async login(nameOrEmail: string, password: string): Promise<{jwtToken: string}> {
    const user = await User.findOne({ $or: [{ email: nameOrEmail }, { name: nameOrEmail }] });
    if (!user || !user.passwordHash || !verifyPassword(password, user.passwordHash)) {
      requestsLogger.logAuthenticationSuccess(nameOrEmail, false);
      throw new UnauthorizedRequestError('Invalid login or password');
    }

    requestsLogger.logAuthenticationSuccess(nameOrEmail, true);
    return {
      jwtToken: createJwtToken({ userId: user._id }),
    };
  }

  async register(name: string, email: string, password: string): Promise<IUserDocument> {
    requestsLogger.logRegistrationTry(name, email);
    const existingUser = await User.findOne({ $or: [{ name }, { email }] });
    if (existingUser) {
      requestsLogger.logRegistrationSuccess(name, email, false);
      throw new BadRequestError('User already exists');
    }

    const passwordHash = hashPassword(password);
    const user: CreateUser = { name, email, passwordHash };
    const savedUser = await new User(user).save();
    await initializeNewUserData(savedUser);
    requestsLogger.logRegistrationSuccess(name, email, true);
    return savedUser;
  }
}
