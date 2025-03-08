import { Request, Response, RequestHandler } from 'express';
import UserModel from '../models/User';
import { User } from '../models/User';

export const getUsers: RequestHandler = async (req: Request, res: Response): Promise<void> => {
  try {
    const users = await UserModel.findAll();
    res.status(200).json({ success: true, data: users });
  } catch (error) {
    res.status(500).json({ success: false, error: (error as Error).message });
  }
};

export const getUserById: RequestHandler = async (req: Request, res: Response): Promise<void> => {
  try {
    const userId = parseInt(req.params.id);
    const user = await UserModel.findById(userId);
    if (!user) {
      res.status(404).json({ success: false, message: 'Usuario no encontrado' });
      return;
    }
    res.status(200).json({ success: true, data: user });
  } catch (error) {
    res.status(500).json({ success: false, error: (error as Error).message });
  }
};

export const addUser: RequestHandler = async (req: Request, res: Response): Promise<void> => {
  try {
    const { username, email, password } = req.body;
    const newUser: User = { username, email, password, is_superuser: false, first_name: '', last_name: '', is_staff: false, is_active: true, date_joined: new Date() };
    const userId = await UserModel.create(newUser);
    const userCreated = await UserModel.findById(userId);
    res.status(201).json({ success: true, message: 'Usuario creado correctamente', data: userCreated });
  } catch (error) {
    res.status(500).json({ success: false, error: (error as Error).message });
  }
};

export const updateUser: RequestHandler = async (req: Request, res: Response): Promise<void> => {
  try {
    const userId = parseInt(req.params.id);
    const { username, email, password } = req.body;
    const updatedUser: User = { username, email, password, is_superuser: false, first_name: '', last_name: '', is_staff: false, is_active: true, date_joined: new Date() };
    const updated = await UserModel.update(userId, updatedUser);
    if (!updated) {
      res.status(404).json({ success: false, message: 'Usuario no encontrado o no se pudo actualizar' });
      return;
    }
    const userUpdated = await UserModel.findById(userId);
    res.status(200).json({ success: true, message: 'Usuario actualizado correctamente', data: userUpdated });
  } catch (error) {
    res.status(500).json({ success: false, error: (error as Error).message });
  }
};

export const deleteUser: RequestHandler = async (req: Request, res: Response): Promise<void> => {
  try {
    const userId = parseInt(req.params.id);
    const deleted = await UserModel.remove(userId);
    if (!deleted) {
      res.status(404).json({ success: false, message: 'Usuario no encontrado o no se pudo eliminar' });
      return;
    }
    res.status(200).json({ success: true, message: 'Usuario eliminado correctamente' });
  } catch (error) {
    res.status(500).json({ success: false, error: (error as Error).message });
  }
};
