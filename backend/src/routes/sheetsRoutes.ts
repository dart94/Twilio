import express from 'express';
import { addSheet, getSheets } from '../controllers/sheetsController';
import { authenticate } from '../middlewares/authMiddleware';

const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Sheets
 *   description: Endpoints para gestionar Sheets
 */

/**
 * @swagger
 * /sheets:
 *   post:
 *     summary: Crea una nueva Sheet
 *     tags: [Sheets]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               sheet_id:
 *                 type: string
 *                 example: "12345"
 *               sheet_sheet:
 *                 type: string
 *                 example: "Hoja1"
 *               sheet_range:
 *                 type: string
 *                 example: "A1:Z100"
 *               field_blacklist:
 *                 type: array
 *                 items:
 *                   type: string
 *                 example: "Lista Negra"
 *               field_status:
 *                 type: string
 *                 example: "Whatsapp"
 *               field_contact:
 *                 type: string
 *                 example: "Celular"
 *               campaign_id:
 *                 type: string
 *                 example: "camp_001"
 *     responses:
 *       201:
 *         description: Sheet creada correctamente
 *       500:
 *         description: Error interno del servidor
 */
router.post('/', authenticate, addSheet);

/**
 * @swagger
 * /sheets:
 *   get:
 *     summary: Obtiene todas las Sheets
 *     tags: [Sheets]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: sheet_id
 *         schema:
 *           type: string
 *         description: Filtrar por ID de Sheet
 *     responses:
 *       200:
 *         description: Lista de Sheets obtenida correctamente
 *       500:
 *         description: Error interno del servidor
 */
router.get('/', authenticate, getSheets);

export default router;
