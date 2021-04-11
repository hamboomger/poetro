import { Service } from 'typedi';
import _ from 'lodash';
import User, { UserModel } from '../models/user';
import verifyPassword from '../lib/util/verifyPassword';
import { requestsLogger } from '../lib/loggers';
import UnauthorizedRequestError from '../lib/errors/UnauthorizedRequestError';
import { createJwtToken } from '../lib/jwtAuthentication';
import BadRequestError from '../lib/errors/BadRequestError';
import hashPassword from '../lib/util/hashPassword';
import { UserService } from './user/UserService';

@Service()
export class AuthService {
  private userService: UserService;

  constructor(userService: UserService) {
    this.userService = userService;
  }

  /**
   * @returns JWT token
   */
  async loginLocal(nameOrEmail: string, password: string): Promise<string> {
    const user = await User.findOne({ $or: [{ email: nameOrEmail }, { name: nameOrEmail }] });
    if (!user || !user.passwordHash || !verifyPassword(password, user.passwordHash)) {
      requestsLogger.logAuthenticationSuccess(nameOrEmail, false);
      throw new UnauthorizedRequestError('Invalid login or password');
    }

    requestsLogger.logAuthenticationSuccess(nameOrEmail, true);
    return createJwtToken({ userId: user._id });
  }

  async registerLocal(name: string, email: string, password: string): Promise<UserModel> {
    const authMethod = 'local';
    requestsLogger.logRegistrationTry(name, email, authMethod);
    const existingUser = await User.findOne({ $or: [{ name }, { email }] });
    if (existingUser) {
      requestsLogger.logRegistrationResult(name, email, authMethod, false);
      throw new BadRequestError('User already exists');
    }

    const passwordHash = hashPassword(password);
    const user = await this.userService.createUser({ name, email, passwordHash });
    requestsLogger.logRegistrationResult(name, email, authMethod, true);
    return _.omit(user, 'passwordHash');
  }

  async registerViaGoogle(name: string, email: string, googleId: string): Promise<UserModel> {
    const authMethod = 'google';
    requestsLogger.logRegistrationTry(name, email, authMethod);
    const existingUser = await this.userService.getUserByGoogleId(googleId);
    if (existingUser) {
      requestsLogger.logRegistrationResult(name, email, authMethod, false);
      throw new BadRequestError('User already exists');
    }

    const user = await this.userService.createUser({ name, email, googleId });
    requestsLogger.logRegistrationResult(name, email, authMethod, true);
    return user;
  }
}
