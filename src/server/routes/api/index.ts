import { Router } from 'express';
import { poemRoute } from './poem';
import { tagsRoute } from './tags';
import { authRoute } from './auth';

const apiRoutes = Router();
apiRoutes.use(poemRoute);
apiRoutes.use(tagsRoute);
export {
  apiRoutes, authRoute,
};
