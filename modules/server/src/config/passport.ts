import passport from 'passport';
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
