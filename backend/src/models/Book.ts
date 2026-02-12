import { pool } from '../config/database';
import { RowDataPacket, ResultSetHeader } from 'mysql2';

interface BookData {
  title: string;
  author: string;
  isbn: string;
  published_year?: number;
  stock?: number;
  category_id: number;
}

export class Book {
  static async findAll(filters?: { category_id?: string; search?: string }) {
    let query = `
      SELECT b.*, c.name as category_name 
      FROM books b 
      LEFT JOIN categories c ON b.category_id = c.id
      WHERE 1=1
    `;
    const params: any[] = [];

    if (filters?.category_id) {
      query += ' AND b.category_id = ?';
      params.push(filters.category_id);
    }

    if (filters?.search) {
      query += ' AND (b.title LIKE ? OR b.author LIKE ? OR b.isbn LIKE ?)';
      const searchTerm = `%${filters.search}%`;
      params.push(searchTerm, searchTerm, searchTerm);
    }

    query += ' ORDER BY b.id DESC';

    const [rows] = await pool.query<RowDataPacket[]>(query, params);
    return rows;
  }

  static async findById(id: number) {
    const [rows] = await pool.query<RowDataPacket[]>(
      `SELECT b.*, c.name as category_name 
       FROM books b 
       LEFT JOIN categories c ON b.category_id = c.id 
       WHERE b.id = ?`,
      [id]
    );
    return rows[0];
  }

  static async create(data: BookData) {
    const [result] = await pool.query<ResultSetHeader>(
      `INSERT INTO books (title, author, isbn, published_year, stock, category_id) 
       VALUES (?, ?, ?, ?, ?, ?)`,
      [data.title, data.author, data.isbn, data.published_year || null, data.stock || 0, data.category_id]
    );
    return { id: result.insertId, ...data };
  }

  static async update(id: number, data: BookData) {
    const [result] = await pool.query<ResultSetHeader>(
      `UPDATE books 
       SET title = ?, author = ?, isbn = ?, published_year = ?, stock = ?, category_id = ? 
       WHERE id = ?`,
      [data.title, data.author, data.isbn, data.published_year || null, data.stock || 0, data.category_id, id]
    );
    return result.affectedRows > 0;
  }

  static async delete(id: number) {
    const [result] = await pool.query<ResultSetHeader>(
      'DELETE FROM books WHERE id = ?',
      [id]
    );
    return result.affectedRows > 0;
  }
}
