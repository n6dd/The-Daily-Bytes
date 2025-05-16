import { Router } from 'express';
import authRoutes from './auth-routes.js';
import apiRoutes from './api/index.js';
import { authenticateToken } from '../middleware/auth.js';

const router = Router();

// TODO: Public route for user auth (login/register)
router.use('/auth', authRoutes);
// NOTE Does not require JWT — open to new or returning users

// TODO: Protected routes (news, users, etc.)
router.use('/api', authenticateToken, apiRoutes);
// NOTE All /api routes now require valid JWT in Authorization header

export default router;
// NOTE Used in server.ts → app.use('/', router)
