import { Router } from 'express';
import { userRouter } from './user-routes.js';
import { mainNewsRouter } from './mainNews.js'; 

const router = Router();

router.use('/users', userRouter);

router.use('/news', mainNewsRouter); 

export default router;
