// src/components/auth/AdminRoute.js
import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

const AdminRoute = ({ children }) => {
  const { currentUser } = useAuth();
  return currentUser?.role === 'admin' ? children : <Navigate to="/admin/login" />;
};

export default AdminRoute;