import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Login: React.FC = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: Implement login API call
  };

  return (
    <div className="login-page">
      <h2>Library Management - Login</h2>
      <form onSubmit={handleSubmit}>
        {/* TODO: Implement form fields */}
      </form>
    </div>
  );
};

export default Login;
