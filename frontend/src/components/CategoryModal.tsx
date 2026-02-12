import React from 'react';
import { Category } from '../types';

interface CategoryModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: Partial<Category>) => void;
  category?: Category | null;
}

const CategoryModal: React.FC<CategoryModalProps> = ({ isOpen, onClose, onSubmit, category }) => {
  if (!isOpen) return null;

  return (
    <div className="modal">
      <div className="modal-content">
        <h3>{category ? 'Edit Category' : 'Add Category'}</h3>
        {/* TODO: Implement form */}
        <button onClick={onClose}>Close</button>
      </div>
    </div>
  );
};

export default CategoryModal;
