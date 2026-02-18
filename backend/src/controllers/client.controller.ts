import type { Request, Response } from "express";
import prisma from "../prisma/prisma.js";


// GET /clients
export const getClients = async (req: Request, res: Response) => {
  const clerkUserId = req.auth!.userId;

  const clients = await prisma.client.findMany({
    where: { userId: clerkUserId },
    orderBy: { createdAt: "desc" },
    include: {
      _count: {
        select: {
          documents: true,
          deadlines: true,
        },
      },
    },
  });

  res.json({ clients: clients });
};

// GET /clients/:id (Vue détaillée)
export const getClient = async (req: Request, res: Response) => {
  const clerkUserId = req.auth!.userId;
  const { id } = req.params;

  if (!id) {
    return res.status(400).json({ message: "Client ID is required" });
  }

  const client = await prisma.client.findFirst({
    where: {
      id,
      userId: clerkUserId,
    },
    include: {
      documents: true,
      deadlines: true,
    },
    
  });

  if (!client) {
    return res.status(404).json({ message: "Client not found" });
  }

  res.json({ client });
};

// POST /clients
export const createClient = async (req: Request, res: Response) => {
  const clerkUserId = req.auth!.userId;

  const client = await prisma.client.create({
    data: {
      ...req.body,
      userId: clerkUserId,
    },
  });

  res.status(201).json({ client });
};

// PUT /clients/:id
export const updateClient = async (req: Request, res: Response) => {
  const clerkUserId = req.auth!.userId;
  const { id } = req.params;
  const updateData = req.body;

  try {
    const result = await prisma.$transaction(async (tx: any) => {

    if (!id) {
      return res.status(400).json({ message: "Client ID is required" });
    }
      // 1. Mise à jour du client
      const updatedClient = await tx.client.update({
        where: { id, userId: clerkUserId },
        data: updateData,
      });

      // 2. GESTION DE LA CASCADE
      if (updateData.status === "INACTIVE") {
        // Désactiver tout ce qui n'est pas fini
        await tx.deadline.updateMany({
          where: { clientId: id, status: "PENDING" },
          data: { status: "INACTIVE" },
        });
      } 
      else if (updateData.status === "ACTIVE") {
        // RÉACTIVATION : On repasse les obligations "INACTIVE" en "PENDING"
        await tx.deadline.updateMany({
          where: { clientId: id, status: "INACTIVE" },
          data: { status: "PENDING" },
        });
      }

      return updatedClient;
    });

    res.json({ message: "Statut mis à jour avec succès", client: result });
  } catch (error) {
    res.status(500).json({ message: "Erreur serveur" });
  }
};
// DELETE /clients/:id
export const deleteClient = async (req: Request, res: Response) => {
  const clerkUserId = req.auth!.userId;
  const { id } = req.params;
    

    if (!id) {
      return res.status(400).json({ message: "Client ID is required" });
    }

  const client = await prisma.client.deleteMany({
    where: { id, userId: clerkUserId },
  });

  if (!client.count) {
    return res.status(404).json({ message: "Client not found" });
  }

  res.json({ message: "Client deleted" });
};
