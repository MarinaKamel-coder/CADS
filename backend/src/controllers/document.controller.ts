import type { Request, Response } from 'express';
import prisma from '../prisma/prisma';

export const uploadDocument = async (req: Request, res: Response) => {
  const document = await prisma.document.create({
    data: req.body
  });
  res.status(201).json({ document });
};

export const getClientDocuments = async (req: Request, res: Response) => {
  const { clientId } = req.params;
  if (!clientId) {
    res.status(400).json({ error: 'clientId is required' });
    return;
  }
  const documents = await prisma.document.findMany({
    where: { clientId }
  });
  res.json({ documents });
};
