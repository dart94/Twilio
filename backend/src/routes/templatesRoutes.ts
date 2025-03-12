import express from 'express';
import { getTemplates, getTemplateById } from '../controllers/templatesController'; // Verifica la ruta correcta

const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Templates
 *   description: Gestión de plantillas de mensajes
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     Template:
 *       type: object
 *       properties:
 *         friendly_name:
 *           type: string
 *           description: Nombre amigable del template
 *         body:
 *           type: string
 *           description: Contenido del mensaje con variables dinámicas
 *         variables:
 *           type: object
 *           additionalProperties:
 *             type: string
 *           description: Variables que se reemplazarán en el mensaje
 *       example:
 *         friendly_name: "ret_5"
 *         body: "Saludos. *Han pasado {{1}} días desde el último mantenimiento de tu {{2}}* con número de serie {{3}}.\n\nNos preocupamos por la condición de tu {{4}}, por lo que te ofrecemos una oferta especial de *Servicio de Revisión por solo ${{5}}.00 pesos* que incluye *Cambio de Aceite, Filtro de Aceite, Reemplazo de la Arandela del Cárter, *Lavado del automóvil* y una inspección de 27 puntos de seguridad.\n\n_¡Reserva tu cita de mantenimiento en línea de manera sencilla y rápida! O si lo prefieres, comunícate directamente con uno de nuestros representantes!_"
 *         variables:
 *           "1": "152"
 *           "2": "Sentra"
 *           "3": "4778899"
 *           "4": "Sentra"
 *           "5": "1899"
 */

/**
 * @swagger
 * /api/templates:
 *   get:
 *     summary: Obtiene todas las plantillas
 *     tags: [Templates]
 *     responses:
 *       200:
 *         description: Lista de plantillas obtenida correctamente
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Template'
 */
router.get('/', getTemplates);

/**
 * @swagger
 * /api/templates/{id}:
 *   get:
 *     summary: Obtiene una plantilla específica por ID
 *     tags: [Templates]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID del template
 *     responses:
 *       200:
 *         description: Plantilla encontrada
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Template'
 *       404:
 *         description: Plantilla no encontrada
 */
router.get('/:id', getTemplateById);

export default router;
