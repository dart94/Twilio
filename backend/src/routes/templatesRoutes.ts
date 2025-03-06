import express from 'express';
import { getTemplates, getTemplateById } from '../controllers/templatesController';

const router = express.Router();

router.get('/templates', getTemplates);
router.get('/templates/:id', getTemplateById);

export default router;
