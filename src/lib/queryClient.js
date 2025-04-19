// src/lib/queryClient.js
import { QueryClient } from '@tanstack/react-query';

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      retry: 1,
      staleTime: 5 * 60 * 1000, // 5 minutes
    },
  },
});

export const getQueryFn = ({ on401 = 'throw' } = {}) => {
  return async ({ queryKey }) => {
    const [endpoint] = queryKey;
    const options = {};

    const res = await apiRequest('GET', endpoint, null, options);
    
    if (res.status === 401) {
      if (on401 === 'returnNull') {
        return null;
      }
      throw new Error('Unauthorized');
    }
    
    if (!res.ok) {
      throw new Error(`API Error: ${res.status}`);
    }
    
    return res.json();
  };
};

export const apiRequest = async (method, url, data = null, options = {}) => {
  const config = {
    method,
    headers: {
      'Content-Type': 'application/json',
      ...options.headers,
    },
    credentials: 'include',
    ...options,
  };

  if (data && method !== 'GET') {
    config.body = JSON.stringify(data);
  }

  return await fetch(url, config);
};