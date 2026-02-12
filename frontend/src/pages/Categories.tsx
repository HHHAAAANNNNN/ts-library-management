import React, { useState, useEffect } from 'react';
import { Category } from '../types';
import CategoryModal from '../components/CategoryModal';

const Categories: React.FC = () => {
  const [categories, setCategories] = useState<Category[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<Category | null>(null);

  useEffect(() => {
    // TODO: Fetch categories from API
  }, []);

  const handleAdd = () => {
    // TODO: Implement
  };

  const handleEdit = (category: Category) => {
    // TODO: Implement
  };

  const handleDelete = (id: number) => {
    // TODO: Implement
  };

  return (
    <div className="categories-page">
      <h1>Categories Management</h1>
      <button onClick={handleAdd}>Add Category</button>
      {/* TODO: Display categories table */}
      <CategoryModal 
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSubmit={() => {}}
        category={selectedCategory}
      />
    </div>
  );
};

export default Categories;
