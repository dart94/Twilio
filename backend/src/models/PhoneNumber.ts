// src/models/PhoneNumber.ts
import db from '../config/database';

export interface PhoneNumber {
  id?: number;
  name?: string;
  company?: string;
  number: string;
  created_at?: Date;
  updated_at?: Date;
}

export const create = async (phoneNumber: PhoneNumber): Promise<number> => {
  try {
    const query = `
      INSERT INTO number_phones (name, company, number, created_at, updated_at)
      VALUES (?, ?, ?, NOW(), NOW())
    `;
    const params: any[] = [
      phoneNumber.name,
      phoneNumber.company,
      phoneNumber.number
    ];
    const [result]: any = await db.execute(query, params);
    return result.insertId;
  } catch (error) {
    console.error('Error al registrar número de teléfono:', error);
    throw error;
  }
};

export const findAll = async (filter?: Partial<PhoneNumber>): Promise<PhoneNumber[]> => {
  try {
    let query = `SELECT * FROM number_phones`;
    const params: any[] = [];
    if (filter && Object.keys(filter).length > 0) {
      const conditions = Object.keys(filter).map((key) => {
        params.push((filter as any)[key]);
        return `${key} = ?`;
      });
      query += ' WHERE ' + conditions.join(' AND ');
    }
    const [rows] = await db.execute(query, params);
    return rows as PhoneNumber[];
  } catch (error) {
    console.error('Error al obtener números de teléfono:', error);
    throw error;
  }
};


export const remove = async (id: number): Promise<boolean> => {
  try {
    const query = `DELETE FROM number_phones WHERE id = ?`;
    const [result]: any = await db.execute(query, [id]);
    return result.affectedRows > 0;
  } catch (error) {
    console.error('Error al eliminar número de teléfono:', error);
    throw error;
  }
};




export default {
  create,
  findAll,
  remove,
};

  
  