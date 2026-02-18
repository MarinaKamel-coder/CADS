import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import fs from 'fs';
import path from 'path';

// Import des routes
import clientRoutes from './routes/client.routes';
import deadlineRoutes from './routes/deadline.routes';
import documentRoutes from './routes/document.routes';
import alertRoutes from "./routes/alert.routes";

// Import des middlewares
import { clerkAuth, requireAuth } from './middlewares/clerk.middleware';
import { syncUser } from "./middlewares/syncUser.middleware";


dotenv.config();

const app = express();

const uploadDir = './uploads';
if (!fs.existsSync(uploadDir)){
    fs.mkdirSync(uploadDir);
}

// 1. Middlewares de base
app.use(cors({
  origin: "https://cads-9vg7v67za-marina-kamels-projects.vercel.app",
  credentials: true
}));
app.use(express.json());

app.use('/uploads', express.static(path.join(__dirname, '../uploads')));
// 2. Authentification globale (Clerk)
// Ce middleware intercepte le jeton JWT et remplit req.auth
app.use(clerkAuth);

// 3. Synchronisation utilisateur
// S'assure que l'utilisateur Clerk existe dans notre DB Prisma
app.use(syncUser);

// 4. Routes de l'API
// On applique requireAuth ici pour protéger toutes les ressources
app.use('/api/clients', requireAuth, clientRoutes);
app.use('/api/deadlines', requireAuth, deadlineRoutes);
app.use('/api/documents', requireAuth, documentRoutes);
app.use("/api/alerts", requireAuth, alertRoutes);

// 5. Gestion des erreurs globale (Optionnel mais recommandé)
app.use((err: any, req: express.Request, res: express.Response, next: express.NextFunction) => {
  console.error(err.stack);
  res.status(500).json({ message: "Une erreur interne est survenue" });
});

export default app;