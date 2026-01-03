import { Router } from 'express';
import { uploadDocument, getClientDocuments } from '../controllers/document.controller';

const router = Router();
router.post('/', uploadDocument);
router.get('/:clientId', getClientDocuments);

export default router;
