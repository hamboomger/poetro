import { Service } from 'typedi';
import User, { CreateUser, IUserDocument, UserModel } from '../../models/user';
import { mDoc } from '../../lib/util/mongo';

@Service()
export class UserRepository {
  async findById(uid: string): Promise<UserModel | null> {
    return User.findById(uid);
  }

  async findByEmail(email: string): Promise<UserModel | null> {
    return User.findOne({ email });
  }

  async findByGoogleId(googleId: string): Promise<IUserDocument | null> {
    return User.findOne({ googleId });
  }

  async createUser(user: CreateUser): Promise<UserModel> {
    const result = await new User(user).save();
    return mDoc.toPojo<UserModel>(result);
  }
}
