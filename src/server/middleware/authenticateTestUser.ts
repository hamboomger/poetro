import { RequestHandler } from 'express';
import User from '../model/user';
import { setCurrentUser } from '../lib/currentUser';

const authenticateTestUser: RequestHandler = async (req, res, next) => {
  if (process.env.NODE_ENV === 'test' && req.header('testUserId')) {
    const testUserId = req.header('testUserId');
    const user = (await User.findById(testUserId)).toObject();
    setCurrentUser(user);
  }
  next();
};

export default authenticateTestUser;
