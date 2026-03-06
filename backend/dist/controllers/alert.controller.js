import prisma from "../prisma/prisma";
export const getAlerts = async (req, res) => {
    try {
        const clerkUserId = req.auth.userId;
        const alerts = await prisma.alert.findMany({
            where: { userId: clerkUserId },
            include: {
                client: {
                    select: {
                        firstName: true,
                        lastName: true,
                    }
                }
            },
            orderBy: [{ priority: 'desc' }, { createdAt: "desc" },]
        });
        res.json(alerts);
    }
    catch (error) {
        console.error("Erreur récup alertes:", error);
        res.status(500).json({ error: "Erreur serveur" });
    }
};
export const markAsRead = async (req, res) => {
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
export const clearAllAlerts = async (req, res) => {
    const clerkUserId = req.auth.userId;
    await prisma.alert.deleteMany({
        where: { userId: clerkUserId, read: true }
    });
    res.json({ message: "Alertes lues supprimées" });
};
//# sourceMappingURL=alert.controller.js.map