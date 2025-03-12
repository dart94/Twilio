import { BaseModel } from './BaseModel';
import db from '../config/database';

export interface TwilioCredential {
  id?: number;
  name: string;
  account_sid: string;
  auth_token: string;
  user_id?: number;
}

export class TwilioCredentialsModel extends BaseModel<TwilioCredential> {
  constructor() {
    super('credentials');
  }

  // Buscar todas credenciales
  async findAll(filter?: { user_id?: number }): Promise<TwilioCredential[]> {
    let query = `SELECT * FROM ${this.tableName}`;
    const params: any[] = [];
    
    if (filter && filter.user_id) {
      query += ' WHERE user_id = ?';
      params.push(filter.user_id);
    }
    
    const [rows]: any = await db.execute(query, params);
    return rows;
  }

    // Buscar credencial por "name"
  async findByName(name: string): Promise<TwilioCredential | null> {
    const query = `SELECT * FROM ${this.tableName} WHERE name = ? LIMIT 1`;
    const [rows]: any = await db.execute(query, [name]);
    return rows.length > 0 ? rows[0] : null;
  }
  

  async create(credential: TwilioCredential): Promise<number> {
    let query = `INSERT INTO ${this.tableName} (name, account_sid, auth_token`;
    let valuesQuery = ` VALUES (?, ?, ?`;
    const params: any[] = [credential.name, credential.account_sid, credential.auth_token];

    if (credential.user_id) {
      query += ', user_id';
      valuesQuery += ', ?';
      params.push(credential.user_id);
    }
    query += ')' + valuesQuery + ')';

    const [result]: any = await db.execute(query, params);
    return result.insertId;
  }

  async update(id: number, credential: TwilioCredential): Promise<boolean> {
    const queryBase = `UPDATE ${this.tableName} SET name = ?, account_sid = ?, auth_token = ? WHERE id = ?`;
    const paramsBase = [credential.name, credential.account_sid, credential.auth_token, id];

    if (credential.user_id) {
      const query = queryBase + ' AND user_id = ?';
      paramsBase.push(credential.user_id);
      const [result]: any = await db.execute(query, paramsBase);
      return result.affectedRows > 0;
    } else {
      const [result]: any = await db.execute(queryBase, paramsBase);
      return result.affectedRows > 0;
    }
  }
}

export default new TwilioCredentialsModel();
