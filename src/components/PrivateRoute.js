// src/components/PrivateRoute.js
import React from 'react';
import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';

const PrivateRoute = ({ children }) => {
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);

  // Check if the user is authenticated and if a token exists in localStorage
  if (!isAuthenticated || !localStorage.getItem('token')) {
    return <Navigate to="/login" />;
  }

  return children;
};

export default PrivateRoute;
