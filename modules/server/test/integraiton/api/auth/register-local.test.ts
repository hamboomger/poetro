import chai, { expect } from 'chai';
import chaiHttp from 'chai-http';
import app from '../../../../src';
import User from '../../../../src/models/user';
import request from '../../../util/request';

chai.use(chaiHttp);

describe('POST /api/register-local', () => {
  const user = {
    name: 'test name',
    email: 'testEmail',
    password: 'password',
  };
  afterEach(async () => {
    await User.deleteMany({});
  });
  it('should register user and add initial poems and tags', async () => {
    const response = await request.post('/api/register-local')
      .type('form')
      .send(user);

    expect(response).to.have.status(200);
    expect(response.body).to.be.an('object');
    expect(response.body).to.have.keys(['_id', 'name', 'email']);
    expect(response.body).to.not.include.any.keys(['passwordHash']);

    const userId = response.body._id;
    const userPoemsResponse = await request.get('/api/poems', userId);
    const userPoems = userPoemsResponse.body;
    expect(userPoemsResponse).to.have.status(200);
    expect(userPoemsResponse.body).to.be.an('array');
    expect(userPoems.length).to.be.greaterThan(0);
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
        'name field is missing',
        'name field should be a string',
        'email field is missing',
        'email field should be a string',
        'password field is missing',
        'password field should be a string',
      ],
      message: 'Multiple validation errors',
      success: false,
    });
  });
  // TODO should fail if user with such email already exists
  // TODO should fail if user with such name already exists
});
