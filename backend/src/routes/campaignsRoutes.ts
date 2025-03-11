import express from 'express';
import { addCampaign, getCampaigns, getCampaignById, updateCampaign, deleteCampaign } from '../controllers/campaignsController';
import { authenticate } from '../middlewares/authMiddleware';

const router = express.Router();

router.route('/')
  .post(authenticate, addCampaign)
  .get(authenticate, getCampaigns);

router.route('/:id')
  .get(authenticate, getCampaignById)
  .put(authenticate, updateCampaign)
  .delete(authenticate, deleteCampaign);

export default router;
