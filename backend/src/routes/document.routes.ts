import { Router } from 'express';
import { clerkAuth } from '../middlewares/clerk.middleware';
import { upload } from '../middlewares/upload.middleware';
import { 
  getDocuments, 
  getDocumentsByClientId, 
  uploadDocument, 
  updateDocumentStatus, 
  deleteDocument,
  downloadDocument // 1. Ajoutez l'import ici
} from '../controllers/document.controller';

const router = Router();
router.use(clerkAuth);

router.get("/", getDocuments);
router.get("/client/:clientId", getDocumentsByClientId);
// 2. Ajoutez cette ligne pour activer le téléchargement/ouverture
router.get("/download/:id", downloadDocument); 

router.post('/upload', upload.single('file'), uploadDocument);
router.patch("/:id/status", updateDocumentStatus);
router.delete("/:id", deleteDocument);

export default router;