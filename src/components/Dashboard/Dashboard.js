import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { fetchAccountSummary, fetchRecentTrades, fetchMarketSummary } from '../../services/api';
import Chart from 'chart.js/auto';

function Dashboard({ user }) {
  const [accountSummary, setAccountSummary] = useState(null);
  const [recentTrades, setRecentTrades] = useState([]);
  const [marketSummary, setMarketSummary] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let portfolioChartInstance = null;
    
    const fetchDashboardData = async () => {
      setLoading(true);
      setError(null);
      
      try {
        // Fetch account summary data
        const summaryData = await fetchAccountSummary();
        setAccountSummary(summaryData);
        
        // Fetch recent trades
        const tradesData = await fetchRecentTrades();
        setRecentTrades(tradesData);
        
        // Fetch market summary
        const marketData = await fetchMarketSummary();
        setMarketSummary(marketData);
        
        // Initialize portfolio chart
        if (summaryData && summaryData.portfolioHistory) {
          const ctx = document.getElementById('portfolioChart');
          
          if (ctx) {
            // Destroy existing chart if it exists
            if (portfolioChartInstance) {
              portfolioChartInstance.destroy();
            }
            
            portfolioChartInstance = new Chart(ctx, {
              type: 'line',
              data: {
                labels: summaryData.portfolioHistory.dates,
                datasets: [{
                  label: 'Portfolio Value',
                  data: summaryData.portfolioHistory.values,
                  fill: true,
                  backgroundColor: 'rgba(75, 192, 192, 0.2)',
                  borderColor: 'rgba(75, 192, 192, 1)',
                  tension: 0.1
                }]
              },
              options: {
                responsive: true,
                plugins: {
                  title: {
                    display: true,
                    text: 'Portfolio Performance (Last 30 Days)'
                  },
                  tooltip: {
                    mode: 'index',
                    intersect: false,
                    callbacks: {
                      label: function(context) {
                        return `Value: $${context.parsed.y.toFixed(2)}`;
                      }
                    }
                  }
                },
                scales: {
                  y: {
                    beginAtZero: false,
                    ticks: {
                      callback: function(value) {
                        return '$' + value;
                      }
                    }
                  }
                }
              }
            });
          }
        }
      } catch (err) {
        console.error('Error fetching dashboard data:', err);
        setError('Failed to load dashboard data. Please try again later.');
      } finally {
        setLoading(false);
      }
    };
    
    fetchDashboardData();
    
    // Cleanup function to destroy chart when component unmounts
    return () => {
      if (portfolioChartInstance) {
        portfolioChartInstance.destroy();
      }
    };
  }, []);

  if (loading) {
    return (
      <div className="dashboard-loading">
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
        <p>Loading your dashboard...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="dashboard-error alert alert-danger">
        <i className="fas fa-exclamation-triangle me-2"></i>
        {error}
        <button 
          className="btn btn-outline-danger mt-3"
          onClick={() => window.location.reload()}
        >
          Retry
        </button>
      </div>
    );
  }

  return (
    <div className="dashboard-container">
      <div className="dashboard-header">
        <h1>Welcome back, {user?.firstName || 'Trader'}</h1>
        <p className="text-muted">Here's your trading overview for today</p>
      </div>
      
      <div className="row mb-4">
        <div className="col-md-3">
          <div className="card summary-card">
            <div className="card-body">
              <h5 className="card-title">Account Balance</h5>
              <h2 className="card-value">${accountSummary?.balance.toFixed(2) || '0.00'}</h2>
              <p className={`change-indicator ${accountSummary?.balanceChange >= 0 ? 'positive' : 'negative'}`}>
                <i className={`fas fa-arrow-${accountSummary?.balanceChange >= 0 ? 'up' : 'down'} me-1`}></i>
                {Math.abs(accountSummary?.balanceChange || 0).toFixed(2)}% today
              </p>
            </div>
          </div>
        </div>
        
        <div className="col-md-3">
          <div className="card summary-card">
            <div className="card-body">
              <h5 className="card-title">Portfolio Value</h5>
              <h2 className="card-value">${accountSummary?.portfolioValue.toFixed(2) || '0.00'}</h2>
              <p className={`change-indicator ${accountSummary?.portfolioChange >= 0 ? 'positive' : 'negative'}`}>
                <i className={`fas fa-arrow-${accountSummary?.portfolioChange >= 0 ? 'up' : 'down'} me-1`}></i>
                {Math.abs(accountSummary?.portfolioChange || 0).toFixed(2)}% today
              </p>
            </div>
          </div>
        </div>
        
        <div className="col-md-3">
          <div className="card summary-card">
            <div className="card-body">
              <h5 className="card-title">Open Positions</h5>
              <h2 className="card-value">{accountSummary?.openPositions || 0}</h2>
              <p className="text-muted">Across {accountSummary?.activeMarkets || 0} markets</p>
            </div>
          </div>
        </div>
        
        <div className="col-md-3">
          <div className="card summary-card">
            <div className="card-body">
              <h5 className="card-title">Today's P/L</h5>
              <h2 className={`card-value ${accountSummary?.todayPL >= 0 ? 'text-success' : 'text-danger'}`}>
                ${Math.abs(accountSummary?.todayPL || 0).toFixed(2)}
                <small>{accountSummary?.todayPL >= 0 ? ' profit' : ' loss'}</small>
              </h2>
              <p className="text-muted">From {accountSummary?.todayTrades || 0} trades</p>
            </div>
          </div>
        </div>
      </div>
      
      <div className="row mb-4">
        <div className="col-md-8">
          <div className="card">
            <div className="card-header d-flex justify-content-between align-items-center">
              <h5 className="mb-0">Portfolio Performance</h5>
              <div className="btn-group">
                <button type="button" className="btn btn-sm btn-outline-secondary active">30d</button>
                <button type="button" className="btn btn-sm btn-outline-secondary">90d</button>
                <button type="button" className="btn btn-sm btn-outline-secondary">1y</button>
                <button type="button" className="btn btn-sm btn-outline-secondary">All</button>
              </div>
            </div>
            <div className="card-body">
              <canvas id="portfolioChart" height="250"></canvas>
            </div>
          </div>
        </div>
        
        <div className="col-md-4">
          <div className="card">
            <div className="card-header">
              <h5 className="mb-0">Market Summary</h5>
            </div>
            <div className="card-body p-0">
              <ul className="list-group list-group-flush">
                {marketSummary.map((market, index) => (
                  <li key={index} className="list-group-item d-flex justify-content-between align-items-center">
                    <div>
                      <span className="market-symbol">{market.symbol}</span>
                      <small className="d-block text-muted">{market.name}</small>
                    </div>
                    <div className="text-end">
                      <div className="market-price">${market.price.toFixed(2)}</div>
                      <small className={`d-block ${market.change >= 0 ? 'text-success' : 'text-danger'}`}>
                        <i className={`fas fa-arrow-${market.change >= 0 ? 'up' : 'down'} me-1`}></i>
                        {Math.abs(market.change).toFixed(2)}%
                      </small>
                    </div>
                  </li>
                ))}
              </ul>
              <div className="text-center p-3">
                <Link to="/market" className="btn btn-outline-primary btn-sm">View All Markets</Link>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <div className="row">
        <div className="col-md-12">
          <div className="card">
            <div className="card-header d-flex justify-content-between align-items-center">
              <h5 className="mb-0">Recent Transactions</h5>
              <Link to="/portfolio" className="btn btn-sm btn-outline-primary">View All</Link>
            </div>
            <div className="card-body p-0">
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
                      <th>Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {recentTrades.length > 0 ? (
                      recentTrades.map((trade, index) => (
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
                          <td>${(trade.quantity * trade.price).toFixed(2)}</td>
                          <td>
                            <span className={`badge bg-${
                              trade.status === 'COMPLETED' ? 'success' : 
                              trade.status === 'PENDING' ? 'warning' : 'danger'
                            }`}>
                              {trade.status}
                            </span>
                          </td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td colSpan="7" className="text-center py-3">
                          No recent transactions found
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
