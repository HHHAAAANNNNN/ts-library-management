import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import api from '../services/api';
import './Dashboard.css';

interface Stats {
  totalCategories: number;
  totalBooks: number;
  lowStockBooks: number;
}

const Dashboard: React.FC = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [stats, setStats] = useState<Stats>({
    totalCategories: 0,
    totalBooks: 0,
    lowStockBooks: 0
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchStats();
  }, []);

  const fetchStats = async () => {
    try {
      setLoading(true);
      const [categoriesRes, booksRes] = await Promise.all([
        api.get('/categories'),
        api.get('/books')
      ]);

      const books = booksRes.data;
      const lowStock = books.filter((book: any) => book.stock < 5).length;

      setStats({
        totalCategories: categoriesRes.data.length,
        totalBooks: books.length,
        lowStockBooks: lowStock
      });
    } catch (error) {
      console.error('Failed to fetch stats:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="dashboard">
      <div className="dashboard-header">
        <div>
          <h1>Dashboard</h1>
          <p>Selamat datang kembali, <strong>{user?.username}</strong>!</p>
        </div>
        <div className="current-time">
          {new Date().toLocaleDateString('id-ID', { 
            weekday: 'long', 
            year: 'numeric', 
            month: 'long', 
            day: 'numeric' 
          })}
        </div>
      </div>

      <div className="stats-grid">
        <div className="stat-card card-primary">
          <div className="stat-icon">
            <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M4 7h16M4 12h16M4 17h16" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
              <rect x="2" y="3" width="20" height="18" rx="2" stroke="currentColor" strokeWidth="2"/>
            </svg>
          </div>
          <div className="stat-content">
            <p className="stat-label">Total Kategori</p>
            {loading ? (
              <div className="stat-skeleton"></div>
            ) : (
              <h2 className="stat-value">{stats.totalCategories}</h2>
            )}
            <p className="stat-description">Kategori buku tersedia</p>
          </div>
        </div>

        <div className="stat-card card-secondary">
          <div className="stat-icon">
            <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M4 19.5C4 18.837 4.26339 18.2011 4.73223 17.7322C5.20107 17.2634 5.83696 17 6.5 17H20" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M6.5 2H20V22H6.5C5.83696 22 5.20107 21.7366 4.73223 21.2678C4.26339 20.7989 4 20.163 4 19.5V4.5C4 3.83696 4.26339 3.20107 4.73223 2.73223C5.20107 2.26339 5.83696 2 6.5 2Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </div>
          <div className="stat-content">
            <p className="stat-label">Total Buku</p>
            {loading ? (
              <div className="stat-skeleton"></div>
            ) : (
              <h2 className="stat-value">{stats.totalBooks}</h2>
            )}
            <p className="stat-description">Buku dalam koleksi</p>
          </div>
        </div>

        <div className="stat-card card-warning">
          <div className="stat-icon">
            <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M12 9v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </div>
          <div className="stat-content">
            <p className="stat-label">Stok Rendah</p>
            {loading ? (
              <div className="stat-skeleton"></div>
            ) : (
              <h2 className="stat-value">{stats.lowStockBooks}</h2>
            )}
            <p className="stat-description">Buku dengan stok {'<'} 5</p>
          </div>
        </div>
      </div>

      <div className="dashboard-actions">
        <h3>Aksi Cepat</h3>
        <div className="action-cards">
          <div className="action-card" onClick={() => navigate('/categories')}>
            <div className="action-icon">
              <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M12 4v16m8-8H4" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
              </svg>
            </div>
            <div className="action-content">
              <h4>Kelola Kategori</h4>
              <p>Tambah, edit, atau hapus kategori buku</p>
            </div>
          </div>

          <div className="action-card" onClick={() => navigate('/books')}>
            <div className="action-icon">
              <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M12 6v6m0 0v6m0-6h6m-6 0H6" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
              </svg>
            </div>
            <div className="action-content">
              <h4>Kelola Buku</h4>
              <p>Tambah, edit, atau hapus buku perpustakaan</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
