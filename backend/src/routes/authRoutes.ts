// src/routes/authRoutes.ts
import express from 'express';
import { login } from '../controllers/authController';

const router = express.Router();

// Endpoint de login (sin autenticación previa)
router.post('/login', login);

export default router;
