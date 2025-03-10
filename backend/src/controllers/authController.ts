// src/controllers/authController.ts
import { Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import UserModel from '../models/User';

export const login = async (req: Request, res: Response): Promise<void> => {
  try {
    const { email, password } = req.body;

    // Verifica que se hayan enviado email y password
    if (!email || !password) {
      res.status(400).json({ success: false, message: 'Email y password son requeridos.' });
      return;
    }

    // Busca el usuario por email
    const user = await UserModel.findByEmail(email);
    if (!user) {
      res.status(401).json({ success: false, message: 'Usuario no encontrado.' });
      return;
    }

    if (user.password !== password) {
      res.status(401).json({ success: false, message: 'Password incorrecto.' });
      return;
    }

    // Genera el token JWT. El token incluye la id del usuario.
    const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET as string, { expiresIn: '1h' });

    res.status(200).json({ success: true, token });
  } catch (error) {
    console.error('Error en login:', error);
    res.status(500).json({ success: false, message: 'Error interno del servidor.' });
  }
};
