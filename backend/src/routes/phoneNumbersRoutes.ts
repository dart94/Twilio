// src/routes/phoneNumbersRoutes.ts
import express from 'express';
import { addPhoneNumber, getPhoneNumbers } from '../controllers/phoneNumbersController';

const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Phone Numbers
 *   description: Gestión de números de teléfono
 */

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
router.post('/', addPhoneNumber);

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
router.get('/', getPhoneNumbers);

export default router;
