import { config } from 'dotenv';
config();

import express from 'express';
import authRoutes from './routes/authRoutes';
import templatesRoutes from './routes/templatesRoutes';
import apiRoutes from './routes/apiRoutes'; // Nuevo archivo para rutas protegidas
import { authenticate } from './middlewares/authMiddleware';
import { swaggerUi, swaggerSpec } from './swagger';

const app = express();
const PORT = process.env.PORT || 3000;
const cors = require('cors');

app.use(express.json());
app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));
app.use(cors({}));

// Rutas públicas
app.use('/auth', authRoutes);
app.use('/api/templates', templatesRoutes); // Plantillas de Twilio sin autenticación

// Rutas protegidas (requieren autenticación)
app.use('/api', authenticate, apiRoutes); // Ahora todas las rutas protegidas están en apiRoutes.ts

app.listen(PORT, () => {
  console.log(`🚀 Servidor corriendo en http://localhost:${PORT}`);
});
