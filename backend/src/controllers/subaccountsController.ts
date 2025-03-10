// src/controllers/subaccountsController.ts
import { Request, Response, RequestHandler } from 'express';
import SubAccountsModel, { SubAccounts } from '../models/SubAccounts';

interface AuthenticatedRequest extends Request {
  user?: { id: string };
}

// Crear una nueva subcuenta
export const addSubAccount: RequestHandler = async (req: AuthenticatedRequest, res: Response): Promise<void> => {
  try {
    const { name, user_id } = req.body;
    // Si usas autenticación, podrías obtener el user_id de req.user. Si no, se utiliza el que viene en el body.
    const actualUserId = req.user?.id ? parseInt(req.user.id) : user_id;
    
    const newSubAccount: SubAccounts = { name, user_id: actualUserId };
    const subAccountId = await SubAccountsModel.create(newSubAccount);
    
    res.status(201).json({
      success: true,
      message: 'Subcuenta creada correctamente',
      data: { id: subAccountId, ...newSubAccount }
    });
  } catch (error) {
    console.error('Error al crear subcuenta:', error);
    res.status(500).json({ success: false, error: (error as Error).message });
  }
};

// Obtener todas las subcuentas (con filtro opcional)
export const getSubAccounts: RequestHandler = async (req: AuthenticatedRequest, res: Response): Promise<void> => {
  try {
    // Si usas autenticación, puedes filtrar por el usuario autenticado
    const userId = req.user?.id ? parseInt(req.user.id) : undefined;
    const filter = userId ? { user_id: userId } : undefined;
    
    const subAccounts = await SubAccountsModel.findAll(filter);
    res.status(200).json({ success: true, data: subAccounts });
  } catch (error) {
    console.error('Error al obtener subcuentas:', error);
    res.status(500).json({ success: false, error: (error as Error).message });
  }
};

// Obtener una subcuenta por su ID
export const getSubAccountById: RequestHandler = async (req: AuthenticatedRequest, res: Response): Promise<void> => {
  try {
    const id = parseInt(req.params.id);
    const subAccount = await SubAccountsModel.findById(id);
    if (!subAccount) {
      res.status(404).json({ success: false, message: 'Subcuenta no encontrada' });
      return;
    }
    res.status(200).json({ success: true, data: subAccount });
  } catch (error) {
    console.error('Error al obtener subcuenta por ID:', error);
    res.status(500).json({ success: false, error: (error as Error).message });
  }
};

// Actualizar una subcuenta
export const updateSubAccount: RequestHandler = async (req: AuthenticatedRequest, res: Response): Promise<void> => {
  try {
    const id = parseInt(req.params.id);
    const { name, user_id } = req.body;
    const actualUserId = req.user?.id ? parseInt(req.user.id) : user_id;
    const subAccount: SubAccounts = { name, user_id: actualUserId };
    
    const updated = await SubAccountsModel.update(id, subAccount);
    if (!updated) {
      res.status(404).json({ success: false, message: 'Subcuenta no encontrada o no se pudo actualizar' });
      return;
    }
    res.status(200).json({ success: true, message: 'Subcuenta actualizada correctamente' });
  } catch (error) {
    console.error('Error al actualizar subcuenta:', error);
    res.status(500).json({ success: false, error: (error as Error).message });
  }
};

// Eliminar una subcuenta
export const deleteSubAccount: RequestHandler = async (req: AuthenticatedRequest, res: Response): Promise<void> => {
  try {
    const id = parseInt(req.params.id);
    const deleted = await SubAccountsModel.remove(id);
    if (!deleted) {
      res.status(404).json({ success: false, message: 'Subcuenta no encontrada o no se pudo eliminar' });
      return;
    }
    res.status(200).json({ success: true, message: 'Subcuenta eliminada correctamente' });
  } catch (error) {
    console.error('Error al eliminar subcuenta:', error);
    res.status(500).json({ success: false, error: (error as Error).message });
  }
};

export default {
  addSubAccount,
  getSubAccounts,
  getSubAccountById,
  updateSubAccount,
  deleteSubAccount,
};
