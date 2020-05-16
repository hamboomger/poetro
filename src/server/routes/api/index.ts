import { Router } from 'express';
import poemRoute from './poem';
import tagsRoute from './tags';

const router = Router();
router.use(poemRoute);
router.use(tagsRoute);
export default router;
