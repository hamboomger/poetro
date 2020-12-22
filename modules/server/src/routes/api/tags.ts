import { Router } from 'express';
import Poem from '../../model/poem';
import { getCurrentUser } from '../../lib/currentUser';

const route = Router();
route.get('/api/tags', async (req, res) => {
  const user = getCurrentUser();
  const poems = await Poem.find({ user: user._id });
  const allTags = new Set(poems.flatMap((poem) => poem.tags));
  const tagsSorted = Array.from(allTags).sort();
  res.json(tagsSorted);
});
export { route as tagsRoute };
