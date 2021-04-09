import chai, { expect } from 'chai';
import chaiHttp from 'chai-http';
import app from '../../../../src/index';
import User, { IUser } from '../../../../src/models/user';
import hashPassword from '../../../../src/lib/util/hashPassword';

chai.use(chaiHttp);

describe('POST /auth/login-local', () => {
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
      name: user.name,
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
