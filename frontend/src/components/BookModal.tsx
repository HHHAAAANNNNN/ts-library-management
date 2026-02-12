import React, { useState, useEffect } from 'react';
import { Book, Category } from '../types';
import '../components/CategoryModal.css';

interface BookModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: Partial<Book>) => void;
  book?: Book | null;
  categories: Category[];
}

const BookModal: React.FC<BookModalProps> = ({ isOpen, onClose, onSubmit, book, categories }) => {
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [isbn, setIsbn] = useState('');
  const [publishedYear, setPublishedYear] = useState('');
  const [stock, setStock] = useState('');
  const [categoryId, setCategoryId] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (book) {
      setTitle(book.title);
      setAuthor(book.author);
      setIsbn(book.isbn);
      setPublishedYear(book.published_year?.toString() || '');
      setStock(book.stock.toString());
      setCategoryId(book.category_id.toString());
    } else {
      setTitle('');
      setAuthor('');
      setIsbn('');
      setPublishedYear('');
      setStock('0');
      setCategoryId('');
    }
  }, [book, isOpen]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim() || !author.trim() || !isbn.trim() || !categoryId) return;

    setLoading(true);
    await onSubmit({
      title: title.trim(),
      author: author.trim(),
      isbn: isbn.trim(),
      published_year: publishedYear ? parseInt(publishedYear) : undefined,
      stock: parseInt(stock) || 0,
      category_id: parseInt(categoryId),
    });
    setLoading(false);
  };

  if (!isOpen) return null;

  return (
    <>
      <div className="modal-overlay" onClick={onClose}></div>
      <div className="modal">
        <div className="modal-content">
          <div className="modal-header">
            <h3>{book ? 'Edit Buku' : 'Tambah Buku Baru'}</h3>
            <button className="close-button" onClick={onClose}>
              <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M18 6L6 18M6 6l12 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
              </svg>
            </button>
          </div>

          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="title">Judul Buku *</label>
              <input
                id="title"
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Contoh: To Kill a Mockingbird"
                required
                autoFocus
              />
            </div>

            <div className="form-group">
              <label htmlFor="author">Penulis *</label>
              <input
                id="author"
                type="text"
                value={author}
                onChange={(e) => setAuthor(e.target.value)}
                placeholder="Contoh: Harper Lee"
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="isbn">ISBN *</label>
              <input
                id="isbn"
                type="text"
                value={isbn}
                onChange={(e) => setIsbn(e.target.value)}
                placeholder="Contoh: 978-0-06-112008-4"
                required
              />
            </div>

            <div className="form-row">
              <div className="form-group">
                <label htmlFor="category">Kategori *</label>
                <select
                  id="category"
                  value={categoryId}
                  onChange={(e) => setCategoryId(e.target.value)}
                  required
                >
                  <option value="">Pilih Kategori</option>
                  {categories.map((cat) => (
                    <option key={cat.id} value={cat.id}>
                      {cat.name}
                    </option>
                  ))}
                </select>
              </div>

              <div className="form-group">
                <label htmlFor="year">Tahun Terbit</label>
                <input
                  id="year"
                  type="number"
                  value={publishedYear}
                  onChange={(e) => setPublishedYear(e.target.value)}
                  placeholder="2023"
                  min="1800"
                  max="2100"
                />
              </div>
            </div>

            <div className="form-group">
              <label htmlFor="stock">Stok *</label>
              <input
                id="stock"
                type="number"
                value={stock}
                onChange={(e) => setStock(e.target.value)}
                placeholder="10"
                min="0"
                required
              />
            </div>

            <div className="modal-footer">
              <button type="button" className="btn-secondary" onClick={onClose}>
                Batal
              </button>
              <button
                type="submit"
                className="btn-primary"
                disabled={loading || !title.trim() || !author.trim() || !isbn.trim() || !categoryId}
              >
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
                    {book ? 'Update' : 'Simpan'}
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

export default BookModal;
