// src/controllers/sheetsController.ts
import { Request, Response, RequestHandler } from 'express';
import SheetModel, { Sheet } from '../models/Sheet';

export const addSheet: RequestHandler = async (req: Request, res: Response): Promise<void> => {
  try {
    const {
      sheet_id,
      sheet_sheet,
      sheet_range,
      field_blacklist,
      field_status,
      field_contact,
      campaign_id
    } = req.body;

    // Construimos el objeto Sheet.
    const newSheet: Sheet = {
      sheet_id,
      sheet_sheet,
      sheet_range,
      field_blacklist,
      field_status,
      field_contact,
      campaign_id
    };

    const sheetId = await SheetModel.create(newSheet);
    res.status(201).json({
      success: true,
      message: 'Sheet creada correctamente',
      data: { id: sheetId, ...newSheet }
    });
  } catch (error) {
    console.error('Error al crear Sheet:', error);
    res.status(500).json({ success: false, error: (error as Error).message });
  }
};

export const getSheets: RequestHandler = async (req: Request, res: Response): Promise<void> => {
  try {
    
    const filter = req.query;
    const sheets = await SheetModel.findAll(filter as Partial<Sheet>);
    res.status(200).json({ success: true, data: sheets });
  } catch (error) {
    console.error('Error al obtener Sheets:', error);
    res.status(500).json({ success: false, error: (error as Error).message });
  }
};
