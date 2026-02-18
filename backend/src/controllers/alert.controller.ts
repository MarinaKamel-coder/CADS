import type { Request, Response } from "express";
import prisma from "../prisma/prisma.js";


export const getAlerts = async (req: Request, res: Response) => {
  const clerkUserId = req.auth!.userId;
  const alerts = await prisma.alert.findMany({
    where: { userId: clerkUserId },
    orderBy: { createdAt: "desc" },
  });
  res.json(alerts);
};

export const markAsRead = async (req: Request, res: Response) => {
  const { id } = req.params;
  if (!id) {
    return res.status(400).json({ error: "Alert ID is required" });
  }
  await prisma.alert.update({
    where: { id },
    data: { read: true }
  });
  res.json({ success: true });
};

export const clearAllAlerts = async (req: Request, res: Response) => {
  const clerkUserId = req.auth!.userId;
  await prisma.alert.deleteMany({
    where: { userId: clerkUserId, read: true }
  });
  res.json({ message: "Alertes lues supprimées" });
};