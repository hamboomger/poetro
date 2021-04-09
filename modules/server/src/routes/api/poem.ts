import { Request, Response, Router } from 'express';
import { checkSchema, validationResult } from 'express-validator';
import { Types } from 'mongoose';
import { Container } from 'typedi';
import Poem, { IPoem } from '../../models/poem';
import NotFoundError from '../../lib/errors/NotFoundError';
import BadRequestError from '../../lib/errors/BadRequestError';
import { createPoemValidationSchema, editPoemValidationSchema } from './validation/poemValidationSchema';
import { getCurrentUser } from '../../lib/util/currentUser';
import { PoemsService } from '../../services/PoemsService';

const route = Router();
const poemsService = Container.get(PoemsService);

route.get('/api/poems', async (req, res) => {
  const user = getCurrentUser(req);
  const poems = await Poem.find({ user: user._id });
  res.json(poems);
});

route.get('/api/poems/:poemId',
  async (req: Request, res: Response) => {
    const { poemId } = req.params;
    const user = getCurrentUser(req);
    const poem = await poemsService.getPoemById(poemId, user._id);
    if (poem === null) {
      throw new NotFoundError(`Failed to find poem by id: ${poemId}`);
    }

    res.json(poem);
  });

route.post('/api/poems/create',
  checkSchema(createPoemValidationSchema),
  async (req: Request, res: Response) => {
    const user = getCurrentUser(req);

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
    const savedPoem = await poemsService.createNewPoem(poem, user._id);
    res.json({
      success: true,
      poemId: savedPoem.id,
    });
  });

route.put('/api/poems/:poemId/update',
  checkSchema(editPoemValidationSchema),
  async (req: Request, res: Response) => {
    const result = validationResult(req);
    if (!result.isEmpty()) {
      throw BadRequestError.from(result);
    }

    const user = getCurrentUser(req);
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

route.delete('/api/poems/:poemId/delete',
  async (req: Request, res: Response) => {
    const user = getCurrentUser(req);
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
