import { Router } from 'express';
import { createDeadline, getUpcomingDeadlines } from '../controllers/deadline.controller';

const router = Router();
router.post('/', createDeadline);
router.get('/upcoming', getUpcomingDeadlines);

export default router;
