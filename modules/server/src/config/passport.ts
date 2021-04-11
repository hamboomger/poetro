import passport from 'passport';
import { OAuth2Strategy as GoogleStrategy } from 'passport-google-oauth';
import { Container } from 'typedi';
import { AuthService } from '../services/AuthService';
import { UserService } from '../services/user/UserService';
import config from './config';
import { logger } from '../lib/loggers';
import User, { IUserDocument } from '../models/user';

export function initPassportSerializationFunctions() {
  passport.serializeUser<IUserDocument, string>((user, done) => {
    done(null, user.id);
  });
  passport.deserializeUser<IUserDocument, string>((id, done) => {
    User.findById(id, (err, res) => {
      done(err, res || undefined);
    });
  });
}

function initPassportJsStrategies() {
  const hostUrl = config.env.hostUrl();
  const callbackUrl = `${hostUrl}/api/google-callback`;
  logger.info(`Initializing Google auth with following callback: ${callbackUrl}`);
  passport.use(new GoogleStrategy({
    clientID: config.google.clientId() ?? '',
    clientSecret: config.google.clientSecret() ?? '',
    callbackURL: callbackUrl,
  }, async (accessToken, refreshToken, profile, done) => {
    const authService = Container.get(AuthService);
    const usersService = Container.get(UserService);

    const existingUser = await usersService.getUserByGoogleId(profile.id);
    if (existingUser === null) {
      if (profile.emails === undefined || profile.emails.length === 0) {
        done(new Error('Unable to get user email connected with Google account'));
      }
      const email = profile.emails![0].value;
      const createdUser = await authService.registerViaGoogle(profile.displayName, email, profile.id);
      done(null, createdUser);
    } else {
      done(null, existingUser);
    }
  }));
}

export function initPassportJs() {
  initPassportSerializationFunctions();
  initPassportJsStrategies();
}
