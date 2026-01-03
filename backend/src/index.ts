import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';

import clientRoutes from './routes/client.routes';
import deadlineRoutes from './routes/deadline.routes';
import documentRoutes from './routes/document.routes';
import { clerkAuth, requireAuth } from './middlewares/clerk.middleware';
import { syncUser } from "./middlewares/syncUser.middleware";

dotenv.config();
const app = express();
app.use(cors());
app.use(express.json());

// Clerk middleware global
app.use(clerkAuth);

// Sync user DB
app.use(syncUser);

// Routes protégées par Clerk
app.use('/api/clients', requireAuth, clientRoutes);
app.use('/api/deadlines', requireAuth, deadlineRoutes);
app.use('/api/documents', requireAuth, documentRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`✅ CADS backend running on port ${PORT}`));
