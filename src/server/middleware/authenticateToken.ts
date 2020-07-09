import { RequestHandler } from 'express';
import jwt from 'jsonwebtoken';

const JWT_PARAMETER_NAME = 'authorization';

const authenticateToken: RequestHandler = (req, res, next) => {
  if (process.env.NODE_ENV === 'test') {
    const { testUser } = req.params;
    if (testUser) {
      req.user = testUser;
    }
    next();
    return;
  }

  const token = req.headers[JWT_PARAMETER_NAME];
  if (!token) {
    res.sendStatus(401);
    return;
  }

  jwt.verify(token, process.env.WEB_TOKEN_SECRET, ((err, user) => {
    if (err) {
      console.log(err);
      res.sendStatus(403);
    } else {
      req.user = user;
      next();
    }
  }));
};

export default authenticateToken;
