import React from 'react';

function Footer() {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="footer bg-light mt-auto py-3">
      <div className="container">
        <div className="row">
          <div className="col-md-4">
            <h5 className="mb-3">TradesPro</h5>
            <p className="text-muted mb-0">
              A comprehensive trading platform for tracking market data, executing trades, and managing your investment portfolio.
            </p>
          </div>
          
          <div className="col-md-2">
            <h6 className="mb-3">Platform</h6>
            <ul className="list-unstyled">
              <li><a href="/dashboard" className="text-decoration-none text-muted">Dashboard</a></li>
              <li><a href="/trading" className="text-decoration-none text-muted">Trading</a></li>
              <li><a href="/portfolio" className="text-decoration-none text-muted">Portfolio</a></li>
              <li><a href="/market" className="text-decoration-none text-muted">Market Data</a></li>
            </ul>
          </div>
          
          <div className="col-md-2">
            <h6 className="mb-3">Resources</h6>
            <ul className="list-unstyled">
              <li><a href="#" className="text-decoration-none text-muted">Learning Center</a></li>
              <li><a href="#" className="text-decoration-none text-muted">API Documentation</a></li>
              <li><a href="#" className="text-decoration-none text-muted">Market News</a></li>
              <li><a href="#" className="text-decoration-none text-muted">FAQ</a></li>
            </ul>
          </div>
          
          <div className="col-md-2">
            <h6 className="mb-3">Company</h6>
            <ul className="list-unstyled">
              <li><a href="#" className="text-decoration-none text-muted">About Us</a></li>
              <li><a href="#" className="text-decoration-none text-muted">Careers</a></li>
              <li><a href="#" className="text-decoration-none text-muted">Contact</a></li>
              <li><a href="#" className="text-decoration-none text-muted">Blog</a></li>
            </ul>
          </div>
          
          <div className="col-md-2">
            <h6 className="mb-3">Legal</h6>
            <ul className="list-unstyled">
              <li><a href="#" className="text-decoration-none text-muted">Terms of Service</a></li>
              <li><a href="#" className="text-decoration-none text-muted">Privacy Policy</a></li>
              <li><a href="#" className="text-decoration-none text-muted">Security</a></li>
              <li><a href="#" className="text-decoration-none text-muted">Licenses</a></li>
            </ul>
          </div>
        </div>
        
        <div className="border-top mt-4 pt-3">
          <div className="row align-items-center">
            <div className="col-md-6">
              <p className="mb-0 text-muted">
                &copy; {currentYear} TradesPro. All rights reserved.
              </p>
            </div>
            <div className="col-md-6 text-md-end">
              <ul className="list-inline mb-0">
                <li className="list-inline-item">
                  <a href="#" className="text-muted text-decoration-none">
                    <i className="fab fa-twitter"></i>
                  </a>
                </li>
                <li className="list-inline-item ms-3">
                  <a href="#" className="text-muted text-decoration-none">
                    <i className="fab fa-facebook"></i>
                  </a>
                </li>
                <li className="list-inline-item ms-3">
                  <a href="#" className="text-muted text-decoration-none">
                    <i className="fab fa-linkedin"></i>
                  </a>
                </li>
                <li className="list-inline-item ms-3">
                  <a href="#" className="text-muted text-decoration-none">
                    <i className="fab fa-github"></i>
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
