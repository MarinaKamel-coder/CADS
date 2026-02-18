import { Router } from 'express';
import { getDeadlines, createDeadline, updateDeadlineStatus, deleteDeadline } from '../controllers/deadline.controller.js';

const router = Router();

router.get("/", getDeadlines);
router.post("/", createDeadline);
router.patch("/:id/status", updateDeadlineStatus);
router.delete("/:id", deleteDeadline);

export default router;
