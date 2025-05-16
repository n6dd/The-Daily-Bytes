import { Router } from 'express';
import { userRouter } from './user-routes.js';
import { mainNewsRouter } from './mainNews.js';

// TODO: Create root API router
const router = Router();

// TODO: Mount /users route
// NOTE Handles user profile fetch and admin functions
router.use('/users', userRouter);

// TODO: Mount /news route
// NOTE Proxies requests from frontend to NewsAPI through backend
router.use('/news', mainNewsRouter);

export default router;
// NOTE Exported in server.ts as `app.use('/api', apiRoutes)`
