import { QueryClient } from '@tanstack/react-query';

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      retry: 1,
    },
  },
});

export const getQueryFn = ({ on401 = 'throw' } = {}) => {
  return async ({ queryKey }) => {
    const [endpoint] = queryKey;
    
    try {
      const response = await fetch(endpoint, {
        credentials: 'include', // Include cookies in the request
      });
      
      if (response.status === 401 && on401 === 'returnNull') {
        return null;
      }
      
      if (!response.ok) {
        throw new Error(`API error: ${response.status}`);
      }
      
      return await response.json();
    } catch (error) {
      console.error(`Error fetching ${endpoint}:`, error);
      throw error;
    }
  };
};

export const apiRequest = async (method, url, data = null, options = {}) => {
  const fetchOptions = {
    method,
    headers: {
      'Content-Type': 'application/json',
      ...options.headers,
    },
    credentials: 'include', // Include cookies in the request
  };
  
  if (data) {
    fetchOptions.body = JSON.stringify(data);
  }
  
  const response = await fetch(url, fetchOptions);
  
  if (!response.ok && !options.suppressErrors) {
    const errorData = await response.json().catch(() => ({}));
    const errorMessage = errorData.message || `HTTP error ${response.status}`;
    throw new Error(errorMessage);
  }
  
  return response;
};