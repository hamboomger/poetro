import chai, { expect } from 'chai';
import chaiHttp from 'chai-http';
import createAndSaveMockPoem from '../../mocks/createAndSaveMockPoem';
import createAndSaveTestUser from '../../mocks/createAndSaveTestUser';
import request from '../../util/request';
import Poem from '../../../src/models/poem';
import User, { IUserDocument } from '../../../src/models/user';

chai.use(chaiHttp);

describe('Tags', () => {
  let savedUser: IUserDocument;
  beforeEach(async () => {
    const { user } = await createAndSaveTestUser(1);
    savedUser = user;
  });
  afterEach(async () => {
    await User.deleteMany({});
  });

  describe('GET /api/tags', () => {
    beforeEach(async () => {
      const tags1 = ['a', 'b'];
      const tags2 = ['a', 'c'];
      await createAndSaveMockPoem(savedUser, 1, tags1);
      await createAndSaveMockPoem(savedUser, 2, tags2);
    });
    afterEach(async () => {
      await Poem.deleteMany({});
    });
    it('should return list of all tags', async () => {
      const response = await request.get('/api/tags', savedUser._id);
      expect(response).to.have.status(200);
      expect(response.body).to.eql(['a', 'b', 'c']);
    });
  });
});
