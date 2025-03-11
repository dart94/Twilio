import express from 'express';
import credentialsRoutes from './credentialsRoutes';
import phoneNumbersRoutes from './phoneNumbersRoutes';
import sheetsRoutes from './sheetsRoutes';
import subaccountsRoutes from './subAccountsRoutes';
import userRoutes from './userRoutes';
import campinRoutes from './campaignsRoutes';


const router = express.Router();

// Definir subrutas organizadas por recursos
router.use('/credentials', credentialsRoutes);
router.use('/phone-numbers', phoneNumbersRoutes);
router.use('/sheets', sheetsRoutes);
router.use('/users', userRoutes);
router.use ('/subaccounts',subaccountsRoutes )
router.use ('/campaigns',campinRoutes )



export default router;
