import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';

export function ProtectedRoute({ children }) {
  const { user, isLoading } = useAuth();
  const location = useLocation();
  
  if (isLoading) {
    return (
      <div className="loading-container">
        <div className="spinner"></div>
      </div>
    );
  }
  
  if (!user) {
    // Redirect to login page but remember where they were trying to go
    return <Navigate to="/auth" state={{ from: location.pathname }} replace />;
  }
  
  return children;
}