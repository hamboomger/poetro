import { Router } from 'express';
import { validate } from 'express-validation';
import { Container } from 'typedi';
import { getCurrentUser } from '../../../lib/util/currentUser';
import { TagsService } from '../../../services/TagsService';
import { CreateTag, Tag } from '../../../models/tag';
import { createTagValidationSchema, updateTagValidationSchema } from './schema';

const route = Router();

const tagsService = Container.get(TagsService);
route.get('/api/tags', async (req, res) => {
  const user = getCurrentUser(req);
  const tags = await tagsService.getAll(user.id);
  res.json(tags);
});
route.post(
  '/api/tags/create',
  validate(createTagValidationSchema),
  async (req, res) => {
    const user = getCurrentUser(req);
    const { name, color } = req.body as { name: string, color: string };
    const tag: CreateTag = {
      userId: user.id, name, color,
    };
    const createdTag = await tagsService.createTag(tag);
    res.json(createdTag);
  },
);
route.put(
  '/api/tags/:id/update',
  validate(updateTagValidationSchema),
  async (req, res) => {
    const user = getCurrentUser(req);
    const { id: tagId } = req.params;
    const { name, color } = req.body as {
      name: string | undefined,
      color: string | undefined
    };

    const result = await tagsService.updateTag(user.id, tagId, {
      name, color,
    });
    res.json(result);
  },
);
route.delete('/api/tags/:name/delete', async (req, res) => {
  const { name } = req.query;
  await Tag.deleteOne({ name: name as string });
  res.sendStatus(200);
});

export { route as tagsRoute };
