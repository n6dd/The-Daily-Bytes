// server/src/routes/api/index.ts
import { Router } from 'express';
import horoscopeRoutes from './horoscope.js';
import mainNewsRoutes from './mainNews.js';
import userRoutes from './user-routes.js';
import authRoutes from '../auth-routes.js';

const router = Router();

router.use('/horoscope', horoscopeRoutes);
router.use('/news',      mainNewsRoutes);
router.use('/users',     userRoutes);
router.use('/auth',      authRoutes);

export default router;
