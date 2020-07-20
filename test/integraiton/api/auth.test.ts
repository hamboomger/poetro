import chai, { expect } from 'chai';
import chaiHttp from 'chai-http';
import app from '../../../src/server';
import User, { IUser } from '../../../src/server/model/user';
import hashPassword from '../../../src/server/util/hashPassword';
import request from '../../util/request';

chai.use(chaiHttp);

describe('Auth', () => {
  describe('POST /api/register-local', () => {
    const user = {
      name: 'test name',
      email: 'testEmail',
      password: 'password',
    };
    afterEach(async () => {
      await User.deleteMany({});
    });
    it('should register user', async () => {
      const response = await request.post('/api/register-local')
        .type('form')
        .send(user);
      expect(response).to.have.status(200);
      expect(response.body).to.be.an('object');
      expect(response.body).to.have.keys(['_id', 'name', 'email']);
    });
    it('should fail because of fields missing', async () => {
      const response = await chai.request(app)
        .post('/api/register-local')
        .type('form')
        .send({});
      expect(response).to.have.status(400);
      expect(response.body).to.be.an('object');
      expect(response.body).to.be.eql({
        error: 'Bad Request',
        errors: [
          'email field is missing',
          'email field should be a string',
          'password field is missing',
          'password field should be a string',
        ],
        message: 'Multiple validation errors',
        success: false,
      });
    });
  });
  describe('POST /api/login-local', async () => {
    const password = 'testtest';
    const user: IUser = {
      name: 'test name',
      email: 'testEmail@mail.com',
      passwordHash: hashPassword(password),
    };
    beforeEach(async () => {
      await new User(user).save();
    });
    afterEach(async () => {
      await User.deleteMany({});
    });
    it('should authorize user successfully', async () => {
      const authorizationFields = {
        email: user.email,
        password,
      };

      const response = await chai.request(app)
        .post('/api/login-local')
        .type('json')
        .send(authorizationFields);

      expect(response).to.have.status(200);
      expect(response.body).to.have.key('authentication');
    });
    it('should fail because of a valid, but not related to any registered user email address', async () => {
      const authorizationFields = {
        email: 'notRegisteredEmail@mail.com',
        password,
      };

      const response = await chai.request(app)
        .post('/api/login-local')
        .type('json')
        .send(authorizationFields);

      expect(response).to.have.status(401);
      expect(response.body).to.be.eql({
        success: false,
        error: 'Unauthorized',
        message: 'Invalid login or password',
      });
    });
    it('should fail because of a wrong password', async () => {
      const authorizationFields = {
        email: user.email,
        password: 'Wrong password',
      };

      const response = await chai.request(app)
        .post('/api/login-local')
        .type('json')
        .send(authorizationFields);

      expect(response).to.have.status(401);
      expect(response.body).to.be.eql({
        success: false,
        error: 'Unauthorized',
        message: 'Invalid login or password',
      });
    });
  });
});
