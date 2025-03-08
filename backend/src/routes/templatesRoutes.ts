import express from 'express';
import { addCredentials, getUserCredentials, getCredentialById, updateCredentials, deleteCredentials } from '../controllers/credentialsController';
import { getUsers, getUserById, addUser, updateUser, deleteUser } from '../controllers/usersController';

const router = express.Router();

// Rutas para gestionar las credenciales (se montan en /api)
router.post('/', addCredentials);
router.get('/', getUserCredentials);
router.get('/:id', getCredentialById);
router.put('/:id', updateCredentials);
router.delete('/:id', deleteCredentials);

// Rutas para gestionar los usuarios (se montan en /api/users)
router.get('/users', getUsers);
router.route('/users/:id')
  .get(getUserById)
  .put(updateUser)
  .delete(deleteUser);
router.route('/users')
  .post(addUser);

export default router;
