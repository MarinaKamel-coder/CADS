import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

// Import des routes
import clientRoutes from './routes/client.routes.js';
import deadlineRoutes from './routes/deadline.routes.js';
import documentRoutes from './routes/document.routes.js';
import alertRoutes from "./routes/alert.routes.js";

// Import des middlewares
import { clerkAuth, requireAuth } from './middlewares/clerk.middleware.js';
import { syncUser } from "./middlewares/syncUser.middleware.js";

if (process.env.NODE_ENV !== 'production') {
  dotenv.config();
}
const app = express();

// Configuration CORS unique et solide
const corsOptions = {
  origin: ["https://cads-murex.vercel.app", "http://localhost:5173"],
  credentials: true,
  methods: ["GET", "POST", "PUT", "DELETE", "PATCH", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"]
};

app.use(cors(corsOptions));

// 2. Middleware spécial Preflight (À placer AVANT Clerk et les routes)
app.use((req, res, next) => {
  // Si c'est une requête OPTIONS, on répond 200 OK immédiatement avec les bons headers
  if (req.method === 'OPTIONS') {
    res.header('Access-Control-Allow-Origin', 'https://cads-murex.vercel.app');
    res.header('Access-Control-Allow-Methods', 'GET,POST,PUT,DELETE,PATCH,OPTIONS');
    res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    res.header('Access-Control-Allow-Credentials', 'true');
    return res.sendStatus(200);
  }
  next();
});

app.use(express.json());

const uploadDir = path.join(process.cwd(), 'uploads'); 
if (!fs.existsSync(uploadDir)){
    fs.mkdirSync(uploadDir, { recursive: true });
}

app.use('/uploads', express.static(uploadDir));
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