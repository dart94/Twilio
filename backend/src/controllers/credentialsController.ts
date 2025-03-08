// backend/src/controllers/credentialsController.ts
import { Request, Response, RequestHandler } from 'express';
import TwilioCredentialsModel, { TwilioCredential } from '../models/TwilioCredentials';

interface AuthenticatedRequest extends Request {
  user?: { id: string };
}

export const addCredentials: RequestHandler = async (req: AuthenticatedRequest, res: Response): Promise<void> => {
  try {
    const { name, account_sid, auth_token } = req.body;
    const userId = req.user?.id ? parseInt(req.user.id) : undefined;
    
    const credential: TwilioCredential = {
      name,
      account_sid,
      auth_token,
      user_id: userId
    };
    
    const credentialId = await TwilioCredentialsModel.create(credential);
    const newCredential = await TwilioCredentialsModel.findById(credentialId, userId);
    
    res.status(201).json({ 
      success: true, 
      message: 'Credenciales guardadas correctamente',
      data: newCredential 
    });
  } catch (error) {
    console.error('Error al guardar credenciales:', error);
    res.status(500).json({ 
      success: false, 
      error: (error as Error).message
    });
  }
};

export const getUserCredentials: RequestHandler = async (req: AuthenticatedRequest, res: Response): Promise<void> => {
  try {
    const userId = req.user?.id ? parseInt(req.user.id) : undefined;
    const credentials = await TwilioCredentialsModel.findAll(userId);
    
    res.status(200).json({ 
      success: true, 
      data: credentials 
    });
  } catch (error) {
    console.error('Error al obtener credenciales:', error);
    res.status(500).json({ 
      success: false, 
      error: (error as Error).message
    });
  }
};

export const getCredentialById: RequestHandler = async (req: AuthenticatedRequest, res: Response): Promise<void> => {
  try {
    const credentialId = parseInt(req.params.id);
    const userId = req.user?.id ? parseInt(req.user.id) : undefined;
    const credential = await TwilioCredentialsModel.findById(credentialId, userId);
    
    if (!credential) {
      res.status(404).json({ 
        success: false, 
        message: 'Credencial no encontrada' 
      });
      return;
    }
    
    res.status(200).json({ 
      success: true, 
      data: credential 
    });
  } catch (error) {
    console.error('Error al obtener credencial por ID:', error);
    res.status(500).json({ 
      success: false, 
      error: (error as Error).message
    });
  }
};

export const updateCredentials: RequestHandler = async (req: AuthenticatedRequest, res: Response): Promise<void> => {
  try {
    const credentialId = parseInt(req.params.id);
    const { name, account_sid, auth_token } = req.body;
    const userId = req.user?.id ? parseInt(req.user.id) : undefined;
    
    const credential: TwilioCredential = {
      name,
      account_sid,
      auth_token
    };
    
    const updated = await TwilioCredentialsModel.update(credentialId, credential, userId);
    
    if (!updated) {
      res.status(404).json({ 
        success: false, 
        message: 'Credencial no encontrada o no tienes permisos para actualizarla' 
      });
      return;
    }
    
    const updatedCredential = await TwilioCredentialsModel.findById(credentialId, userId);
    
    res.status(200).json({ 
      success: true, 
      message: 'Credenciales actualizadas correctamente',
      data: updatedCredential
    });
  } catch (error) {
    console.error('Error al actualizar credenciales:', error);
    res.status(500).json({ 
      success: false, 
      error: (error as Error).message
    });
  }
};

export const deleteCredentials: RequestHandler = async (req: AuthenticatedRequest, res: Response): Promise<void> => {
  try {
    const credentialId = parseInt(req.params.id);
    const userId = req.user?.id ? parseInt(req.user.id) : undefined;
    
    const deleted = await TwilioCredentialsModel.remove(credentialId, userId);
    
    if (!deleted) {
      res.status(404).json({ 
        success: false, 
        message: 'Credencial no encontrada o no tienes permisos para eliminarla' 
      });
      return;
    }
    
    res.status(200).json({ 
      success: true, 
      message: 'Credencial eliminada correctamente' 
    });
  } catch (error) {
    console.error('Error al eliminar credenciales:', error);
    res.status(500).json({ 
      success: false, 
      message: 'Error al eliminar credenciales',
      error: (error as Error).message
    });
  }
};
