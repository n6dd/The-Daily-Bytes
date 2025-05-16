import { Router } from 'express';
import { userRouter } from './user-routes.js';
import { mainNewsRouter } from './mainNews.js';        // ✅ Main News (Mediastack)
import { horoscopeRouter } from './horoscope.js';      // ✅ Horoscope (Aztro)

const router = Router();

// ==============================
// User Routes
// ==============================
router.use('/users', userRouter);                      // e.g. /api/users

// ==============================
// Mediastack News Route
// ==============================
router.use('/news', mainNewsRouter);                   // e.g. /api/news/:category?

// ==============================
// Horoscope Route
// ==============================
router.use('/horoscope', horoscopeRouter);             // e.g. /api/horoscope/:sign

export default router;
