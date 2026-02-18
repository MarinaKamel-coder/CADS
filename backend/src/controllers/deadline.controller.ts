import type { Request, Response } from "express";
import prisma from "../prisma/prisma";


export const getDeadlines = async (req: Request, res: Response) => {
  const clerkUserId = req.auth!.userId;
  const deadlines = await prisma.deadline.findMany({
    where: { userId: clerkUserId },
    include: { client: { select: { firstName: true, lastName: true, status: true } } },
    orderBy: { dueDate: "asc" },
  });
  res.json(deadlines);
};

export const createDeadline = async (req: Request, res: Response) => {
  const clerkUserId = req.auth!.userId;
  const { clientId, title, description, dueDate, priority, type } = req.body;

  if (!clientId) return res.status(400).json({ message: "ID client requis" });

  // Utilisation d'une transaction pour créer la deadline ET l'alerte
  const result = await prisma.$transaction(async (tx: any) => {
    const deadline = await tx.deadline.create({
      data: {
        title,
        description,
        dueDate: new Date(dueDate),
        priority: priority || "MEDIUM",
        type: type || "FEDERAL",
        status: "PENDING",
        clientId,
        userId: clerkUserId,
      },
    });

    // Création automatique de l'alerte
    await tx.alert.create({
      data: {
        userId: clerkUserId,
        type: "DEADLINE",
        title: "Nouvelle échéance",
        message: `Échéance "${title}" ajoutée pour le ${new Date(dueDate).toLocaleDateString("fr-CA")}.`,
        priority: priority === "HIGH" ? "HIGH" : "MEDIUM",
      }
    });

    return deadline;
  });

  res.status(201).json(result);
};

export const updateDeadlineStatus = async (req: Request, res: Response) => {
  const { id } = req.params;
  const { status } = req.body;
  const clerkUserId = req.auth!.userId;

  if (!id) return res.status(400).json({ message: "ID requis" });

  const result = await prisma.$transaction(async (tx: any) => {
    const deadline = await tx.deadline.updateMany({
      where: { 
        id, 
        userId: clerkUserId,
        NOT: { status: "INACTIVE" } 
      },
      data: { status },
    });

    if (deadline.count > 0 && status === "COMPLETED") {
      // Optionnel : Créer une alerte de succès quand une tâche est finie
      await tx.alert.create({
        data: {
          userId: clerkUserId,
          type: "SYSTEM",
          title: "Tâche complétée",
          message: `Une obligation a été marquée comme terminée.`,
          priority: "LOW",
        }
      });
    }

    return deadline;
  });

  if (result.count === 0) return res.status(404).json({ message: "Non trouvé" });
  res.json({ message: "Statut mis à jour" });
};

export const deleteDeadline = async (req: Request, res: Response) => {
  const { id } = req.params;
  const clerkUserId = req.auth!.userId;

  if (!id) return res.status(400).json({ message: "ID requis" });

  const result = await prisma.deadline.deleteMany({
    where: { id, userId: clerkUserId },
  });

  if (result.count === 0) return res.status(404).json({ message: "Échéance non trouvée" });

  res.json({ message: "Échéance supprimée" });
};