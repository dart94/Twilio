import { Request, Response } from 'express';
import { getContentTemplates, getTemplateDetails } from '../services/twilioTemplates';

export async function getTemplates(req: Request, res: Response) {
  try {
    const templates = await getContentTemplates();
    res.json(templates);
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener plantillas' });
  }
}

export async function getTemplateById(req: Request, res: Response) {
  try {
    const { id } = req.params;
    const template = await getTemplateDetails(id);
    res.json(template);
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener detalles de la plantilla' });
  }
}
