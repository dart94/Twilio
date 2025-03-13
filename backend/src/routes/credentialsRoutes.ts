import express from 'express';
import { addCredentials, getUserCredentials, getCredentialById, updateCredentials, deleteCredentials, getCredentials } from  '../controllers/credentialsController'

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
router.route('/').post(addCredentials);

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
router.route('/').get(getCredentials); 

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
 *               auth_token:
 *                 type: string
 * 
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




export default router;