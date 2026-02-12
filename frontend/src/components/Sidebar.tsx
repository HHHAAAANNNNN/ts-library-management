import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Sidebar: React.FC = () => {
  const { logout } = useAuth();

  return (
    <aside className="sidebar">
      <h2>Library Admin</h2>
      <nav>
        {/* TODO: Add navigation links */}
        <Link to="/dashboard">Dashboard</Link>
        <Link to="/categories">Categories</Link>
        <Link to="/books">Books</Link>
      </nav>
      <button onClick={logout}>Logout</button>
    </aside>
  );
};

export default Sidebar;
