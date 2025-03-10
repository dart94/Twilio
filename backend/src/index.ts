import { config } from 'dotenv';
config();

import express from 'express';
import authRoutes from './routes/authRoutes';
import templatesRoutes from './routes/templatesRoutes';
import { authenticate } from './middlewares/authMiddleware';
import { swaggerUi, swaggerSpec } from './swagger';

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec))

// Rutas públicas para autenticación
app.use('/auth', authRoutes);

// Rutas protegidas: todos los endpoints definidos en templatesRoutes se montan en /api
app.use('/api', authenticate, templatesRoutes);

app.listen(PORT, () => {
  console.log(`🚀 Servidor corriendo en http://localhost:${PORT}`);
});
