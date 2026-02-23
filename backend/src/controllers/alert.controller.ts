import type { Request, Response } from "express";
import prisma from "../prisma/prisma";


export const getAlerts = async (req: Request, res: Response) => {
  try {
    const clerkUserId = req.auth!.userId;
    
    const alerts = await prisma.alert.findMany({
      where: { userId: clerkUserId },
      include: {
        // On demande à Prisma d'inclure les infos du client lié
        client: {
          select: {
            firstName: true,
            lastName: true,
          }
        }
      },
      orderBy: { createdAt: "desc" },
    });
    
    res.json(alerts);
  } catch (error) {
    console.error("Erreur récup alertes:", error);
    res.status(500).json({ error: "Erreur serveur" });
  }
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