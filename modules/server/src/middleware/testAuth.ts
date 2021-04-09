import { RequestHandler } from 'express';
import User from '../models/user';
import { setCurrentUser } from '../lib/util/currentUser';

const testAuth: RequestHandler = async (req, res, next) => {
  if (process.env.NODE_ENV === 'test') {
    const testUserId = req.header('testUserId');
    if (!testUserId) {
      throw new Error('You should supply testUserId in the request headers in order to pass authentication step');
    }

    const testUser = await User.findById(testUserId);
    if (!testUser) {
      throw new Error(`No user found by id: ${testUserId}`);
    }
    setCurrentUser(testUser, req);
  }
  next();
};

export default testAuth;
