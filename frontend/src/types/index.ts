// Type definitions

export interface User {
  username: string;
  role: string;
}

export interface LoginResponse {
  token: string;
  user: User;
  message: string;
}

export interface Category {
  id: number;
  name: string;
  description?: string;
  created_at?: string;
  updated_at?: string;
}

export interface Book {
  id: number;
  title: string;
  author: string;
  isbn: string;
  published_year?: number;
  stock: number;
  category_id: number;
  category_name?: string;
  created_at?: string;
  updated_at?: string;
}
