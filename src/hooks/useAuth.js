import { createContext, ReactNode, useContext } from 'react';
import {
  useQuery,
  useMutation,
} from '@tanstack/react-query';
import { getQueryFn, apiRequest, queryClient } from '../lib/queryClient';

// This will be a simple placeholder for the User type
// In a real app, this would be imported from a shared schema
const dummyUserValidation = (user) => {
  // Just make sure these properties exist
  if (user && user.username && typeof user.username === 'string') {
    return true;
  }
  return false;
};

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const {
    data: user,
    error,
    isLoading,
  } = useQuery({
    queryKey: ['/api/user'],
    queryFn: getQueryFn({ on401: 'returnNull' }),
  });

  const loginMutation = useMutation({
    mutationFn: async (credentials) => {
      const res = await apiRequest('POST', '/api/login', credentials);
      if (!res.ok) {
        const errorData = await res.json().catch(() => ({}));
        throw new Error(errorData.message || 'Login failed');
      }
      return await res.json();
    },
    onSuccess: (userData) => {
      queryClient.setQueryData(['/api/user'], userData);
    },
  });

  const registerMutation = useMutation({
    mutationFn: async (userData) => {
      const res = await apiRequest('POST', '/api/register', userData);
      if (!res.ok) {
        const errorData = await res.json().catch(() => ({}));
        throw new Error(errorData.message || 'Registration failed');
      }
      return await res.json();
    },
    onSuccess: (userData) => {
      queryClient.setQueryData(['/api/user'], userData);
    },
  });

  const logoutMutation = useMutation({
    mutationFn: async () => {
      const res = await apiRequest('POST', '/api/logout');
      if (!res.ok) {
        throw new Error('Logout failed');
      }
    },
    onSuccess: () => {
      queryClient.setQueryData(['/api/user'], null);
    },
  });

  return (
    <AuthContext.Provider
      value={{
        user: user ?? null,
        isLoading,
        error,
        loginMutation,
        logoutMutation,
        registerMutation,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}