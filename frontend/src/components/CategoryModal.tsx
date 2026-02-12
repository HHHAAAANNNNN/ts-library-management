import React, { useState, useEffect } from 'react';
import { Category } from '../types';
import './CategoryModal.css';

interface CategoryModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: Partial<Category>) => void;
  category?: Category | null;
}

const CategoryModal: React.FC<CategoryModalProps> = ({ isOpen, onClose, onSubmit, category }) => {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (category) {
      setName(category.name);
      setDescription(category.description || '');
    } else {
      setName('');
      setDescription('');
    }
  }, [category, isOpen]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) return;

    setLoading(true);
    await onSubmit({ name: name.trim(), description: description.trim() });
    setLoading(false);
  };

  if (!isOpen) return null;

  return (
    <>
      <div className="modal-overlay" onClick={onClose}></div>
      <div className="modal">
        <div className="modal-content">
          <div className="modal-header">
            <h3>{category ? 'Edit Kategori' : 'Tambah Kategori Baru'}</h3>
            <button className="close-button" onClick={onClose}>
              <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M18 6L6 18M6 6l12 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
              </svg>
            </button>
          </div>

          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="name">Nama Kategori *</label>
              <input
                id="name"
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Contoh: Fiction, Science, History"
                required
                autoFocus
              />
            </div>

            <div className="form-group">
              <label htmlFor="description">Deskripsi</label>
              <textarea
                id="description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Deskripsi kategori (opsional)"
                rows={4}
              />
            </div>

            <div className="modal-footer">
              <button type="button" className="btn-secondary" onClick={onClose}>
                Batal
              </button>
              <button type="submit" className="btn-primary" disabled={loading || !name.trim()}>
                {loading ? (
                  <>
                    <div className="spinner"></div>
                    Menyimpan...
                  </>
                ) : (
                  <>
                    <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M19 21H5a2 2 0 01-2-2V5a2 2 0 012-2h11l5 5v11a2 2 0 01-2 2z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                      <path d="M17 21v-8H7v8M7 3v5h8" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                    {category ? 'Update' : 'Simpan'}
                  </>
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default CategoryModal;
