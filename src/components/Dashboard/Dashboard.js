import React from 'react';
import { Link } from 'react-router-dom';

function Dashboard({ user }) {
  // Mock data for dashboard display
  const accountSummary = {
    balance: user?.balance || 10000,
    portfolioValue: 65432.78,
    totalValue: (user?.balance || 10000) + 65432.78,
    dayChange: 1243.56,
    dayChangePercent: 1.87
  };

  const recentTrades = [
    {
      date: '2023-04-10T14:32:15',
      symbol: 'AAPL',
      type: 'BUY',
      quantity: 10,
      price: 185.92,
      total: 1859.20,
      status: 'COMPLETED'
    },
    {
      date: '2023-04-09T10:22:35',
      symbol: 'MSFT',
      type: 'SELL',
      quantity: 5,
      price: 410.38,
      total: 2051.90,
      status: 'COMPLETED'
    },
    {
      date: '2023-04-07T15:48:22',
      symbol: 'TSLA',
      type: 'BUY',
      quantity: 8,
      price: 177.67,
      total: 1421.36,
      status: 'COMPLETED'
    }
  ];

  const marketIndices = [
    {
      symbol: 'SPX',
      name: 'S&P 500',
      price: 5123.45,
      change: 0.64
    },
    {
      symbol: 'DJI',
      name: 'Dow Jones',
      price: 38762.34,
      change: 0.38
    },
    {
      symbol: 'IXIC',
      name: 'NASDAQ',
      price: 16982.11,
      change: 0.58
    }
  ];

  return (
    <div className="container py-4">
      <div className="row">
        <div className="col-12">
          <h2 className="mb-4">Welcome back, {user?.firstName || 'Trader'}!</h2>
          
          <div className="row g-4">
            <div className="col-md-3">
              <div className="dashboard-card">
                <h5 className="card-title">Account Balance</h5>
                <h3 className="text-primary">${accountSummary.balance.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</h3>
                <p className="text-muted">Available for trading</p>
              </div>
            </div>
            
            <div className="col-md-3">
              <div className="dashboard-card">
                <h5 className="card-title">Portfolio Value</h5>
                <h3 className="text-success">${accountSummary.portfolioValue.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</h3>
                <p className="text-muted">Current holdings</p>
              </div>
            </div>
            
            <div className="col-md-3">
              <div className="dashboard-card">
                <h5 className="card-title">Total Assets</h5>
                <h3 className="text-primary">${accountSummary.totalValue.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</h3>
                <p className="text-muted">Balance + Portfolio</p>
              </div>
            </div>
            
            <div className="col-md-3">
              <div className="dashboard-card">
                <h5 className="card-title">Today's Change</h5>
                <h3 className="text-success">+${accountSummary.dayChange.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</h3>
                <p className="text-success">+{accountSummary.dayChangePercent}%</p>
              </div>
            </div>
          </div>
          
          <div className="row mt-4">
            <div className="col-md-8">
              <div className="dashboard-card">
                <div className="d-flex justify-content-between align-items-center mb-4">
                  <h4 className="card-title mb-0">Recent Transactions</h4>
                  <Link to="/portfolio" className="btn btn-sm btn-outline-primary">View All</Link>
                </div>
                
                <div className="table-responsive">
                  <table className="table table-hover">
                    <thead>
                      <tr>
                        <th>Date</th>
                        <th>Symbol</th>
                        <th>Type</th>
                        <th>Quantity</th>
                        <th>Price</th>
                        <th>Total</th>
                      </tr>
                    </thead>
                    <tbody>
                      {recentTrades.map((trade, index) => (
                        <tr key={index}>
                          <td>{new Date(trade.date).toLocaleDateString()}</td>
                          <td>{trade.symbol}</td>
                          <td>
                            <span className={`badge ${trade.type === 'BUY' ? 'bg-success' : 'bg-danger'}`}>
                              {trade.type}
                            </span>
                          </td>
                          <td>{trade.quantity}</td>
                          <td>${trade.price.toFixed(2)}</td>
                          <td>${trade.total.toFixed(2)}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
            
            <div className="col-md-4">
              <div className="dashboard-card">
                <h4 className="card-title mb-4">Market Indices</h4>
                
                <div className="list-group">
                  {marketIndices.map((index, i) => (
                    <div key={i} className="list-group-item border-0 px-0">
                      <div className="d-flex justify-content-between align-items-center">
                        <div>
                          <h6 className="mb-0">{index.name}</h6>
                          <small className="text-muted">{index.symbol}</small>
                        </div>
                        <div className="text-end">
                          <div>{index.price.toLocaleString('en-US', { minimumFractionDigits: 2 })}</div>
                          <small className={index.change >= 0 ? 'text-success' : 'text-danger'}>
                            {index.change >= 0 ? '+' : ''}{index.change}%
                          </small>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
                
                <div className="mt-3 text-center">
                  <Link to="/market" className="btn btn-outline-primary btn-sm">
                    View Market Data
                  </Link>
                </div>
              </div>
              
              <div className="dashboard-card mt-4">
                <h4 className="card-title mb-3">Quick Actions</h4>
                
                <div className="d-grid gap-2">
                  <Link to="/trading" className="btn btn-primary">
                    <i className="fas fa-exchange-alt me-2"></i>
                    Trade Now
                  </Link>
                  <Link to="/portfolio" className="btn btn-outline-primary">
                    <i className="fas fa-briefcase me-2"></i>
                    Manage Portfolio
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
