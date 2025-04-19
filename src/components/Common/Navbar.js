import React, { useState, useEffect, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';

function Navbar({ isAuthenticated, user }) {
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const profileMenuRef = useRef(null);
  const navigate = useNavigate();
  const { logoutMutation } = useAuth();
  
  // Close the profile menu when clicking outside
  useEffect(() => {
    function handleClickOutside(event) {
      if (profileMenuRef.current && !profileMenuRef.current.contains(event.target)) {
        setShowProfileMenu(false);
      }
    }
    
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);
  
  const handleLogout = () => {
    logoutMutation.mutate(undefined, {
      onSuccess: () => {
        setShowProfileMenu(false);
        navigate('/auth');
      }
    });
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
                <div className="position-relative" ref={profileMenuRef}>
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
                    <div className="profile-dropdown shadow">
                      <div className="profile-header">
                        <h6 className="mb-0">{user?.firstName} {user?.lastName}</h6>
                        <p className="small text-muted mb-0">{user?.email}</p>
                      </div>
                      <div className="profile-menu">
                        <Link to="/dashboard" className="profile-item">
                          <i className="fas fa-user me-2"></i>
                          Profile
                        </Link>
                        <Link to="/dashboard" className="profile-item">
                          <i className="fas fa-cog me-2"></i>
                          Settings
                        </Link>
                        <Link to="/dashboard" className="profile-item">
                          <i className="fas fa-question-circle me-2"></i>
                          Help
                        </Link>
                        <div className="dropdown-divider"></div>
                        <button 
                          className="profile-item text-danger w-100 text-start bg-transparent border-0" 
                          onClick={handleLogout}
                          disabled={logoutMutation.isLoading}
                        >
                          <i className="fas fa-sign-out-alt me-2"></i>
                          {logoutMutation.isLoading ? 'Logging out...' : 'Logout'}
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </>
          ) : (
            <ul className="navbar-nav ms-auto">
              <li className="nav-item">
                <Link className="nav-link" to="/auth">
                  <i className="fas fa-sign-in-alt me-1"></i>
                  Login / Register
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
