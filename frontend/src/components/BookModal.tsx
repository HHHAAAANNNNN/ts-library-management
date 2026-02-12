import React from 'react';
import { Book } from '../types';

interface BookModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: Partial<Book>) => void;
  book?: Book | null;
}

const BookModal: React.FC<BookModalProps> = ({ isOpen, onClose, onSubmit, book }) => {
  if (!isOpen) return null;

  return (
    <div className="modal">
      <div className="modal-content">
        <h3>{book ? 'Edit Book' : 'Add Book'}</h3>
        {/* TODO: Implement form with category dropdown */}
        <button onClick={onClose}>Close</button>
      </div>
    </div>
  );
};

export default BookModal;
