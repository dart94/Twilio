import { config } from 'dotenv';
config();

import express from 'express';
import templatesRoutes from './routes/templatesRoutes';

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

// Se montan todas las rutas definidas en templatesRoutes bajo /api
app.use('/api', templatesRoutes);

app.listen(PORT, () => {
  console.log(`🚀 Servidor corriendo en http://localhost:${PORT}`);
});
