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
import { clerkAuth, requireAuth } from './middlewares/clerk.middleware.js';
import { syncUser } from "./middlewares/syncUser.middleware.js";
if (process.env.NODE_ENV !== 'production') {
    dotenv.config();
}
const app = express();
// Configuration CORS flexible et robuste
const corsOptions = {
    origin: (origin, callback) => {
        const allowedOrigins = [
            "https://cads-murex.vercel.app",
            "https://cads-backend.vercel.app",
            "https://cads-ieog.vercel.app",
            "http://localhost:5173",
            "http://localhost:3000",
            "http://127.0.0.1:5173",
            "http://127.0.0.1:3000"
        ];
        // En développement, accepter toutes les requêtes sans origin (mobile, etc)
        if (!origin || allowedOrigins.includes(origin)) {
            callback(null, true);
        }
        else {
            callback(new Error("Not allowed by CORS"));
        }
    },
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE", "PATCH", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
    optionsSuccessStatus: 200
};
app.use(cors(corsOptions));
app.use(express.json());
const uploadDir = path.join(process.cwd(), 'uploads');
if (!fs.existsSync(uploadDir)) {
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
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ message: "Une erreur interne est survenue" });
});
export default app;
//# sourceMappingURL=app.js.map