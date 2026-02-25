import prisma from '../src/prisma/prisma';
import { ClientStatus, DeadlinePriority, DeadlineStatus, DeadlineType, AlertPriority, AlertType } from '../src/generated/prisma/client';

async function main() {
  const CLERK_USER_ID = "user_37jVLqSQDzk2owhxpkSqG7bA8mV"; 

  const user = await prisma.user.findUnique({
    where: { id: CLERK_USER_ID }
  });

  if (!user) {
    console.error(`❌ Erreur: Utilisateur avec l'ID ${CLERK_USER_ID} non trouvé.`);
    return;
  }

  console.log(`✅ Utilisateur trouvé : ${user.firstName} ${user.lastName}. Génération de 50 clients...`);

  // Listes pour génération aléatoire
  const firstNames = ["Jean", "Sophie", "Pierre", "Lucie", "Marc", "Julie", "Antoine", "Élodie", "Mathieu", "Chloé", "Robert", "Martine", "Paul", "Isabelle", "Jacques", "Sylvie"];
  const lastNames = ["Tremblay", "Gagnon", "Roy", "Côté", "Bouchard", "Gauthier", "Morin", "Lavoie", "Fortin", "Gagné", "Pelletier", "Belanger", "Levesque", "Sylvie"];
  const cities = ["Montréal", "Québec", "Laval", "Gatineau", "Longueuil", "Sherbrooke", "Lévis"];

  for (let i = 1; i <= 50; i++) {
    // On ajoute "|| ''" ou on utilise "!" pour garantir que ce n'est pas undefined
    const fName = firstNames[Math.floor(Math.random() * firstNames.length)]!;
    const lName = lastNames[Math.floor(Math.random() * lastNames.length)]!;
    const city = cities[Math.floor(Math.random() * cities.length)]!;

    // 1. Création du Client
    const client = await prisma.client.create({
      data: {
        firstName: fName,
        lastName: `${lName} Inc.`,
        email: `${fName.toLowerCase()}.${lName.toLowerCase()}${i}@exemple.ca`,
        phone: `514-555-${1000 + i}`,
        nasNumber: `${100 + i}-${200 + i}-${300 + i}`,
        address: `${i * 12} Rue Principale, ${city}`,
        userId: user.id,
        status: i % 10 === 0 ? ClientStatus.INACTIVE : ClientStatus.ACTIVE, // 1 sur 10 est inactif
      }
    });

    // 2. Création d'Alertes Aléatoires pour ce client
    await prisma.alert.createMany({
      data: [
        {
          title: "Vérification annuelle",
          message: `Dossier de ${client.lastName} à réviser.`,
          priority: i % 3 === 0 ? AlertPriority.HIGH : AlertPriority.LOW,
          type: AlertType.SYSTEM,
          userId: user.id,
          clientId: client.id,
          read: i % 2 === 0
        }
      ]
    });

    // 3. Création de Deadlines (Obligations)
    const randomDays = Math.floor(Math.random() * 60) - 20; // Entre -20 et +40 jours
    const dueDate = new Date();
    dueDate.setDate(dueDate.getDate() + randomDays);

    await prisma.deadline.create({
      data: {
        title: i % 2 === 0 ? "TPS/TVQ Trimestrielle" : "Impôt des sociétés",
        description: `Suivi fiscal standard pour le client ${client.firstName}.`,
        dueDate: dueDate,
        priority: randomDays < 0 ? DeadlinePriority.HIGH : DeadlinePriority.MEDIUM,
        type: i % 3 === 0 ? DeadlineType.PROVINCIAL : DeadlineType.FEDERAL,
        status: randomDays < 0 ? DeadlineStatus.PENDING : (i % 5 === 0 ? DeadlineStatus.COMPLETED : DeadlineStatus.PENDING),
        clientId: client.id,
        userId: user.id
      }
    });
  }

  console.log("✨ Succès ! 50 clients et leurs données ont été injectés.");
}

main().catch((e) => { console.error(e); process.exit(1); }).finally(async () => { await prisma.$disconnect(); });