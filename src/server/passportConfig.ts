import passport from 'passport';
import { Strategy as LocalStrategy } from 'passport-local';
import User, { IUserDocument } from './model/user';
import verifyPassword from './util/verifyPassword';

export function initPassportSerializationFunctions() {
  passport.serializeUser<IUserDocument, string>((user, done) => {
    done(null, user._id);
  });
  passport.deserializeUser<IUserDocument, string>((id, done) => {
    User.findById(id, (err, res) => {
      done(err, res);
    });
  });
}

// eslint-disable-next-line import/prefer-default-export
export const localStrategy = new LocalStrategy(
  {
    usernameField: 'email',
  },
  (email, password, done) => {
    const incorrectLoginOrPasswordMsg = 'Incorrect login or password';
    User.findOne({ email }, (err, user) => {
      if (err) return done(err);

      if (!user || !verifyPassword(password, user.passwordHash)) {
        return done(null, false, { message: incorrectLoginOrPasswordMsg });
      }

      return done(null, user.toObject());
    });
  },
);
