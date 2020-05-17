import chai, { expect } from 'chai';
import chaiHttp from 'chai-http';
import { Types } from 'mongoose';
import Poem, { IPoem } from '../../../src/server/model/poem';
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
      expect(response.body[0]).to.have.keys(['_id', 'author', 'text', 'targetTimeSec', 'tags']);
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
      expect(response.body).to.have.keys(['_id', 'author', 'text', 'targetTimeSec', 'tags']);
    });
    it('should return 404 if there is no poem with given :poemId', async () => {
      const generatedId = Types.ObjectId().toHexString();

      const response = await chai.request(app)
        .get(`/api/poem/${generatedId}`);
      expect(response).to.have.status(404);
      expect(response.body).be.eql({
        success: false,
        error: 'Resource not found',
        message: `Failed to find poem by id: ${generatedId}`,
      });
    });
    it('should return 400 if :poemId is not a valid ObjectId', async () => {
      const invalidPoemId = 'invalidId';

      const response = await chai.request(app)
        .get(`/api/poem/${invalidPoemId}`);
      expect(response).to.have.status(400);
      expect(response.body).be.eql({
        success: false,
        error: 'Bad Request',
        message: 'Invalid object identifier specified',
      });
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
        tags: ['a', 'b', 'c'],
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
    it('should return bad request if tags field is not an array', async () => {
      const invalidPoem = {
        author: 'Edgar Poe',
        text: 'some text',
        targetTimeSec: 10,
        tags: {
          invalidField: 42,
        },
      };

      const response = await chai.request(app)
        .post('/api/poem')
        .send(invalidPoem);
      expect(response).to.have.status(400);
      expect(response.body).be.eql({
        success: false,
        error: 'Bad Request',
        message: 'tags field should be an array of strings',
      });
    });
    it('should return bad request if tags field is not an array of strings', async () => {
      const invalidPoem = {
        author: 'Edgar Poe',
        text: 'some text',
        targetTimeSec: 10,
        tags: [1, 2, 3],
      };

      const response = await chai.request(app)
        .post('/api/poem')
        .send(invalidPoem);
      expect(response).to.have.status(400);
      expect(response.body).be.eql({
        success: false,
        error: 'Bad Request',
        message: 'tags field should be an array of strings',
      });
    });
  });
  describe('PUT /api/poem/:poemId', () => {
    let poemId: string;
    beforeEach(async () => {
      const poem = new Poem({
        author: 'William Shakespeare',
        text: 'Dummy text',
        targetTimeSec: 10,
        tags: ['a', 'b'],
      });
      await poem.save();
      poemId = poem._id;
    });
    afterEach(async () => {
      await Poem.deleteMany({});
    });
    it('should update poem', async () => {
      const fieldsToUpdate = {
        author: 'Edgar Poe',
        targetTimeSec: 15,
        tags: ['a', 'c'],
      };

      const response = await chai.request(app)
        .put(`/api/poem/${poemId}`)
        .send(fieldsToUpdate);
      expect(response).to.have.status(200);
      expect(response.body).to.have.keys(['success', 'updatedPoem']);

      const updatedPoem = await Poem.findById(poemId);
      expect(updatedPoem.author).to.be.equal('Edgar Poe');
      expect(updatedPoem.targetTimeSec).to.be.equal(15);
      expect(updatedPoem.tags).to.be.eql(['a', 'c']);
    });
  });
  it('should return 404 if there is no poem with given :poemId', async () => {
    const generatedId = Types.ObjectId().toHexString();
    const fieldsToUpdate = {
      author: 'Edgar Poe',
      targetTimeSec: 15,
    };

    const response = await chai.request(app)
      .put(`/api/poem/${generatedId}`)
      .send(fieldsToUpdate);

    expect(response).to.have.status(404);
    expect(response.body).be.eql({
      success: false,
      error: 'Resource not found',
      message: `Failed to update poem by id(poem not found): ${generatedId}`,
    });
  });
  it('should return 400 if :poemId is not a valid ObjectId', async () => {
    const invalidPoemId = 'invalidId';
    const fieldsToUpdate = {
      author: 'Edgar Poe',
      targetTimeSec: 15,
    };

    const response = await chai.request(app)
      .put(`/api/poem/${invalidPoemId}`)
      .send(fieldsToUpdate);

    expect(response).to.have.status(400);
    expect(response.body).be.eql({
      success: false,
      error: 'Bad Request',
      message: 'Invalid object identifier specified',
    });
  });
});
describe('Delete /api/poem/:poemId', () => {
  let poem: IPoem;

  beforeEach(async () => {
    poem = new Poem({
      author: 'Author',
      name: 'Poem to delete',
      text: 'Test text',
      targetTimeSec: 100,
    });
    await poem.save();
  });
  afterEach(async () => {
    await Poem.deleteMany({});
  });
  it('should delete poem', async () => {
    const poemsCountBeforeReq = await Poem.estimatedDocumentCount();

    const response = await chai.request(app)
      .delete(`/api/poem/${poem._id}`);
    expect(response).to.have.status(200);
    expect(response.body).to.have.keys(['success', 'deletedPoem']);
    expect(response.body.success).to.be.equal(true);

    const poemsCountAfterReq = await Poem.estimatedDocumentCount();
    expect(poemsCountBeforeReq).to.be.equal(1);
    expect(poemsCountAfterReq).to.be.equal(0);
  });
  it('should return 404 if there is no poem with given :poemId', async () => {
    const generatedId = Types.ObjectId();

    const response = await chai.request(app)
      .delete(`/api/poem/${generatedId}`);
    expect(response).to.have.status(404);
    expect(response.body).be.eql({
      success: false,
      error: 'Resource not found',
      message: `Failed to delete poem by id(poem not found): ${generatedId}`,
    });
  });
  it('should return 400 if :poemId is not a valid ObjectId', async () => {
    const invalidPoemId = 'invalidId';

    const response = await chai.request(app)
      .delete(`/api/poem/${invalidPoemId}`);
    expect(response).to.have.status(400);
    expect(response.body).be.eql({
      success: false,
      error: 'Bad Request',
      message: 'Invalid object identifier specified',
    });
  });
});
