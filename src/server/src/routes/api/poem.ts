import { Request, Response, Router } from 'express';
import { checkSchema, validationResult } from 'express-validator';
import { Types } from 'mongoose';
import Poem, { IPoem } from '../../model/poem';
import NotFoundError from '../../lib/errors/NotFoundError';
import BadRequestError from '../../lib/errors/BadRequestError';
import { createPoemValidationSchema, editPoemValidationSchema } from './validation/poemValidationSchema';
import { getCurrentUser } from '../../lib/currentUser';

const route = Router();
route.get('/api/poems', async (req, res) => {
  const user = getCurrentUser();
  const poems = await Poem.find({ user: user._id });
  res.json(poems);
});

route.get('/api/poem/:poemId',
  async (req: Request, res: Response) => {
    const { poemId } = req.params;
    const user = getCurrentUser();
    const poem = await Poem.findOne({ user: user._id, _id: poemId });
    if (poem === null) {
      throw new NotFoundError(`Failed to find poem by id: ${poemId}`);
    }

    res.json(poem);
  });

route.post('/api/poem',
  checkSchema(createPoemValidationSchema),
  async (req: Request, res: Response) => {
    const user = getCurrentUser();

    const result = validationResult(req);
    if (!result.isEmpty()) {
      throw BadRequestError.from(result);
    }

    const {
      author, text, name, targetTimeSec, tags,
    } = req.body;
    const poem: IPoem = {
      user: Types.ObjectId(user._id), author, text, name, targetTimeSec, tags,
    };
    const savedPoem = await new Poem(poem).save();
    res.json({
      success: true,
      poemId: savedPoem.id,
    });
  });

route.put('/api/poem/:poemId',
  checkSchema(editPoemValidationSchema),
  async (req: Request, res: Response) => {
    const result = validationResult(req);
    if (!result.isEmpty()) {
      throw BadRequestError.from(result);
    }

    const user = getCurrentUser();
    const { poemId } = req.params;
    const poem = req.body;

    const updatedPoem = await Poem.findOneAndUpdate({ _id: poemId, user: user._id }, poem);
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
    const user = getCurrentUser();
    const { poemId } = req.params;
    const deletedPoem = await Poem.findOneAndRemove({ _id: poemId, user: user._id });

    if (!deletedPoem) {
      throw new NotFoundError(`Failed to delete poem by id(poem not found): ${poemId}`);
    }
    res.json({
      success: true,
      deletedPoem,
    });
  });

export { route as poemRoute };
