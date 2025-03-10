import { Request, Response, RequestHandler } from "express";
import PhoneNumberModel, {PhoneNumber} from '../models/PhoneNumber'

interface AuthenticatedRequest extends Request {
  user?: { id: string };
}

export const addPhoneNumber: RequestHandler = async (req: AuthenticatedRequest, res: Response): Promise<void> => {
    try {
      const { name,number,company } = req.body;
      const userId = req.user?.id ? parseInt(req.user.id) : undefined;

      const newPhoneNumber: PhoneNumber = {
        name,
        number,
        company,
      };

      const phoneNumberId = await PhoneNumberModel.create(newPhoneNumber);

      res.status(201).json({
        success: true,
        message: 'Número de teléfono guardado correctamente',
        data: newPhoneNumber,
      });
    } catch (error) {
      console.error('Error al guardar número de teléfono:', error);
      res.status(500).json({
        success: false,
        error: (error as Error).message,
      });
    }
  };

  export const getPhoneNumbers: RequestHandler = async (req: AuthenticatedRequest, res: Response): Promise<void> => {
    try{
        const phoneId = req.user?.id ? parseInt(req.user.id) : undefined;
        const filter = phoneId ? {id: phoneId} : undefined
        const phoneNumbers = await PhoneNumberModel.findAll(filter);

        res.status(200).json({data: phoneNumbers});
    }catch(error){
        console.error('Error al obtener números de teléfono:', error);
        res.status(500).json({
            success: false,
            error: (error as Error).message,});

    }
    };
        
  

  
        