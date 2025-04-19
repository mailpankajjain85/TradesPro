import React, { useState } from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';

function LoginForm() {
  const { loginMutation } = useAuth();
  const [formData, setFormData] = useState({
    username: '',
    password: '',
  });
  
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    loginMutation.mutate(formData);
  };
  
  return (
    <form onSubmit={handleSubmit} className="mb-4">
      <h2 className="mb-4">Login</h2>
      
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
      
      <button 
        type="submit" 
        className="btn btn-primary w-100"
        disabled={loginMutation.isLoading}
      >
        {loginMutation.isLoading ? 'Logging in...' : 'Login'}
      </button>
      
      {loginMutation.isError && (
        <div className="alert alert-danger mt-3">
          {loginMutation.error.message}
        </div>
      )}
    </form>
  );
}

function RegisterForm() {
  const { registerMutation } = useAuth();
  const [formData, setFormData] = useState({
    username: '',
    password: '',
    firstName: '',
    lastName: '',
    email: '',
  });
  
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    registerMutation.mutate(formData);
  };
  
  return (
    <form onSubmit={handleSubmit}>
      <h2 className="mb-4">Create Account</h2>
      
      <div className="mb-3">
        <label htmlFor="reg-username" className="form-label">Username</label>
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
        <label htmlFor="reg-password" className="form-label">Password</label>
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
      
      <button 
        type="submit" 
        className="btn btn-success w-100"
        disabled={registerMutation.isLoading}
      >
        {registerMutation.isLoading ? 'Creating Account...' : 'Create Account'}
      </button>
      
      {registerMutation.isError && (
        <div className="alert alert-danger mt-3">
          {registerMutation.error.message}
        </div>
      )}
    </form>
  );
}

function AuthPage() {
  const { user, isLoading } = useAuth();

  // If already authenticated, redirect to the main dashboard
  if (!isLoading && user) {
    return <Navigate to="/" />;
  }
  
  return (
    <div className="container mt-5">
      <div className="row">
        <div className="col-md-6">
          <div className="card shadow-sm">
            <div className="card-body p-4">
              <LoginForm />
              <hr className="my-4" />
              <RegisterForm />
            </div>
          </div>
        </div>
        
        <div className="col-md-6">
          <div className="card bg-primary text-white shadow-sm">
            <div className="card-body p-4">
              <h2 className="card-title mb-4">Welcome to TradesPro</h2>
              <p className="card-text">
                TradesPro is a comprehensive trading platform designed for modern
                investors. With advanced charting, real-time data, and powerful 
                analytics, you'll have all the tools you need to make informed 
                trading decisions.
              </p>
              <ul className="list-unstyled mt-4">
                <li className="mb-2">
                  <i className="fas fa-chart-line me-2"></i> 
                  Real-time market data
                </li>
                <li className="mb-2">
                  <i className="fas fa-wallet me-2"></i> 
                  Portfolio management
                </li>
                <li className="mb-2">
                  <i className="fas fa-exchange-alt me-2"></i> 
                  Efficient trade execution
                </li>
                <li className="mb-2">
                  <i className="fas fa-analytics me-2"></i> 
                  Advanced analytics
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AuthPage;