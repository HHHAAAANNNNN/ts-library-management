import { pool } from '../config/database';
import { RowDataPacket, ResultSetHeader } from 'mysql2';

export class Category {
  static async findAll() {
    const [rows] = await pool.query<RowDataPacket[]>(
      'SELECT * FROM categories ORDER BY id DESC'
    );
    return rows;
  }

  static async findById(id: number) {
    const [rows] = await pool.query<RowDataPacket[]>(
      'SELECT * FROM categories WHERE id = ?',
      [id]
    );
    return rows[0];
  }

  static async create(data: { name: string; description?: string }) {
    const [result] = await pool.query<ResultSetHeader>(
      'INSERT INTO categories (name, description) VALUES (?, ?)',
      [data.name, data.description || null]
    );
    return { id: result.insertId, ...data };
  }

  static async update(id: number, data: { name: string; description?: string }) {
    const [result] = await pool.query<ResultSetHeader>(
      'UPDATE categories SET name = ?, description = ? WHERE id = ?',
      [data.name, data.description || null, id]
    );
    return result.affectedRows > 0;
  }

  static async delete(id: number) {
    const [result] = await pool.query<ResultSetHeader>(
      'DELETE FROM categories WHERE id = ?',
      [id]
    );
    return result.affectedRows > 0;
  }
}
