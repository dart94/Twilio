import { config } from 'dotenv';
config();

import express from 'express';
import templatesRoutes from './routes/templatesRoutes';

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use('/api', templatesRoutes);

app.listen(PORT, () => {
  console.log(`🚀 Servidor corriendo en http://localhost:${PORT}`);
});


console.log('TWILIO_ACCOUNT_SID:', process.env.TWILIO_ACCOUNT_SID);
console.log('TWILIO_AUTH_TOKEN:', process.env.TWILIO_AUTH_TOKEN);
console.log('TWILIO_PHONE_NUMBER:', process.env.TWILIO_PHONE_NUMBER);