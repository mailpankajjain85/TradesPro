import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { logoutUser } from '../../services/auth';

function Navbar({ isAuthenticated, user }) {
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const navigate = useNavigate();
  
  const handleLogout = async () => {
    try {
      await logoutUser();
      navigate('/login');
    } catch (error) {
      console.error('Logout failed:', error);
    }
  };
  
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-primary sticky-top">
      <div className="container-fluid">
        <Link className="navbar-brand" to="/">
          <i className="fas fa-chart-line me-2"></i>
          TradesPro
        </Link>
        
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        
        <div className="collapse navbar-collapse" id="navbarNav">
          {isAuthenticated ? (
            <>
              <ul className="navbar-nav me-auto">
                <li className="nav-item">
                  <Link className="nav-link" to="/dashboard">
                    <i className="fas fa-tachometer-alt me-1"></i>
                    Dashboard
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/trading">
                    <i className="fas fa-exchange-alt me-1"></i>
                    Trading
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/portfolio">
                    <i className="fas fa-briefcase me-1"></i>
                    Portfolio
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/market">
                    <i className="fas fa-globe me-1"></i>
                    Markets
                  </Link>
                </li>
              </ul>
              
              <div className="d-flex align-items-center">
                <div className="position-relative">
                  <button
                    className="btn btn-outline-light d-flex align-items-center"
                    onClick={() => setShowProfileMenu(!showProfileMenu)}
                  >
                    <div className="avatar-circle me-2">
                      {user?.firstName?.charAt(0)}{user?.lastName?.charAt(0)}
                    </div>
                    <span className="d-none d-md-inline-block">
                      {user?.firstName} {user?.lastName}
                    </span>
                    <i className="fas fa-caret-down ms-2"></i>
                  </button>
                  
                  {showProfileMenu && (
                    <div className="profile-dropdown">
                      <div className="profile-header">
                        <h6 className="mb-0">{user?.firstName} {user?.lastName}</h6>
                        <p className="small text-muted mb-0">{user?.email}</p>
                      </div>
                      <div className="profile-menu">
                        <a href="#" className="profile-item">
                          <i className="fas fa-user me-2"></i>
                          Profile
                        </a>
                        <a href="#" className="profile-item">
                          <i className="fas fa-cog me-2"></i>
                          Settings
                        </a>
                        <a href="#" className="profile-item">
                          <i className="fas fa-question-circle me-2"></i>
                          Help
                        </a>
                        <div className="dropdown-divider"></div>
                        <a href="#" className="profile-item text-danger" onClick={handleLogout}>
                          <i className="fas fa-sign-out-alt me-2"></i>
                          Logout
                        </a>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </>
          ) : (
            <ul className="navbar-nav ms-auto">
              <li className="nav-item">
                <Link className="nav-link" to="/login">
                  <i className="fas fa-sign-in-alt me-1"></i>
                  Login
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/register">
                  <i className="fas fa-user-plus me-1"></i>
                  Register
                </Link>
              </li>
            </ul>
          )}
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
