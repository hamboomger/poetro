import { Router } from 'express';
import { authRoute } from './auth';
import { poemRoute } from './poems/route';
import { tagsRoute } from './tags/route';

const apiRoutes = Router();
apiRoutes.use(poemRoute);
apiRoutes.use(tagsRoute);
export {
  apiRoutes, authRoute,
};
