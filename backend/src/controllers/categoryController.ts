import { Request, Response } from 'express';
import { Category } from '../models/Category';
import { Book } from '../models/Book';

export const getAllCategories = async (req: Request, res: Response) => {
  try {
    const categories = await Category.findAll();
    // Sort by ID ascending
    categories.sort((a, b) => a.id - b.id);
    res.json(categories);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};

export const getCategoryById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const category = await Category.findById(Number(id));
    
    if (!category) {
      return res.status(404).json({ error: 'Category not found' });
    }
    
    res.json(category);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};

export const createCategory = async (req: Request, res: Response) => {
  try {
    const { name, description } = req.body;
    
    if (!name) {
      return res.status(400).json({ error: 'Name is required' });
    }
    
    const category = await Category.create({ name, description });
    res.status(201).json(category);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};

export const updateCategory = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { name, description } = req.body;
    
    if (!name) {
      return res.status(400).json({ error: 'Name is required' });
    }
    
    const updated = await Category.update(Number(id), { name, description });
    
    if (!updated) {
      return res.status(404).json({ error: 'Category not found' });
    }
    
    res.json({ message: 'Category updated successfully' });
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};

export const deleteCategory = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    
    // Check if category has books
    const books = await Book.findAll({ category_id: id });
    
    if (books.length > 0) {
      return res.status(400).json({ 
        error: 'Kategori tidak dapat dihapus karena masih memiliki buku terdaftar',
        bookCount: books.length
      });
    }
    
    const deleted = await Category.delete(Number(id));
    
    if (!deleted) {
      return res.status(404).json({ error: 'Category not found' });
    }
    
    res.json({ message: 'Category deleted successfully' });
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};
