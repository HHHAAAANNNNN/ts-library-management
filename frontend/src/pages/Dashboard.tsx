import React, { useEffect, useState } from 'react';

const Dashboard: React.FC = () => {
  const [stats, setStats] = useState({
    totalCategories: 0,
    totalBooks: 0,
    lowStockBooks: 0
  });

  useEffect(() => {
    // TODO: Fetch dashboard statistics
  }, []);

  return (
    <div className="dashboard">
      <h1>Dashboard</h1>
      <div className="stats-cards">
        {/* TODO: Display statistics cards */}
      </div>
    </div>
  );
};

export default Dashboard;
