import { Request, Response } from 'express';
import { Book } from '../models/Book';

export const getAllBooks = async (req: Request, res: Response) => {
  try {
    const { category_id, search } = req.query;
    const filters: any = {};
    
    if (category_id) filters.category_id = category_id as string;
    if (search) filters.search = search as string;
    
    const books = await Book.findAll(filters);
    res.json(books);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};

export const getBookById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const book = await Book.findById(Number(id));
    
    if (!book) {
      return res.status(404).json({ error: 'Book not found' });
    }
    
    res.json(book);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};

export const createBook = async (req: Request, res: Response) => {
  try {
    const { title, author, isbn, published_year, stock, category_id } = req.body;
    
    if (!title || !author || !isbn || !category_id) {
      return res.status(400).json({ 
        error: 'Title, author, ISBN, and category_id are required' 
      });
    }
    
    const book = await Book.create({
      title,
      author,
      isbn,
      published_year,
      stock,
      category_id
    });
    
    res.status(201).json(book);
  } catch (error: any) {
    if (error.code === 'ER_DUP_ENTRY') {
      return res.status(400).json({ error: 'ISBN already exists' });
    }
    res.status(500).json({ error: error.message });
  }
};

export const updateBook = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { title, author, isbn, published_year, stock, category_id } = req.body;
    
    if (!title || !author || !isbn || !category_id) {
      return res.status(400).json({ 
        error: 'Title, author, ISBN, and category_id are required' 
      });
    }
    
    const updated = await Book.update(Number(id), {
      title,
      author,
      isbn,
      published_year,
      stock,
      category_id
    });
    
    if (!updated) {
      return res.status(404).json({ error: 'Book not found' });
    }
    
    res.json({ message: 'Book updated successfully' });
  } catch (error: any) {
    if (error.code === 'ER_DUP_ENTRY') {
      return res.status(400).json({ error: 'ISBN already exists' });
    }
    res.status(500).json({ error: error.message });
  }
};

export const deleteBook = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const deleted = await Book.delete(Number(id));
    
    if (!deleted) {
      return res.status(404).json({ error: 'Book not found' });
    }
    
    res.json({ message: 'Book deleted successfully' });
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};
