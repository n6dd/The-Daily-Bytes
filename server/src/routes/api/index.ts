import { Router } from 'express';
import { userRouter } from './user-routes.js';
import { mediaNewsRouter } from './mainNews.js';       // ✅ Mediastack route
import { horoscopeRouter } from './horoscope.js';       // ✅ Aztro route

// ==============================
// Create API Router
// ==============================
const router = Router();

// ==============================
// User Routes
// ==============================
router.use('/users', userRouter);                       // e.g. /api/users

// ==============================
// Mediastack News Route
// ==============================
router.use('/media-news', mediaNewsRouter);             // e.g. /api/media-news/:category?

// ==============================
// Horoscope Route (Aztro)
// ==============================
router.use('/horoscope', horoscopeRouter);              // e.g. /api/horoscope/:sign

export default router;
