import User, { UserModel, IUserDocument } from '../../src/models/user';
import hashPassword from '../../src/lib/util/hashPassword';
import mongooseUtils from '../util/mongooseUtils';

async function createAndSaveTestUser(
  variation = 1,
): Promise<{ user: IUserDocument, password: string }> {
  const password = `testPassword123${variation}`;
  const user: UserModel = {
    id: mongooseUtils.generateId(),
    email: `testEmail${variation}`,
    name: `testName${variation}`,
    passwordHash: hashPassword(password),
  };
  const savedUser = await new User(user).save();
  return { user: savedUser, password };
}

export default createAndSaveTestUser;
