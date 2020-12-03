import chai, { expect } from 'chai';
import chaiHttp from 'chai-http';
import { Types } from 'mongoose';
import Poem, { IPoem, IPoemDocument } from '../../../src/model/poem';
import User, { IUserDocument } from '../../../src/model/user';
import createAndSaveMockPoem from '../../mocks/createAndSaveMockPoem';
import createAndSaveTestUser from '../../mocks/createAndSaveTestUser';
import request from '../../util/request';

chai.use(chaiHttp);

describe('Poems', () => {
  let savedUser: IUserDocument;
  let anotherUser: IUserDocument;
  beforeEach(async () => {
    const { user: user1 } = await createAndSaveTestUser(1);
    const { user: user2 } = await createAndSaveTestUser(2);
    savedUser = user1;
    anotherUser = user2;
  });
  afterEach(async () => {
    await User.deleteMany({});
  });

  describe('GET /api/poems', () => {
    beforeEach(async () => {
      await createAndSaveMockPoem(savedUser, 1);
      await createAndSaveMockPoem(savedUser, 2);
      await createAndSaveMockPoem(anotherUser, 2);
    });
    afterEach(async () => {
      await Poem.deleteMany({});
    });

    it('should return list of all poems', async () => {
      const response = await request.get('/api/poems', savedUser);
      expect(response).to.have.status(200);
      expect(response.body).to.be.an('array').with.length(2);
      expect(response.body[0]).to.have.keys(['_id', 'author', 'text', 'targetTimeSec', 'tags', 'name', 'user']);

      const poems = response.body as Array<IPoem>;
      const poemsBelongingToSavedUser = poems.filter(
        (poem) => poem.user.toString() === savedUser._id,
      );
      expect(poemsBelongingToSavedUser.length).to.be.equal(poems.length);
    });
  });
  describe('GET /api/poem/:poemId', () => {
    let poemId: string;
    beforeEach(async () => {
      poemId = (await createAndSaveMockPoem(savedUser)).id;
    });
    afterEach(async () => {
      await Poem.deleteMany({});
    });
    it('should return poem by id', async () => {
      const response = await request.get(`/api/poem/${poemId}`, savedUser);
      expect(response).to.have.status(200);
      expect(response.body).to.be.an('object');
      expect(response.body).to.have.keys(['_id', 'author', 'text', 'targetTimeSec', 'tags', 'name', 'user']);
    });
    it('should return 404 if there is no poem with given :poemId', async () => {
      const generatedId = Types.ObjectId().toHexString();

      const response = await request.get(`/api/poem/${generatedId}`, savedUser);
      expect(response).to.have.status(404);
      expect(response.body).be.eql({
        success: false,
        error: 'Resource not found',
        message: `Failed to find poem by id: ${generatedId}`,
      });
    });
    it('should return 400 if :poemId is not a valid ObjectId', async () => {
      const invalidPoemId = 'invalidId';

      const response = await request.get(`/api/poem/${invalidPoemId}`, savedUser);
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

      const response = await request.post('/api/poem', savedUser).send(poem);

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

      const response = await request.post('/api/poem', savedUser)
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

      const response = await request.post('/api/poem', savedUser)
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

      const response = await request.post('/api/poem', savedUser)
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
      const poem: IPoem = {
        user: Types.ObjectId(savedUser._id),
        author: 'William Shakespeare',
        text: 'Dummy text',
        targetTimeSec: 10,
        tags: ['a', 'b'],
      };
      poemId = (await new Poem(poem).save())._id;
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

      const response = await request.put(`/api/poem/${poemId}`, savedUser)
        .send(fieldsToUpdate);
      expect(response).to.have.status(200);
      expect(response.body).to.have.keys(['success', 'updatedPoem']);

      const updatedPoem = await Poem.findById(poemId);
      expect(updatedPoem).to.not.equal(null);
      if (updatedPoem) { // required for the type guards
        expect(updatedPoem.author).to.be.equal('Edgar Poe');
        expect(updatedPoem.targetTimeSec).to.be.equal(15);
        expect(updatedPoem.tags).to.be.eql(['a', 'c']);
      }
    });
    it('should return 404 if there is no poem with given :poemId', async () => {
      const generatedId = Types.ObjectId().toHexString();
      const fieldsToUpdate = {
        author: 'Edgar Poe',
        targetTimeSec: 15,
      };

      const response = await request.put(`/api/poem/${generatedId}`, savedUser)
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

      const response = await request.put(`/api/poem/${invalidPoemId}`, savedUser)
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
    let savedPoem: IPoemDocument;
    let poemOfDifferentUser: IPoemDocument;

    beforeEach(async () => {
      savedPoem = await createAndSaveMockPoem(savedUser, 1);
      poemOfDifferentUser = await createAndSaveMockPoem(anotherUser, 2);
    });
    afterEach(async () => {
      await Poem.deleteMany({});
    });
    it('should delete poem', async () => {
      const poemsCountBeforeReq = await Poem.estimatedDocumentCount();

      const response = await request.deleteReq(`/api/poem/${savedPoem._id}`, savedUser);
      expect(response).to.have.status(200);
      expect(response.body).to.have.keys(['success', 'deletedPoem']);
      expect(response.body.success).to.be.equal(true);

      const poemsCountAfterReq = await Poem.estimatedDocumentCount();
      expect(poemsCountBeforeReq).to.be.equal(2);
      expect(poemsCountAfterReq).to.be.equal(1);
    });
    it('should not delete poem if it was created by a different user', async () => {
      const poemsCountBeforeReq = await Poem.estimatedDocumentCount();

      const response = await request.deleteReq(
        `/api/poem/${poemOfDifferentUser._id}`, savedUser,
      );
      expect(response).to.have.status(404);
      expect(response.body).to.be.eql({
        success: false,
        error: 'Resource not found',
        message: `Failed to delete poem by id(poem not found): ${poemOfDifferentUser.id}`,
      });

      const poemsCountAfterReq = await Poem.estimatedDocumentCount();
      expect(poemsCountBeforeReq).to.be.equal(2);
      expect(poemsCountAfterReq).to.be.equal(2);
    });
    it('should return 404 if there is no poem with given :poemId', async () => {
      const generatedId = Types.ObjectId();

      const response = await request.deleteReq(`/api/poem/${generatedId}`, savedUser);
      expect(response).to.have.status(404);
      expect(response.body).be.eql({
        success: false,
        error: 'Resource not found',
        message: `Failed to delete poem by id(poem not found): ${generatedId}`,
      });
    });
    it('should return 400 if :poemId is not a valid ObjectId', async () => {
      const invalidPoemId = 'invalidId';

      const response = await request.deleteReq(`/api/poem/${invalidPoemId}`, savedUser);
      expect(response).to.have.status(400);
      expect(response.body).be.eql({
        success: false,
        error: 'Bad Request',
        message: 'Invalid object identifier specified',
      });
    });
  });
});
