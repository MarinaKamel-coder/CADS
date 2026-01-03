import type { Request, Response } from "express";
import prisma from "../prisma/prisma";

// GET /clients
export const getClients = async (req: Request, res: Response) => {
  const clerkUserId = req.auth!.userId;

  const clients = await prisma.client.findMany({
    where: { userId: clerkUserId },
    orderBy: { createdAt: "desc" },
  });

  res.json({ clients });
};

// GET /clients/:id
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

  if (!id) {
  return res.status(400).json({ message: "Client ID is required" });
  }

  const client = await prisma.client.updateMany({
    where: { id, userId: clerkUserId },
    data: req.body,
  });

  if (!client.count) {
    return res.status(404).json({ message: "Client not found" });
  }

  res.json({ message: "Client updated" });
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
