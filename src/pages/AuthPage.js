import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';

function LoginForm() {
  const [formData, setFormData] = useState({
    username: '',
    password: '',
  });
  const { loginMutation } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  
  // Get the redirect path from location state, or default to '/'
  const from = location.state?.from || '/';
  
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };
  
  const handleSubmit = (e) => {
    e.preventDefault();
    loginMutation.mutate(formData, {
      onSuccess: () => {
        navigate(from, { replace: true });
      },
    });
  };
  
  return (
    <form onSubmit={handleSubmit} className="mb-4">
      <h3 className="mb-4 text-primary">Log In</h3>
      
      <div className="mb-3">
        <label htmlFor="username" className="form-label">Username</label>
        <input
          type="text"
          className="form-control"
          id="username"
          name="username"
          value={formData.username}
          onChange={handleChange}
          required
        />
      </div>
      
      <div className="mb-3">
        <label htmlFor="password" className="form-label">Password</label>
        <input
          type="password"
          className="form-control"
          id="password"
          name="password"
          value={formData.password}
          onChange={handleChange}
          required
        />
      </div>
      
      <div className="d-grid">
        <button 
          type="submit" 
          className="btn btn-primary" 
          disabled={loginMutation.isLoading}
        >
          {loginMutation.isLoading ? 'Logging in...' : 'Log In'}
        </button>
      </div>
      
      {loginMutation.isError && (
        <div className="alert alert-danger mt-3">
          {loginMutation.error.message || 'Login failed. Please try again.'}
        </div>
      )}
    </form>
  );
}

function RegisterForm() {
  const [formData, setFormData] = useState({
    username: '',
    password: '',
    firstName: '',
    lastName: '',
    email: '',
  });
  const { registerMutation } = useAuth();
  const navigate = useNavigate();
  
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };
  
  const handleSubmit = (e) => {
    e.preventDefault();
    registerMutation.mutate(formData, {
      onSuccess: () => {
        navigate('/dashboard');
      },
    });
  };
  
  return (
    <form onSubmit={handleSubmit}>
      <h3 className="mb-4 text-primary">Create Account</h3>
      
      <div className="row">
        <div className="col-md-6 mb-3">
          <label htmlFor="firstName" className="form-label">First Name</label>
          <input
            type="text"
            className="form-control"
            id="firstName"
            name="firstName"
            value={formData.firstName}
            onChange={handleChange}
            required
          />
        </div>
        
        <div className="col-md-6 mb-3">
          <label htmlFor="lastName" className="form-label">Last Name</label>
          <input
            type="text"
            className="form-control"
            id="lastName"
            name="lastName"
            value={formData.lastName}
            onChange={handleChange}
            required
          />
        </div>
      </div>
      
      <div className="mb-3">
        <label htmlFor="email" className="form-label">Email</label>
        <input
          type="email"
          className="form-control"
          id="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          required
        />
      </div>
      
      <div className="mb-3">
        <label htmlFor="username" className="form-label">Username</label>
        <input
          type="text"
          className="form-control"
          id="reg-username"
          name="username"
          value={formData.username}
          onChange={handleChange}
          required
        />
      </div>
      
      <div className="mb-3">
        <label htmlFor="password" className="form-label">Password</label>
        <input
          type="password"
          className="form-control"
          id="reg-password"
          name="password"
          value={formData.password}
          onChange={handleChange}
          required
        />
      </div>
      
      <div className="d-grid">
        <button 
          type="submit" 
          className="btn btn-primary" 
          disabled={registerMutation.isLoading}
        >
          {registerMutation.isLoading ? 'Creating Account...' : 'Create Account'}
        </button>
      </div>
      
      {registerMutation.isError && (
        <div className="alert alert-danger mt-3">
          {registerMutation.error.message || 'Registration failed. Please try again.'}
        </div>
      )}
    </form>
  );
}

function AuthPage() {
  const { user, isLoading } = useAuth();
  const navigate = useNavigate();
  
  // Redirect to dashboard if already logged in
  useEffect(() => {
    if (user && !isLoading) {
      navigate('/dashboard');
    }
  }, [user, isLoading, navigate]);
  
  if (isLoading) {
    return (
      <div className="loading-container">
        <div className="spinner"></div>
      </div>
    );
  }
  
  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-md-10">
          <div className="card auth-card shadow">
            <div className="row g-0">
              <div className="col-md-6 p-4">
                <LoginForm />
                <hr className="my-4" />
                <RegisterForm />
              </div>
              
              <div className="col-md-6">
                <div className="hero-section h-100 d-flex flex-column justify-content-center p-4">
                  <h2 className="mb-3">Welcome to TradesPro</h2>
                  <p className="mb-4">
                    Your advanced trading platform for stocks, cryptocurrencies, and more.
                    Access real-time market data, manage your portfolio, and execute trades with ease.
                  </p>
                  <ul className="list-unstyled">
                    <li className="mb-2">
                      <i className="fas fa-chart-line me-2"></i>
                      Real-time market data
                    </li>
                    <li className="mb-2">
                      <i className="fas fa-shield-alt me-2"></i>
                      Secure trading platform
                    </li>
                    <li className="mb-2">
                      <i className="fas fa-chart-pie me-2"></i>
                      Portfolio analytics
                    </li>
                    <li className="mb-2">
                      <i className="fas fa-bolt me-2"></i>
                      Fast trade execution
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AuthPage;