import express from 'express';
import { addCredentials, getUserCredentials, getCredentialById, updateCredentials, deleteCredentials } from '../controllers/credentialsController';
import { getUsers, getUserById, addUser, updateUser, deleteUser } from '../controllers/usersController';
import { addPhoneNumber, getPhoneNumbers } from '../controllers/phoneNumbersController';

const router = express.Router();

// Rutas para credenciales (se accede en /api/credentials)
router.route('/credentials')
  .post(addCredentials)
  .get(getUserCredentials);

router.route('/credentials/:id')
  .get(getCredentialById)
  .put(updateCredentials)
  .delete(deleteCredentials);

// Rutas para usuarios (se accede en /api/users)
router.route('/users')
  .get(getUsers)
  .post(addUser);

router.route('/users/:id')
  .get(getUserById)
  .put(updateUser)
  .delete(deleteUser);

// Rutas para números de teléfono (se accede en /api/phone-numbers)
router.route('/phone-numbers')
  .post(addPhoneNumber)
  .get(getPhoneNumbers);

export default router;
