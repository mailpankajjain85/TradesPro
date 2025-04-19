import { createContext, useContext } from 'react';
import { useQuery, useMutation } from '@tanstack/react-query';
import { getQueryFn, apiRequest, queryClient } from '../lib/queryClient';

// Authentication context
const AuthContext = createContext(null);

// Authentication provider component
export function AuthProvider({ children }) {
  // Get current user session
  const {
    data: user,
    error,
    isLoading,
  } = useQuery({
    queryKey: ['/api/user'],
    queryFn: getQueryFn({ on401: 'returnNull' }),
  });

  // Login mutation
  const loginMutation = useMutation({
    mutationFn: async (credentials) => {
      const res = await apiRequest('POST', '/api/login', credentials);
      return await res.json();
    },
    onSuccess: (userData) => {
      queryClient.setQueryData(['/api/user'], userData);
    },
  });

  // Register mutation
  const registerMutation = useMutation({
    mutationFn: async (userData) => {
      const res = await apiRequest('POST', '/api/register', userData);
      return await res.json();
    },
    onSuccess: (userData) => {
      queryClient.setQueryData(['/api/user'], userData);
    },
  });

  // Logout mutation
  const logoutMutation = useMutation({
    mutationFn: async () => {
      await apiRequest('POST', '/api/logout');
    },
    onSuccess: () => {
      queryClient.setQueryData(['/api/user'], null);
    },
  });

  const value = {
    user,
    isLoading,
    error,
    loginMutation,
    registerMutation,
    logoutMutation,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

// Hook to use the auth context
export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}