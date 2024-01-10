import React from 'react';
import { useNavigate } from 'react-router-dom';

const AdminRoute = ({ children }) => {
  const navigate = useNavigate();

  React.useEffect(() => {
    const role = localStorage.getItem('role');
    if (role !== 'admin') {
      alert('You are not admin');
      navigate('/classes');
    }
  }, []);
  return children;
};

export default AdminRoute;
