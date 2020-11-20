import chai, { expect } from 'chai';
import chaiHttp from 'chai-http';
import Poem from '../../../src/server/model/poem';
import app from '../../../src/server';

chai.use(chaiHttp);

describe('Tags', () => {
  describe('GET /api/tags', () => {
    beforeEach(async () => {
      const poem1 = new Poem({
        author: 'author1',
        text: 'Dummy text',
        targetTimeSec: 10,
        tags: ['a', 'b'],
      });
      const poem2 = new Poem({
        author: 'author2',
        text: 'Dummy text',
        targetTimeSec: 10,
        tags: ['a', 'c'],
      });
      await poem1.save();
      await poem2.save();
    });
    afterEach(async () => {
      await Poem.deleteMany({});
    });
    it('should return list of all tags', async () => {
      const response = await chai.request(app).get('/api/tags');
      expect(response).to.have.status(200);
      expect(response.body).to.eql(['a', 'b', 'c']);
    });
  });
});
