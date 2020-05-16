import { Router } from 'express';
import Poem from '../../model/poem';

const route = Router();
route.get('/api/tags', async (req, res) => {
  const poems = await Poem.find();
  const allTags = new Set(poems.flatMap((poem) => poem.tags));
  const tagsSorted = Array.from(allTags).sort();
  res.json(tagsSorted);
});

export default route;
