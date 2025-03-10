import { BaseModel } from './BaseModel';
import db from '../config/database';

export interface User {
  id?: number;
  password: string;
  last_login?: Date;
  is_superuser: boolean;
  first_name: string;
  last_name: string;
  is_staff: boolean;
  is_active: boolean;
  date_joined: Date;
  email: string;
  username: string;
}

export class UserModel extends BaseModel<User> {
  constructor() {
    super('users');
  }

  async create(user: User): Promise<number> {
    // Suponemos que "id" es autoincremental, así que no lo insertamos
    const query = `
      INSERT INTO users 
      (password, last_login, is_superuser, first_name, last_name, is_staff, is_active, date_joined, email, username)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `;
    const params: any[] = [
      user.password,
      user.last_login ?? null,  // Si user.last_login es undefined, se enviará null
      user.is_superuser,
      user.first_name,
      user.last_name,
      user.is_staff,
      user.is_active,
      user.date_joined,
      user.email,
      user.username,
    ];
    const [result]: any = await db.execute(query, params);
    return result.insertId;
  }

  async findByEmail(email: string): Promise<User | null> {
    const query = `SELECT * FROM ${this.tableName} WHERE email = ?`;
    const [rows]: any = await db.execute(query, [email]);
    return rows.length > 0 ? rows[0] : null;
  }
  

  async update(id: number, user: User): Promise<boolean> {
    if (!user.id) {
      throw new Error('El ID del usuario es requerido para actualizar.');
    }
    const query = `
      UPDATE ${this.tableName}
      SET password = ?, last_login = ?, is_superuser = ?, first_name = ?, last_name = ?, is_staff = ?, is_active = ?, date_joined = ?, email = ?, username = ?
      WHERE id = ?
    `;
    const params = [
      user.password,
      user.last_login,
      user.is_superuser,
      user.first_name,
      user.last_name,
      user.is_staff,
      user.is_active,
      user.date_joined,
      user.email,
      user.username,
      id
    ];
    const [result]: any = await db.execute(query, params);
    return result.affectedRows > 0;
  }
}


export default new UserModel();
