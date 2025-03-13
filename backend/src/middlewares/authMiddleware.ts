// src/middlewares/authMiddleware.ts
import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

export interface AuthenticatedRequest extends Request {
  user?: { id: string; [key: string]: any };
}

export const authenticate = (
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction
): void => {
  console.log("🔍 Headers recibidos:", req.headers);
  const authHeader = req.headers.authorization;
  
  if (!authHeader) {
    console.log("🚫 No se proporcionó token de autenticación.");
    res.status(401).json({ message: 'No se proporcionó token de autenticación.' });
    return;
  }
  
  const token = authHeader.split(' ')[1];
  
  if (!token) {
    console.log('🚫 Token mal formado.')
    res.status(401).json({ message: 'Token mal formado.' });
    return;
  }
  
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET as string) as { id: string };
    req.user = { id: decoded.id };
    next();
  } catch (error) {
    console.log('🚫 Token inválido.')
    res.status(401).json({ message: 'Token inválido.' });
    return;
  }
};
