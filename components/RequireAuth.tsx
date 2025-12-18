import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { authService } from '../services/authService.js';

export const RequireAuth = ({ children }) => {
  const location = useLocation();
  const isAuthenticated = authService.isAuthenticated();

  if (!isAuthenticated) {
    // Redirect them to the /login page, but save the current location they were
    // trying to go to when they were redirected.
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return children;
};