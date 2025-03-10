import db from '../config/database';

export interface SubAccounts {
  id?: number;
  name: string;
  created_at?: Date;
  updated_at?: Date;
  user_id: number;
}

// Obtener todas las subcuentas, opcionalmente filtrando por propiedades
export const findAll = async (filter?: Partial<SubAccounts>): Promise<SubAccounts[]> => {
  try {
    let query = `SELECT * FROM sub_accounts`;
    const params: any[] = [];
    if (filter && Object.keys(filter).length > 0) {
      const conditions = Object.keys(filter).map((key) => {
        params.push((filter as any)[key]);
        return `${key} = ?`;
      });
      query += ' WHERE ' + conditions.join(' AND ');
    }
    const [rows] = await db.execute(query, params);
    return rows as SubAccounts[];
  } catch (error) {
    console.error('Error al obtener subcuentas:', error);
    throw error;
  }
};

// Obtener una subcuenta por su ID
export const findById = async (id: number): Promise<SubAccounts | null> => {
  try {
    const query = `SELECT * FROM sub_accounts WHERE id = ?`;
    const [rows]: any = await db.execute(query, [id]);
    return rows.length > 0 ? rows[0] : null;
  } catch (error) {
    console.error('Error al obtener subcuenta por ID:', error);
    throw error;
  }
};

// Crear una nueva subcuenta
export const create = async (subAccount: SubAccounts): Promise<number> => {
  try {
    const query = `
      INSERT INTO sub_accounts 
      (name, user_id, created_at, updated_at)
      VALUES (?, ?, NOW(), NOW())
    `;
    const params: any[] = [
      subAccount.name,
      subAccount.user_id
    ];
    const [result]: any = await db.execute(query, params);
    return result.insertId;
  } catch (error) {
    console.error('Error al crear subcuenta:', error);
    throw error;
  }
};

// Actualizar una subcuenta existente
export const update = async (id: number, subAccount: SubAccounts): Promise<boolean> => {
  try {
    const query = `
      UPDATE sub_accounts 
      SET name = ?, user_id = ?, updated_at = NOW()
      WHERE id = ?
    `;
    const params: any[] = [
      subAccount.name,
      subAccount.user_id,
      id
    ];
    const [result]: any = await db.execute(query, params);
    return result.affectedRows > 0;
  } catch (error) {
    console.error('Error al actualizar subcuenta:', error);
    throw error;
  }
};

// Eliminar una subcuenta
export const remove = async (id: number): Promise<boolean> => {
  try {
    const query = `DELETE FROM sub_accounts WHERE id = ?`;
    const [result]: any = await db.execute(query, [id]);
    return result.affectedRows > 0;
  } catch (error) {
    console.error('Error al eliminar subcuenta:', error);
    throw error;
  }
};

export default {
  findAll,
  findById,
  create,
  update,
  remove,
};
