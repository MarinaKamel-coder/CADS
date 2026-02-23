import prisma from '../src/prisma/prisma';
import { ClientStatus, DeadlinePriority, DeadlineStatus, DeadlineType, AlertPriority, AlertType } from '../src/generated/prisma/client';

async function main() {
  // 1. Récupérer l'utilisateur existant (Comptable)
 
  const CLERK_USER_ID = "user_37jVLqSQDzk2owhxpkSqG7bA8mV"; 

  const user = await prisma.user.findUnique({
    where: { id: CLERK_USER_ID }
  });

  if (!user) {
    console.error(`❌ Erreur: Utilisateur avec l'ID ${CLERK_USER_ID} non trouvé.`);
    console.log("Assure-toi de t'être connecté au moins une fois pour que Clerk crée l'user en base.");
    return;
  }

  console.log(`✅ Utilisateur trouvé : ${user.firstName} ${user.lastName}`);


  // 2. Liste des clients de test
  const clientsData = [
    { firstName: "Michel", lastName: "Dupont", email: "michel.dupont@gmail.com", nas: "111-222-333", address: "123 Rue Sherbrooke, Montréal" },
    { firstName: "Marie", lastName: "Lavoie", email: "marie@lavoie.ca", nas: "444-555-666", address: "456 Boul. Laurier, Québec" },
    { firstName: "Services", lastName: "Innovatech", email: "contact@innova.io", nas: "777-888-999", address: "789 Rue Saint-Paul, Montréal" },
    { firstName: "Luc", lastName: "Bouchard", email: "luc.b@outlook.com", nas: "123-123-123", address: "12 Avenue du Palais, Gatineau" },
    { firstName: "Sarah", lastName: "Connor", email: "s.connor@cyber.com", nas: "999-000-111", address: "555 Rue du Futur, Laval" },
  ];

  console.log(`🚀 Insertion de ${clientsData.length} clients et leurs obligations...`);

  for (const c of clientsData) {
    const client = await prisma.client.create({
      data: {
        firstName: c.firstName,
        lastName: c.lastName,
        email: c.email,
        phone: "514-555-0000",
        nasNumber: c.nas,
        address: c.address,
        userId: user.id,
        status: ClientStatus.ACTIVE,
      }
    });
    

    await prisma.alert.createMany({
      data: [
        {
          title: "Échéance dépassée",
          message: `La déclaration TPS/TVQ pour ${client.firstName} est en retard.`,
          priority: AlertPriority.HIGH,
          type: AlertType.DEADLINE,
          userId: user.id,
          clientId: client.id, // Liaison cruciale pour le badge !
          read: false
        },
        {
          title: "Document reçu",
          message: `Nouveau document fiscal reçu pour le dossier ${client.lastName}.`,
          priority: AlertPriority.LOW,
          type: AlertType.DOCUMENT,
          userId: user.id,
          clientId: client.id,
          read: true // Une déjà lue pour tester tes filtres
        }
      ]
    });

    // 3. Générer des obligations pour chaque client
    const deadlines = [
      {
        title: "Taxes de vente (TPS/TVQ)",
        description: "Déclaration et paiement du trimestre en cours.",
        dueDate: new Date("2026-02-15"), // En retard (pour tester le rouge)
        priority: DeadlinePriority.HIGH,
        type: DeadlineType.PROVINCIAL,
        status: DeadlineStatus.PENDING
      },
      {
        title: "Impôt sur les sociétés",
        description: "Soumission annuelle des résultats financiers.",
        dueDate: new Date("2026-03-31"),
        priority: DeadlinePriority.MEDIUM,
        type: DeadlineType.FEDERAL,
        status: DeadlineStatus.PENDING
      },
      {
        title: "Taxe Foncière",
        description: "Paiement du compte de taxes municipales.",
        dueDate: new Date("2026-04-10"),
        priority: DeadlinePriority.LOW,
        type: DeadlineType.MUNICIPAL,
        status: DeadlineStatus.COMPLETED // Déjà complété (pour tester le grisé)
      }
    ];

    for (const d of deadlines) {
      await prisma.deadline.create({
        data: {
          ...d,
          clientId: client.id,
          userId: user.id
        }
      });
    }
  }

  console.log("✨ Seed terminé ! Tes tableaux de bord sont maintenant remplis.");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });