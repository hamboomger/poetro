import { Router } from 'express';
import poemRoute from './poem';
import tagsRoute from './tags';
import authRoute from './auth';

const router = Router();
router.use(poemRoute);
router.use(tagsRoute);
router.use(authRoute);
export default router;
