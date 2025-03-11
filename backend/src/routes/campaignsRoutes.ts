import express from 'express';
import { addCampaign, getCampaigns, getCampaignById, updateCampaign, deleteCampaign } from '../controllers/campaignsController';
import { authenticate } from '../middlewares/authMiddleware';

const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Campaigns
 *   description: Gestión de campañas
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     Campaign:
 *       type: object
 *       properties:
 *         id:
 *           type: number
 *           description: ID único de la campaña
 *         name:
 *           type: string
 *           description: Nombre de la campaña
 *         description:
 *           type: string
 *           description: Descripción de la campaña
 *         created_at:
 *           type: string
 *           format: date-time
 *           description: Fecha de creación de la campaña
 *         updated_at:
 *           type: string
 *           format: date-time
 *           description: Fecha de última actualización de la campaña
 *         credential_sheet_id:
 *           type: number
 *           description: ID de la credencial de la hoja asociada
 *         credential_template_id:
 *           type: number
 *           description: ID de la credencial de la plantilla asociada
 *         sub_account_id:
 *           type: number
 *           description: ID de la subcuenta a la que pertenece la campaña
 */

/**
 * @swagger
 * /api/campaigns:
 *   post:
 *     summary: Crea una nueva campaña
 *     tags: [Campaigns]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Campaign'
 *     responses:
 *       201:
 *         description: Campaña creada exitosamente
 *       400:
 *         description: Datos inválidos
 */
router.route('/')
  .post(authenticate, addCampaign)

/**
 * @swagger
 * /api/campaigns:
 *   get:
 *     summary: Obtiene todas las campañas
 *     tags: [Campaigns]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Lista de campañas obtenida correctamente
 */
  .get(authenticate, getCampaigns);

/**
 * @swagger
 * /api/campaigns/{id}:
 *   get:
 *     summary: Obtiene una campaña específica por ID
 *     tags: [Campaigns]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: number
 *         description: ID de la campaña
 *     responses:
 *       200:
 *         description: Campaña encontrada
 *       404:
 *         description: Campaña no encontrada
 */
router.route('/:id')
  .get(authenticate, getCampaignById)

/**
 * @swagger
 * /api/campaigns/{id}:
 *   put:
 *     summary: Actualiza una campaña por ID
 *     tags: [Campaigns]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: number
 *         description: ID de la campaña a actualizar
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Campaign'
 *     responses:
 *       200:
 *         description: Campaña actualizada correctamente
 *       400:
 *         description: Datos inválidos
 *       404:
 *         description: Campaña no encontrada
 */
  .put(authenticate, updateCampaign)

/**
 * @swagger
 * /api/campaigns/{id}:
 *   delete:
 *     summary: Elimina una campaña por ID
 *     tags: [Campaigns]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: number
 *         description: ID de la campaña a eliminar
 *     responses:
 *       200:
 *         description: Campaña eliminada correctamente
 *       404:
 *         description: Campaña no encontrada
 */
  .delete(authenticate, deleteCampaign);

export default router;
