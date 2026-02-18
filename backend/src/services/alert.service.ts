import prisma from "../prisma/prisma";

export const checkUpcomingDeadlines = async () => {
  const thirtyDaysFromNow = new Date();
  thirtyDaysFromNow.setDate(thirtyDaysFromNow.getDate() + 30);

  const urgentDeadlines = await prisma.deadline.findMany({
    where: {
      dueDate: { lte: thirtyDaysFromNow },
      status: "PENDING",
    },
  });

  for (const deadline of urgentDeadlines) {
    await prisma.alert.upsert({
      where: { id: `alert-${deadline.id}` }, // Évite les doublons
      update: {},
      create: {
        type: "DEADLINE",
        title: "Échéance proche",
        message: `L'échéance "${deadline.title}" arrive à terme bientôt.`,
        priority: "HIGH",
        userId: deadline.userId,
      },
    });
  }
};