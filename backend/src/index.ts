import { config } from 'dotenv';
config();

import express from 'express';
import authRoutes from './routes/authRoutes';
import templatesRoutes from './routes/templatesRoutes';
import { authenticate } from './middlewares/authMiddleware';

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

// Se montan todas las rutas definidas en authRoutes bajo /auth
app.use('/auth', authRoutes);


// Se montan todas las rutas definidas en templatesRoutes bajo /api
app.use('/api', authenticate, templatesRoutes);

app.listen(PORT, () => {
  console.log(`🚀 Servidor corriendo en http://localhost:${PORT}`);
});
