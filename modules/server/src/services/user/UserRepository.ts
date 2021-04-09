import { Service } from 'typedi';
import User, { IUser, IUserDocument } from '../../models/user';

@Service()
export class UserRepository {
  async findById(uid: string): Promise<IUser | null> {
    return User.findById(uid);
  }

  async findByEmail(email: string): Promise<IUser | null> {
    return User.findOne({ email });
  }

  async findByGoogleId(googleId: string): Promise<IUserDocument | null> {
    return User.findOne({ googleId });
  }
}
