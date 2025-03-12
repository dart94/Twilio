import express from 'express';
import credentialsRoutes from './credentialsRoutes';
import phoneNumbersRoutes from './phoneNumbersRoutes';
import sheetsRoutes from './sheetsRoutes';
import subaccountsRoutes from './subAccountsRoutes';
import userRoutes from './userRoutes';
import campaignsRoutes from './campaignsRoutes';

const router = express.Router();

// Agrupar subrutas protegidas
router.use('/credentials', credentialsRoutes);
router.use('/phone-numbers', phoneNumbersRoutes);
router.use('/sheets', sheetsRoutes);
router.use('/users', userRoutes);
router.use('/subaccounts', subaccountsRoutes);
router.use('/campaigns', campaignsRoutes);

export default router;
