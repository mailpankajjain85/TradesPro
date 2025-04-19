/**
 * Authentication service for TradesPro application
 * Handles user authentication, registration, and session management
 */

const API_BASE_URL = process.env.REACT_APP_API_BASE_URL || 'http://localhost:8000/api';

/**
 * Login a user with email and password
 * @param {string} email - User's email
 * @param {string} password - User's password
 * @returns {Promise<Object>} User data and token
 */
export const loginUser = async (email, password) => {
  try {
    const response = await fetch(`${API_BASE_URL}/auth/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, password }),
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => {
        return { message: 'Login failed. Please check your credentials.' };
      });
      throw new Error(errorData.message || 'Login failed. Please try again.');
    }

    const data = await response.json();
    
    // Store token in localStorage for future authenticated requests
    localStorage.setItem('token', data.token);
    
    return data;
  } catch (error) {
    console.error('Login error:', error);
    throw error;
  }
};

/**
 * Register a new user
 * @param {Object} userData - User registration data
 * @returns {Promise<Object>} Registration confirmation
 */
export const registerUser = async (userData) => {
  try {
    const response = await fetch(`${API_BASE_URL}/auth/register`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(userData),
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => {
        return { message: 'Registration failed. Please try again.' };
      });
      throw new Error(errorData.message || 'Registration failed. Please try again.');
    }

    return await response.json();
  } catch (error) {
    console.error('Registration error:', error);
    throw error;
  }
};

/**
 * Logout the current user
 * @returns {Promise<Object>} Logout confirmation
 */
export const logoutUser = async () => {
  try {
    const token = localStorage.getItem('token');
    
    if (!token) {
      // User is already logged out
      return { success: true };
    }
    
    const response = await fetch(`${API_BASE_URL}/auth/logout`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
    });

    // Clear token from localStorage regardless of the response
    localStorage.removeItem('token');
    
    if (!response.ok) {
      const errorData = await response.json().catch(() => {
        return { message: 'Logout failed. Please try again.' };
      });
      throw new Error(errorData.message || 'Logout failed. Please try again.');
    }

    return await response.json();
  } catch (error) {
    console.error('Logout error:', error);
    // Still clear the token even if logout API call fails
    localStorage.removeItem('token');
    // Return success for client side, as we've cleared the token
    return { success: true };
  }
};

/**
 * Check if user is authenticated
 * @returns {Promise<Object>} Authentication status and user data
 */
export const checkAuthStatus = async () => {
  try {
    const token = localStorage.getItem('token');
    
    if (!token) {
      // No token found, user is not authenticated
      return { authenticated: false };
    }
    
    const response = await fetch(`${API_BASE_URL}/auth/verify`, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      // Token is invalid or expired
      localStorage.removeItem('token');
      return { authenticated: false };
    }

    const data = await response.json();
    return {
      authenticated: true,
      user: data.user,
    };
  } catch (error) {
    console.error('Auth verification error:', error);
    // If verification fails, assume user is not authenticated
    localStorage.removeItem('token');
    return { authenticated: false };
  }
};

/**
 * Request password reset for a user
 * @param {string} email - User's email
 * @returns {Promise<Object>} Password reset confirmation
 */
export const requestPasswordReset = async (email) => {
  try {
    const response = await fetch(`${API_BASE_URL}/auth/reset-password`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email }),
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => {
        return { message: 'Password reset request failed. Please try again.' };
      });
      throw new Error(errorData.message || 'Password reset request failed. Please try again.');
    }

    return await response.json();
  } catch (error) {
    console.error('Password reset request error:', error);
    throw error;
  }
};

export default {
  loginUser,
  registerUser,
  logoutUser,
  checkAuthStatus,
  requestPasswordReset
};
