import express from 'express';
import { addCredentials, getUserCredentials, getCredentialById, updateCredentials, deleteCredentials } from '../controllers/credentialsController';
import { getUsers, getUserById, addUser, updateUser, deleteUser } from '../controllers/usersController';
import { addPhoneNumber, getPhoneNumbers } from '../controllers/phoneNumbersController';

const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Credentials
 *   description: Gestión de credenciales de usuario
 */

/**
 * @swagger
 * /api/credentials:
 *   post:
 *     summary: Crea una nueva credencial
 *     tags: [Credentials]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               account_sid:
 *                 type: string
 *               auth_token:
 *                 type: string
 *     responses:
 *       201:
 *         description: Credencial creada exitosamente
 *       400:
 *         description: Datos inválidos
 */
router.route('/credentials').post(addCredentials);

/**
 * @swagger
 * /api/credentials:
 *   get:
 *     summary: Obtiene todas las credenciales del usuario
 *     tags: [Credentials]
 *     responses:
 *       200:
 *         description: Lista de credenciales obtenida correctamente
 *       500:
 *         description: Error en el servidor
 */
router.route('/credentials').get(getUserCredentials);

/**
 * @swagger
 * /api/credentials/{id}:
 *   get:
 *     summary: Obtiene una credencial específica por ID
 *     tags: [Credentials]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID de la credencial
 *     responses:
 *       200:
 *         description: Credencial obtenida correctamente
 *       404:
 *         description: Credencial no encontrada
 */
router.route('/credentials/:id').get(getCredentialById);

/**
 * @swagger
 * /api/credentials/{id}:
 *   put:
 *     summary: Actualiza una credencial por ID
 *     tags: [Credentials]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID de la credencial a actualizar
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               username:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       200:
 *         description: Credencial actualizada correctamente
 *       400:
 *         description: Datos inválidos
 *       404:
 *         description: Credencial no encontrada
 */
router.route('/credentials/:id').put(updateCredentials);

/**
 * @swagger
 * /api/credentials/{id}:
 *   delete:
 *     summary: Elimina una credencial por ID
 *     tags: [Credentials]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID de la credencial a eliminar
 *     responses:
 *       200:
 *         description: Credencial eliminada correctamente
 *       404:
 *         description: Credencial no encontrada
 */
router.route('/credentials/:id').delete(deleteCredentials);

/**
 * @swagger
 * tags:
 *   name: Users
 *   description: Gestión de usuarios
 */

/**
 * @swagger
 * /api/users:
 *   get:
 *     summary: Obtiene todos los usuarios
 *     tags: [Users]
 *     responses:
 *       200:
 *         description: Lista de usuarios obtenida correctamente
 */
router.route('/users').get(getUsers);

/**
 * @swagger
 * /api/users:
 *   post:
 *     summary: Crea un nuevo usuario
 *     tags: [Users]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               email:
 *                 type: string
 *     responses:
 *       201:
 *         description: Usuario creado exitosamente
 *       400:
 *         description: Datos inválidos
 */
router.route('/users').post(addUser);

/**
 * @swagger
 * /api/users/{id}:
 *   get:
 *     summary: Obtiene un usuario específico por ID
 *     tags: [Users]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID del usuario
 *     responses:
 *       200:
 *         description: Usuario encontrado
 *       404:
 *         description: Usuario no encontrado
 */
router.route('/users/:id').get(getUserById);

/**
 * @swagger
 * /api/users/{id}:
 *   put:
 *     summary: Actualiza un usuario por ID
 *     tags: [Users]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID del usuario a actualizar
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               email:
 *                 type: string
 *     responses:
 *       200:
 *         description: Usuario actualizado correctamente
 *       400:
 *         description: Datos inválidos
 *       404:
 *         description: Usuario no encontrado
 */
router.route('/users/:id').put(updateUser);

/**
 * @swagger
 * /api/users/{id}:
 *   delete:
 *     summary: Elimina un usuario por ID
 *     tags: [Users]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID del usuario a eliminar
 *     responses:
 *       200:
 *         description: Usuario eliminado correctamente
 *       404:
 *         description: Usuario no encontrado
 */
router.route('/users/:id').delete(deleteUser);

/**
 * @swagger
 * tags:
 *   name: Phone Numbers
 *   description: Gestión de números de teléfono
 */

/**
 * @swagger
 * /api/phone-numbers:
 *   get:
 *     summary: Obtiene todos los números de teléfono registrados
 *     tags: [Phone Numbers]
 *     responses:
 *       200:
 *         description: Lista de números de teléfono obtenida correctamente
 */
router.route('/phone-numbers').get(getPhoneNumbers);

/**
 * @swagger
 * /api/phone-numbers:
 *   post:
 *     summary: Registra un nuevo número de teléfono
 *     tags: [Phone Numbers]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               userId:
 *                 type: string
 *               phoneNumber:
 *                 type: string
 *     responses:
 *       201:
 *         description: Número de teléfono registrado exitosamente
 *       400:
 *         description: Datos inválidos
 */
router.route('/phone-numbers').post(addPhoneNumber);

export default router;
