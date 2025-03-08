// Objetivo: Definir el modelo de credenciales de Twilio para la API REST
import db from '../config/database';

export interface TwilioCredential {
  id?: number;
  name: string;
  account_sid: string;
  auth_token: string;
  user_id?: number;
}

export const findAll = async (userId?: number): Promise<TwilioCredential[]> => {
  try {
    let query = 'SELECT * FROM credentials';
    const params: any[] = [];
    
    // Si se proporciona un userId, filtrar por él
    if (userId) {
      query += ' WHERE user_id = ?';
      params.push(userId);
    }
    
    const [rows] = await db.execute(query, params);
    return rows as TwilioCredential[];
  } catch (error) {
    console.error('Error al obtener credenciales:', error);
    throw error;
  }
};

export const findById = async (id: number, userId?: number): Promise<TwilioCredential | null> => {
  try {
    let query = 'SELECT * FROM credentials WHERE id = ?';
    const params: any[] = [id];
    
    // Si se proporciona un userId, asegurar que la credencial pertenece al usuario
    if (userId) {
      query += ' AND user_id = ?';
      params.push(userId);
    }
    
    const [rows]: any = await db.execute(query, params);
    return rows.length > 0 ? rows[0] : null;
  } catch (error) {
    console.error('Error al obtener credencial por ID:', error);
    throw error;
  }
};

export const create = async (credential: TwilioCredential): Promise<number> => {
  try {
    const { name, account_sid, auth_token, user_id } = credential;
    
    let query = 'INSERT INTO credentials (name, account_sid, auth_token';
    let valuesQuery = ' VALUES (?, ?, ?';
    const params: any[] = [name, account_sid, auth_token];
    
    // Si se proporciona un user_id, incluirlo en la consulta
    if (user_id) {
      query += ', user_id';
      valuesQuery += ', ?';
      params.push(user_id);
    }
    
    query += ')' + valuesQuery + ')';
    
    const [result]: any = await db.execute(query, params);
    return result.insertId;
  } catch (error) {
    console.error('Error al crear credencial:', error);
    throw error;
  }
};

export const update = async (id: number, credential: TwilioCredential, userId?: number): Promise<boolean> => {
  try {
    const { name, account_sid, auth_token } = credential;
    
    let query = 'UPDATE credentials SET name = ?, account_sid = ?, auth_token = ? WHERE id = ?';
    const params: any[] = [name, account_sid, auth_token, id];
    
    // Si se proporciona un userId, asegurar que la credencial pertenece al usuario
    if (userId) {
      query += ' AND user_id = ?';
      params.push(userId);
    }
    
    const [result]: any = await db.execute(query, params);
    return result.affectedRows > 0;
  } catch (error) {
    console.error('Error al actualizar credencial:', error);
    throw error;
  }
};

export const remove = async (id: number, userId?: number): Promise<boolean> => {
  try {
    let query = 'DELETE FROM credentials WHERE id = ?';
    const params: any[] = [id];
    
    // Si se proporciona un userId, asegurar que la credencial pertenece al usuario
    if (userId) {
      query += ' AND user_id = ?';
      params.push(userId);
    }
    
    const [result]: any = await db.execute(query, params);
    return result.affectedRows > 0;
  } catch (error) {
    console.error('Error al eliminar credencial:', error);
    throw error;
  }
};

export default {
  findAll,
  findById,
  create,
  update,
  remove
};