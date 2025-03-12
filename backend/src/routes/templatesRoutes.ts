import express from 'express';
import { getTemplates, getTemplateById } from '../controllers/templatesController'; // Verifica la ruta correcta

const router = express.Router();

router.get('/', getTemplates); 
router.get('/:id', getTemplateById); 

export default router;