// backend/src/controllers/templatesController.ts
import { Request, Response } from 'express';
import * as twilioService from '../services/twilioTemplates';

export const getTemplates = async (req: Request, res: Response) => {
  try {
    const credentialId = parseInt(req.params.credentialId);
    
    // Si el ID de credencial no es válido
    if (isNaN(credentialId)) {
      return res.status(400).json({ 
        success: false, 
        message: 'ID de credencial no válido' 
      });
    }
    
    // Usar las credenciales para obtener plantillas
    const templates = await twilioService.getContentTemplates(credentialId);
    
    res.status(200).json({ 
      success: true, 
      data: templates 
    });
  } catch (error) {
    console.error('Error al obtener plantillas:', error);
    
    // Si el error es específicamente que no se encontraron las credenciales
    if ((error as Error).message === 'Credenciales no encontradas') {
      return res.status(404).json({ 
        success: false, 
        message: 'Credencial no encontrada' 
      });
    }
    
    res.status(500).json({ 
      success: false, 
      message: 'Error al obtener plantillas',
      error: (error as Error).message
    });
  }
};

export const getTemplateDetail = async (req: Request, res: Response) => {
  try {
    const credentialId = parseInt(req.params.credentialId);
    const { templateSid } = req.params;
    
    // Si el ID de credencial no es válido
    if (isNaN(credentialId)) {
      return res.status(400).json({ 
        success: false, 
        message: 'ID de credencial no válido' 
      });
    }
    
    // Usar las credenciales para obtener detalles de la plantilla
    const templateDetails = await twilioService.getTemplateDetails(templateSid, credentialId);
    
    res.status(200).json({ 
      success: true, 
      data: templateDetails 
    });
  } catch (error) {
    console.error('Error al obtener detalles de la plantilla:', error);
    
    // Si el error es específicamente que no se encontraron las credenciales
    if ((error as Error).message === 'Credenciales no encontradas') {
      return res.status(404).json({ 
        success: false, 
        message: 'Credencial no encontrada' 
      });
    }
    
    res.status(500).json({ 
      success: false, 
      message: 'Error al obtener detalles de la plantilla',
      error: (error as Error).message
    });
  }
};