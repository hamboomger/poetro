import { Request, Response, Router } from 'express';
import { checkSchema, validationResult } from 'express-validator';
import Poem from '../../model/poem';
import NotFoundError from '../../lib/errors/notFoundError';
import poemValidationSchema from './validation/poemValidationSchema';
import BadRequestError from '../../lib/errors/badRequestError';

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
      throw new NotFoundError('There is no poem with specified id');
    }

    res.json(poem);
  });

route.post('/api/poem',
  checkSchema(poemValidationSchema),
  async (req: Request, res: Response) => {
    const result = validationResult(req);
    if (!result.isEmpty()) {
      throw BadRequestError.from(result);
    }

    const {
      author, text, name, targetTimeSec,
    } = req.body;
    const poem = new Poem({
      author, text, name, targetTimeSec,
    });
    await poem.save();
    res.json({
      success: true,
      poemId: poem.id,
    });
  });

route.delete('/api/poem/:poemId',
  async (req: Request, res: Response) => {
    const { poemId } = req.query;
    const deletedPoem = Poem.findByIdAndDelete(poemId);

    if (!deletedPoem) {
      console.log(`Failed to delete poem by id(poem not found): ${poemId}`);
      res.status(400);
      res.json({
        success: false,
      });
    } else {
      res.json({
        success: true,
      });
    }
  });
export default route;
