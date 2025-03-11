import db from '../config/database';

export interface Campaign{
    id?: number;
    name: string;
    description: string;
    created_at?: Date;
    updated_at?: Date;
    credential_sheet_id: number;
    credential_template_id: number;
    sub_account_id: number;
}


// Obtener todas las campañas, con opción de aplicar filtros
export const findAll = async (filter?: Partial<Campaign>): Promise<Campaign[]> => {
    try {
      let query = 'SELECT * FROM Campaign';
      const params: any[] = [];
      if (filter && Object.keys(filter).length > 0) {
        const conditions = Object.keys(filter).map((key) => {
          params.push((filter as any)[key]);
          return `${key} = ?`;
        });
        query += ' WHERE ' + conditions.join(' AND ');
      }
      const [rows] = await db.execute(query, params);
      return rows as Campaign[];
    } catch (error) {
      console.error('Error al obtener campañas:', error);
      throw error;
    }
  };
  
  // Obtener una campaña por ID
  export const findById = async (id: number): Promise<Campaign | null> => {
    try {
      const query = 'SELECT * FROM Campaign WHERE id = ?';
      const [rows]: any = await db.execute(query, [id]);
      return rows.length > 0 ? rows[0] : null;
    } catch (error) {
      console.error('Error al obtener campaña por ID:', error);
      throw error;
    }
  };
  
  // Crear una nueva campaña
  export const create = async (campaign: Campaign): Promise<number> => {
    try {
      const query = `
        INSERT INTO Campaign 
        (name, description, created_at, updated_at, credential_sheet_id, credential_template_id, sub_account_id)
        VALUES (?, ?, NOW(), NOW(), ?, ?, ?)
      `;
      const params: any[] = [
        campaign.name,
        campaign.description,
        campaign.credential_sheet_id,
        campaign.credential_template_id,
        campaign.sub_account_id
      ];
      const [result]: any = await db.execute(query, params);
      return result.insertId;
    } catch (error) {
      console.error('Error al crear campaña:', error);
      throw error;
    }
  };
  
  // Actualizar una campaña existente
  export const update = async (id: number, campaign: Campaign): Promise<boolean> => {
    try {
      const query = `
        UPDATE Campaign 
        SET name = ?, description = ?, updated_at = NOW(), credential_sheet_id = ?, credential_template_id = ?, sub_account_id = ?
        WHERE id = ?
      `;
      const params: any[] = [
        campaign.name,
        campaign.description,
        campaign.credential_sheet_id,
        campaign.credential_template_id,
        campaign.sub_account_id,
        id
      ];
      const [result]: any = await db.execute(query, params);
      return result.affectedRows > 0;
    } catch (error) {
      console.error('Error al actualizar campaña:', error);
      throw error;
    }
  };
  
  // Eliminar una campaña
  export const remove = async (id: number): Promise<boolean> => {
    try {
      const query = 'DELETE FROM Campaign WHERE id = ?';
      const [result]: any = await db.execute(query, [id]);
      return result.affectedRows > 0;
    } catch (error) {
      console.error('Error al eliminar campaña:', error);
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