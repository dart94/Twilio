import express from 'express';
import { 
  addSubAccount, 
  getSubAccounts, 
  getSubAccountById, 
  updateSubAccount, 
  deleteSubAccount 
} from '../controllers/subaccountsController';
import { authenticate } from '../middlewares/authMiddleware';

const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Subaccounts
 *   description: Gestión de Subcuentas
 */

/**
 * @swagger
 * /api/subaccounts:
 *   post:
 *     summary: Crea una subcuenta
 *     tags: [Subaccounts]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               id:
 *                 type: number
 *               name:
 *                 type: string
 *               user_id:
 *                 type: number
 *     responses:
 *       201:
 *         description: Subcuenta creada exitosamente
 *       400:
 *         description: Datos inválidos
 */
router.route('/')
  .post(authenticate, addSubAccount)
  .get(authenticate, getSubAccounts);

/**
 * @swagger
 * /api/subaccounts/{id}:
 *   get:
 *     summary: Obtiene una subcuenta por ID
 *     tags: [Subaccounts]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: number
 *         description: ID de la subcuenta
 *     responses:
 *       200:
 *         description: Subcuenta encontrada
 *       404:
 *         description: Subcuenta no encontrada
 *   put:
 *     summary: Actualiza una subcuenta por ID
 *     tags: [Subaccounts]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: number
 *         description: ID de la subcuenta
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               user_id:
 *                 type: number
 *     responses:
 *       200:
 *         description: Subcuenta actualizada correctamente
 *       400:
 *         description: Datos inválidos
 *   delete:
 *     summary: Elimina una subcuenta por ID
 *     tags: [Subaccounts]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: number
 *         description: ID de la subcuenta
 *     responses:
 *       200:
 *         description: Subcuenta eliminada correctamente
 *       404:
 *         description: Subcuenta no encontrada
 */
router.route('/:id')
  .get(authenticate, getSubAccountById)
  .put(authenticate, updateSubAccount)
  .delete(authenticate, deleteSubAccount);

export default router;
