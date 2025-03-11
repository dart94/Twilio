import { Request, Response, RequestHandler } from 'express';
import CampaignModel, { Campaign } from '../models/Campaign';

export const addCampaign: RequestHandler = async (req: Request, res: Response): Promise<void> => {
  try {
    const { name, description, credential_sheet_id, credential_template_id, sub_account_id } = req.body;
    const newCampaign: Campaign = {
      name,
      description,
      credential_sheet_id,
      credential_template_id,
      sub_account_id
    };
    const campaignId = await CampaignModel.create(newCampaign);
    res.status(201).json({
      success: true,
      message: 'Campaña creada correctamente',
      data: { id: campaignId, ...newCampaign }
    });
  } catch (error) {
    console.error('Error al crear campaña:', error);
    res.status(500).json({ success: false, error: (error as Error).message });
  }
};

export const getCampaigns: RequestHandler = async (req: Request, res: Response): Promise<void> => {
  try {
    const filter = req.query;
    const campaigns = await CampaignModel.findAll(filter as Partial<Campaign>);
    res.status(200).json({ success: true, data: campaigns });
  } catch (error) {
    console.error('Error al obtener campañas:', error);
    res.status(500).json({ success: false, error: (error as Error).message });
  }
};

export const getCampaignById: RequestHandler = async (req: Request, res: Response): Promise<void> => {
  try {
    const id = parseInt(req.params.id);
    const campaign = await CampaignModel.findById(id);
    if (!campaign) {
      res.status(404).json({ success: false, message: 'Campaña no encontrada' });
      return;
    }
    res.status(200).json({ success: true, data: campaign });
  } catch (error) {
    console.error('Error al obtener campaña por ID:', error);
    res.status(500).json({ success: false, error: (error as Error).message });
  }
};

export const updateCampaign: RequestHandler = async (req: Request, res: Response): Promise<void> => {
  try {
    const id = parseInt(req.params.id);
    const { name, description, credential_sheet_id, credential_template_id, sub_account_id } = req.body;
    const campaign: Campaign = { name, description, credential_sheet_id, credential_template_id, sub_account_id };
    const updated = await CampaignModel.update(id, campaign);
    if (!updated) {
      res.status(404).json({ success: false, message: 'Campaña no encontrada o no se pudo actualizar' });
      return;
    }
    res.status(200).json({ success: true, message: 'Campaña actualizada correctamente' });
  } catch (error) {
    console.error('Error al actualizar campaña:', error);
    res.status(500).json({ success: false, error: (error as Error).message });
  }
};

export const deleteCampaign: RequestHandler = async (req: Request, res: Response): Promise<void> => {
  try {
    const id = parseInt(req.params.id);
    const deleted = await CampaignModel.remove(id);
    if (!deleted) {
      res.status(404).json({ success: false, message: 'Campaña no encontrada o no se pudo eliminar' });
      return;
    }
    res.status(200).json({ success: true, message: 'Campaña eliminada correctamente' });
  } catch (error) {
    console.error('Error al eliminar campaña:', error);
    res.status(500).json({ success: false, error: (error as Error).message });
  }
};

export default {
  addCampaign,
  getCampaigns,
  getCampaignById,
  updateCampaign,
  deleteCampaign,
};
