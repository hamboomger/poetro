import { Router } from 'express';
import poemRoute from './poem';

const router = Router();
router.use(poemRoute);
export default router;
