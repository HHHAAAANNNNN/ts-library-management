import { Request, Response } from 'express';
import jwt from 'jsonwebtoken';

// Hardcoded admin credentials for demo
const ADMIN_USERNAME = 'admin';
const ADMIN_PASSWORD = 'admin123';

export const login = async (req: Request, res: Response) => {
  try {
    const { username, password } = req.body;

    if (!username || !password) {
      return res.status(400).json({ error: 'Username and password required' });
    }

    // Simple authentication check
    if (username !== ADMIN_USERNAME || password !== ADMIN_PASSWORD) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    // Generate JWT token
    const token = jwt.sign(
      { username, role: 'admin' },
      process.env.JWT_SECRET || 'default_secret',
      { expiresIn: '24h' }
    );

    res.json({
      message: 'Login successful',
      token,
      user: { username, role: 'admin' }
    });
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};
