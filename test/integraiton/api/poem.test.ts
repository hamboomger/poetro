import chai, { expect } from 'chai';
import chaiHttp from 'chai-http';
import Poem from '../../../src/server/model/poem';
import app from '../../../src/server';

chai.use(chaiHttp);

describe('Poems', () => {
  afterEach(async () => {
    await Poem.deleteMany({});
  });
  describe('GET /api/poems', () => {
    before(async () => {
      const poem1 = new Poem({
        author: 'William Shakespeare',
        text: 'Dummy text',
        targetTimeSec: 10,
      });
      const poem2 = new Poem({
        author: 'Edgar Poe',
        text: 'Dummy text',
        targetTimeSec: 10,
      });
      await poem1.save();
      await poem2.save();
    });
    it('should return list of all poems', async () => {
      const result = await chai.request(app).get('/api/poems');
      expect(result).to.have.status(200);
      expect(result.body).to.be.an('array').with.length(2);
    });
  });
});
