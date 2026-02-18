import { Router } from 'express';
import { clerkAuth } from '../middlewares/clerk.middleware.js';
import { upload } from '../middlewares/upload.middleware.js';
import { 
  getDocuments, 
  getDocumentsByClientId, 
  uploadDocument, 
  updateDocumentStatus, 
  deleteDocument,
  downloadDocument 
} from '../controllers/document.controller.js';

const router = Router();
router.use(clerkAuth);

router.get("/", getDocuments);
router.get("/client/:clientId", getDocumentsByClientId);
router.get("/download/:id", downloadDocument); 

router.post('/upload', upload.single('file'), uploadDocument);
router.patch("/:id/status", updateDocumentStatus);
router.delete("/:id", deleteDocument);

export default router;