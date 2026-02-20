import type { Request, Response } from "express";
import prisma from "../prisma/prisma";
import path from 'path';
import fs from 'fs';

export const getDocuments = async (req: Request, res: Response) => {
  const clerkUserId = req.auth!.userId;
  const documents = await prisma.document.findMany({
    where: { userId: clerkUserId },
    include: { client: true },
  });
  res.json({ documents });
};

export const getDocumentsByClientId = async (req: Request, res: Response) => {
  const { clientId } = req.params;
  const clerkUserId = req.auth!.userId;
  
  if (!clientId) {
    return res.status(400).json({ message: "Client ID requis" });
  }

  const documents = await prisma.document.findMany({
    where: { 
      clientId: clientId,
      userId: clerkUserId 
    },
    orderBy: { uploadedAt: "desc" },
  });

  res.json({documents});
};
export const uploadDocument = async (req: Request, res: Response) => {
  try {
    const clerkUserId = req.auth!.userId;
    const { clientId, name } = req.body;
    const file = req.file;

    if (!file) {
      return res.status(400).json({ message: "Aucun fichier téléchargé" });
    }
    // Si tu utilises diskStorage, le binaire n'est pas dans req.file, il faut le lire :
    const fileBuffer = fs.readFileSync(file.path);

    const newDocument = await prisma.document.create({
      data: {
        name: name || file.originalname,
        type: file.mimetype,
        size: file.size,
        filePath: file.path, // Chemin local ou URL Cloud
        fileContent: fileBuffer,
        status: 'PENDING',
        clientId,
        userId: clerkUserId,
      },
    });

    res.status(201).json(newDocument);
  } catch (error) {
    console.error("ERREUR UPLOAD:", error);
    res.status(500).json({ message: "Erreur lors de l'enregistrement du document" });
  }
};

export const updateDocumentStatus = async (req: Request, res: Response) => {
  const { id } = req.params;
  const { status } = req.body;
  const clerkUserId = req.auth!.userId;

  if (!id) { return res.status(400).json({ message: "Document ID is required" }); }

  const document  = await prisma.document.updateMany({
    where: { 
      id, 
      userId: clerkUserId 
    },
    data: { status },
  });

  if (document.count === 0) return res.status(404).json({ message: "Non trouvé" });
  res.json({ message: "Statut mis à jour" });
};

export const downloadDocument = async (req: Request, res: Response) => {
  const { id } = req.params;
  const { action } = req.query; // On récupère l'action (view ou download)
  const clerkUserId = req.auth!.userId;

  if (!id) return res.status(400).json({ message: "ID requis" });

  const document = await prisma.document.findFirst({
    where: { id, userId: clerkUserId }
  });

  if (!document) return res.status(404).json({ message: "Document non trouvé" });

  // 1. Priorité au fichier binaire en base de données (Neon)
  if (document.fileContent) {
    res.setHeader('Content-Type', document.type || 'application/pdf');
    res.setHeader('Content-Disposition', `attachment; filename="${document.name}"`);
    return res.send(document.fileContent);
  }

  // 2. Si le binaire est vide (vieux docs), on tente le fichier local
  const filePath = path.resolve(document.filePath);

  if (fs.existsSync(filePath)) {
    if (action === 'download') {
      // Force le téléchargement avec le nom d'origine
      return res.download(filePath, document.name);
    } else {
      // Pour "Ouvrir" : on définit les headers pour une lecture dans le navigateur
      res.setHeader('Content-Type', document.type || 'application/pdf');
      res.setHeader('Content-Disposition', `inline; filename="${document.name}"`);
      return res.sendFile(filePath);
    }
  } else {
    res.status(404).json({ message: "Fichier physique introuvable sur le serveur" });
  }
};

export const deleteDocument = async (req: Request, res: Response) => {
  const { id } = req.params;
  const clerkUserId = req.auth!.userId;

  if (!id) return res.status(400).json({ message: "ID requis" });

  const document = await prisma.document.findFirst({
    where: { id, userId: clerkUserId },
  });

  if (!document) return res.status(404).json({ message: "Document non trouvé" });

  // Supprimer le fichier physique du serveur
  if (fs.existsSync(document.filePath)) {
    fs.unlinkSync(document.filePath);
  }

  await prisma.document.delete({ where: { id } });
  res.json({ message: "Document supprimé avec succès" });
};