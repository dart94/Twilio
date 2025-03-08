import express from 'express';
import { 
  addCredentials, 
  getUserCredentials, 
  getCredentialById,
  updateCredentials,
  deleteCredentials 
} from '../controllers/credentialsController';

const router = express.Router();

// Rutas para gestionar las credenciales
router.post('/', addCredentials);
router.get('/', getUserCredentials);
router.get('/:id', getCredentialById);
router.put('/:id', updateCredentials);
router.delete('/:id', deleteCredentials);

export default router;
