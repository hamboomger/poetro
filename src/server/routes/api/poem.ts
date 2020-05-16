import { Request, Response, Router } from 'express';
import { checkSchema, validationResult } from 'express-validator';
import Poem from '../../model/poem';
import NotFoundError from '../../lib/errors/notFoundError';
import BadRequestError from '../../lib/errors/badRequestError';
import { createPoemValidationSchema, editPoemValidationSchema } from './validation/poemValidationSchema';

const route = Router();
route.get('/api/poems', async (req, res) => {
  const poems = await Poem.find();
  res.json(poems);
});

route.get('/api/poem/:poemId',
  async (req: Request, res: Response) => {
    const { poemId } = req.params;

    const poem = await Poem.findOne({ _id: poemId });
    if (poem === null) {
      throw new NotFoundError(`Failed to find poem by id: ${poemId}`);
    }

    res.json(poem);
  });

route.post('/api/poem',
  checkSchema(createPoemValidationSchema),
  async (req: Request, res: Response) => {
    const result = validationResult(req);
    if (!result.isEmpty()) {
      throw BadRequestError.from(result);
    }

    const {
      author, text, name, targetTimeSec, tags,
    } = req.body;
    const poem = new Poem({
      author, text, name, targetTimeSec, tags,
    });
    await poem.save();
    res.json({
      success: true,
      poemId: poem.id,
    });
  });

route.put('/api/poem/:poemId',
  checkSchema(editPoemValidationSchema),
  async (req: Request, res: Response) => {
    const result = validationResult(req);
    if (!result.isEmpty()) {
      throw BadRequestError.from(result);
    }

    const { poemId } = req.params;
    const poem = req.body;
    const updatedPoem = await Poem.findByIdAndUpdate(poemId, poem);
    if (!updatedPoem) {
      throw new NotFoundError(`Failed to update poem by id(poem not found): ${poemId}`);
    }

    res.json({
      success: true,
      updatedPoem,
    });
  });

route.delete('/api/poem/:poemId',
  async (req: Request, res: Response) => {
    const { poemId } = req.params;
    const deletedPoem = await Poem.findByIdAndRemove(poemId);

    if (!deletedPoem) {
      throw new NotFoundError(`Failed to delete poem by id(poem not found): ${poemId}`);
    }
    res.json({
      success: true,
      deletedPoem,
    });
  });
export default route;
