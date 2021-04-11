import { Router } from 'express';
import { validate } from 'express-validation';
import { Container } from 'typedi';
import { getCurrentUser } from '../../../lib/util/currentUser';
import { TagsService } from '../../../services/TagsService';
import { Tag, TagModel } from '../../../models/tag';
import { updateTagValidationSchema } from './schema';

const route = Router();

const tagsService = Container.get(TagsService);
route.get('/api/tags', async (req, res) => {
  const user = getCurrentUser(req);
  const tags = await tagsService.getAll(user.id);
  res.json(tags);
});
route.put(
  '/api/tags/update',
  validate(updateTagValidationSchema),
  async (req, res) => {
    const tag: Partial<TagModel> = req.body;
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
