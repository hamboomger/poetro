import chai, { expect } from 'chai';
import chaiHttp from 'chai-http';
import Poem from '../../../src/server/model/poem';
import app from '../../../src/server';

chai.use(chaiHttp);

describe('Poems', () => {
  describe('GET /api/poems', () => {
    beforeEach(async () => {
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
    afterEach(async () => {
      await Poem.deleteMany({});
    });
    it('should return list of all poems', async () => {
      const response = await chai.request(app).get('/api/poems');
      expect(response).to.have.status(200);
      expect(response.body).to.be.an('array').with.length(2);
      expect(response.body[0]).to.have.keys(['_id', 'author', 'text', 'targetTimeSec']);
    });
  });
  describe('GET /api/poem/:poemId', () => {
    let poemId: string;
    beforeEach(async () => {
      const poem = new Poem({
        author: 'Edgar Poe',
        text: 'Dummy text',
        targetTimeSec: 10,
      });
      await poem.save();
      poemId = poem.id;
    });
    afterEach(async () => {
      await Poem.deleteMany({});
    });
    it('should return poem by id', async () => {
      const response = await chai.request(app).get(`/api/poem/${poemId}`);
      expect(response).to.have.status(200);
      expect(response.body).to.be.an('object');
      expect(response.body).to.have.keys(['_id', 'author', 'text', 'targetTimeSec']);
    });
  });
  describe('POST /api/poem', () => {
    afterEach(async () => {
      await Poem.deleteMany({});
    });
    it('should save new poem', async () => {
      const poem = {
        author: 'Edgar Poe',
        text: 'Dummy text',
        targetTimeSec: 10,
      };
      const poemsCountBeforeReq = await Poem.estimatedDocumentCount();

      const response = await chai.request(app)
        .post('/api/poem')
        .send(poem);
      expect(response).to.have.status(200);
      expect(response.body).to.have.keys(['success', 'poemId']);

      const poemsCountAfterReq = await Poem.estimatedDocumentCount();
      expect(poemsCountBeforeReq).to.be.equal(0);
      expect(poemsCountAfterReq).to.be.equal(1);
    });
    it('should return bad request if required field is missing', async () => {
      const invalidPoem = {
        author: 'Edgar Poe',
        targetTimeSec: 10,
      };

      const response = await chai.request(app)
        .post('/api/poem')
        .send(invalidPoem);
      expect(response).to.have.status(400);
      expect(response.body).be.eql({
        success: false,
        error: 'Bad Request',
        message: 'Multiple validation errors',
        errors: [
          'text field is missing',
          'text field should be a string',
        ],
      });
    });
  });
});
