import type { Request, Response } from 'express';
import prisma from '../prisma/prisma';

export const createDeadline = async (req: Request, res: Response) => {
  const deadline = await prisma.deadline.create({
    data: {
      ...req.body,
      dueDate: new Date(req.body.dueDate)
    }
  });
  res.status(201).json({ deadline });
};

export const getUpcomingDeadlines = async (_: Request, res: Response) => {
  const deadlines = await prisma.deadline.findMany({
    where: { status: 'PENDING', dueDate: { gte: new Date() } },
    orderBy: { dueDate: 'asc' }
  });
  res.json({ deadlines });
};
