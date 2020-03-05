import { Request, Response, Router } from 'express';
import { check } from 'express-validator';
import Poem from '../../model/poem';
import NotFoundError from '../../lib/errors/notFoundError';
import BadRequestError from '../../lib/errors/badRequestError';

const route = Router();
route.get('/api/poems', async (req, res) => {
  const poems = await Poem.find();
  res.json(poems);
});

route.get('/api/poem/:poemId', [
  check('poemId').exists(),
], async (req: Request, res: Response) => {
  const { poemId } = req.query;
  const poem = await Poem.find({ _id: poemId });
  if (poem === null) {
    throw new NotFoundError('There is no poem with specified id');
  }

  res.json(poem);
});

export default route;
