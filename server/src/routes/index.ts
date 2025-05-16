import { Router } from 'express';
import authRoutes from './auth-routes.js';
import apiRoutes from './api/index.js';
import { authenticateToken } from '../middleware/auth.js';

const router = Router();

// ==============================
// TODO: Public route for user auth (login/register)
// ==============================
// NOTE Does not require JWT — open to new or returning users
router.use('/auth', authRoutes);

// ==============================
// TODO: Protected API routes (news, users, etc.)
// ==============================
// NOTE All /api routes now require valid JWT in Authorization header
router.use('/api', authenticateToken, apiRoutes);

export default router;
// NOTE Used in server.ts → app.use('/', router)
