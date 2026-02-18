import { Router } from "express";
import { getAlerts, markAsRead, clearAllAlerts } from "../controllers/alert.controller";

const router = Router();

// GET /api/alerts
router.get("/", getAlerts);

// PATCH /api/alerts/:id/read
router.patch("/:id/read", markAsRead);

// DELETE /api/alerts/clear
router.delete("/clear", clearAllAlerts);

export default router;