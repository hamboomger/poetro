import { Router } from 'express';
import { validate } from 'express-validation';
import { Container } from 'typedi';
import Poem from '../../model/poem';
import { getCurrentUser } from '../../lib/currentUser';
import tagValidationSchema from './validation/tagValidationSchema';
import { ITagNoRefs, Tag } from '../../model/tag';
import { TagsService } from '../../services/TagsService';

const route = Router();
route.get('/api/tags', async (req, res) => {
  const user = getCurrentUser(req);
  const poems = await Poem.find({ user: user._id });
  const allTags = new Set(poems.flatMap((poem) => poem.tags));
  const tagsSorted = Array.from(allTags).sort();
  res.json(tagsSorted);
});
route.put(
  '/api/tags/update',
  validate(tagValidationSchema),
  async (req, res) => {
    const tag: ITagNoRefs = req.body;
    Tag.updateOne({ name: tag.name }, tag, { upsert: true });
    res.sendStatus(200);
  },
);
route.delete('/api/tags/:name/delete', async (req, res) => {
  const { name } = req.query;
  await Tag.deleteOne({ name: name as string });
  res.sendStatus(200);
});

export { route as tagsRoute };
