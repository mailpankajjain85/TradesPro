import React, { useState, useEffect, useRef } from 'react';
import { fetchMarketData, executeTrade } from '../../services/trading';
import Chart from 'chart.js/auto';

function TradingView({ user }) {
  const [selectedSymbol, setSelectedSymbol] = useState('AAPL');
  const [marketData, setMarketData] = useState(null);
  const [timeframe, setTimeframe] = useState('1D'); // 1D, 1W, 1M, 3M, 1Y
  const [tradeType, setTradeType] = useState('BUY');
  const [quantity, setQuantity] = useState(1);
  const [orderType, setOrderType] = useState('MARKET');
  const [limitPrice, setLimitPrice] = useState('');
  const [loading, setLoading] = useState(true);
  const [executingTrade, setExecutingTrade] = useState(false);
  const [error, setError] = useState(null);
  const [tradeSuccess, setTradeSuccess] = useState(false);
  const [availableFunds, setAvailableFunds] = useState(0);
  const [estimatedCost, setEstimatedCost] = useState(0);
  const [watchlist, setWatchlist] = useState([
    { symbol: 'AAPL', name: 'Apple Inc.', current_price: 0, change_percent: 0 },
    { symbol: 'MSFT', name: 'Microsoft Corporation', current_price: 0, change_percent: 0 },
    { symbol: 'GOOGL', name: 'Alphabet Inc.', current_price: 0, change_percent: 0 },
    { symbol: 'AMZN', name: 'Amazon.com, Inc.', current_price: 0, change_percent: 0 },
    { symbol: 'TSLA', name: 'Tesla, Inc.', current_price: 0, change_percent: 0 }
  ]);

  const chartRef = useRef(null);
  const priceChartInstance = useRef(null);
  const volumeChartInstance = useRef(null);

  // Fetch market data when symbol or timeframe changes
  useEffect(() => {
    const getMarketData = async () => {
      setLoading(true);
      setError(null);
      
      try {
        const data = await fetchMarketData(selectedSymbol, timeframe);
        setMarketData(data);
        
        // Update watchlist with current prices
        const updatedWatchlist = watchlist.map(item => {
          if (item.symbol === selectedSymbol) {
            return {
              ...item,
              current_price: data.meta.regularMarketPrice,
              change_percent: data.meta.regularMarketChangePercent
            };
          }
          return item;
        });
        setWatchlist(updatedWatchlist);
        
        // Update estimated cost
        if (data.meta.regularMarketPrice) {
          setEstimatedCost(data.meta.regularMarketPrice * quantity);
        }
        
        // Get available funds
        setAvailableFunds(user?.accountBalance || 10000);
      } catch (err) {
        console.error('Error fetching market data:', err);
        setError('Failed to load market data. Please try again.');
      } finally {
        setLoading(false);
      }
    };
    
    getMarketData();
  }, [selectedSymbol, timeframe]);

  // Create charts when marketData changes
  useEffect(() => {
    if (marketData && marketData.prices && marketData.prices.length > 0) {
      const priceCtx = document.getElementById('priceChart');
      const volumeCtx = document.getElementById('volumeChart');
      
      if (!priceCtx || !volumeCtx) return;
      
      // Destroy previous charts if they exist
      if (priceChartInstance.current) {
        priceChartInstance.current.destroy();
      }
      
      if (volumeChartInstance.current) {
        volumeChartInstance.current.destroy();
      }
      
      // Prepare data
      const labels = marketData.prices.map(point => new Date(point.date).toLocaleDateString());
      const priceData = marketData.prices.map(point => point.close);
      const volumeData = marketData.volumes.map(point => point.volume);
      
      // Create price chart
      priceChartInstance.current = new Chart(priceCtx, {
        type: 'line',
        data: {
          labels: labels,
          datasets: [{
            label: `${selectedSymbol} Price`,
            data: priceData,
            borderColor: 'rgb(75, 192, 192)',
            backgroundColor: 'rgba(75, 192, 192, 0.5)',
            borderWidth: 2,
            pointRadius: 0,
            pointHoverRadius: 5,
            tension: 0.1,
            fill: true
          }]
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          plugins: {
            legend: {
              display: false
            },
            tooltip: {
              mode: 'index',
              intersect: false,
              callbacks: {
                label: function(context) {
                  return `Price: $${context.parsed.y.toFixed(2)}`;
                }
              }
            }
          },
          scales: {
            x: {
              grid: {
                display: false
              }
            },
            y: {
              position: 'right',
              ticks: {
                callback: function(value) {
                  return '$' + value;
                }
              }
            }
          },
          interaction: {
            mode: 'index',
            intersect: false
          }
        }
      });
      
      // Create volume chart
      volumeChartInstance.current = new Chart(volumeCtx, {
        type: 'bar',
        data: {
          labels: labels,
          datasets: [{
            label: 'Volume',
            data: volumeData,
            backgroundColor: 'rgba(54, 162, 235, 0.5)',
            borderColor: 'rgba(54, 162, 235, 1)',
            borderWidth: 1
          }]
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          plugins: {
            legend: {
              display: false
            },
            tooltip: {
              mode: 'index',
              intersect: false,
              callbacks: {
                label: function(context) {
                  return `Volume: ${context.parsed.y.toLocaleString()}`;
                }
              }
            }
          },
          scales: {
            x: {
              display: false
            },
            y: {
              position: 'right',
              ticks: {
                callback: function(value) {
                  return value >= 1000000 
                    ? (value / 1000000).toFixed(1) + 'M' 
                    : value >= 1000 
                      ? (value / 1000).toFixed(1) + 'K' 
                      : value;
                }
              }
            }
          }
        }
      });
    }
    
    return () => {
      if (priceChartInstance.current) {
        priceChartInstance.current.destroy();
      }
      if (volumeChartInstance.current) {
        volumeChartInstance.current.destroy();
      }
    };
  }, [marketData]);

  // Update estimated cost when quantity or market data changes
  useEffect(() => {
    if (marketData && marketData.meta && marketData.meta.regularMarketPrice) {
      const price = orderType === 'LIMIT' ? parseFloat(limitPrice) || marketData.meta.regularMarketPrice : marketData.meta.regularMarketPrice;
      setEstimatedCost(price * quantity);
    }
  }, [quantity, marketData, orderType, limitPrice]);

  const handleSymbolChange = (symbol) => {
    setSelectedSymbol(symbol);
  };

  const handleQuantityChange = (e) => {
    const value = parseInt(e.target.value) || 1;
    if (value > 0) {
      setQuantity(value);
    }
  };

  const handleLimitPriceChange = (e) => {
    setLimitPrice(e.target.value);
  };

  const handleExecuteTrade = async () => {
    if (quantity <= 0) {
      setError('Quantity must be greater than 0');
      return;
    }
    
    if (orderType === 'LIMIT' && (!limitPrice || parseFloat(limitPrice) <= 0)) {
      setError('Please enter a valid limit price');
      return;
    }
    
    // Check if user has enough funds
    const totalCost = estimatedCost;
    if (tradeType === 'BUY' && totalCost > availableFunds) {
      setError('Insufficient funds to execute this trade');
      return;
    }
    
    setExecutingTrade(true);
    setError(null);
    setTradeSuccess(false);
    
    try {
      const tradeDetails = {
        symbol: selectedSymbol,
        quantity: quantity,
        type: tradeType,
        orderType: orderType,
        limitPrice: orderType === 'LIMIT' ? parseFloat(limitPrice) : null
      };
      
      const result = await executeTrade(tradeDetails);
      
      // Show success message
      setTradeSuccess(true);
      
      // Reset form
      setQuantity(1);
      setLimitPrice('');
      
      // Update available funds (this would normally happen via a full account refresh)
      if (tradeType === 'BUY') {
        setAvailableFunds(prev => prev - totalCost);
      } else {
        setAvailableFunds(prev => prev + totalCost);
      }
      
      // Clear success message after 5 seconds
      setTimeout(() => {
        setTradeSuccess(false);
      }, 5000);
    } catch (err) {
      console.error('Error executing trade:', err);
      setError(err.message || 'Failed to execute trade. Please try again.');
    } finally {
      setExecutingTrade(false);
    }
  };

  if (loading && !marketData) {
    return (
      <div className="trading-loading">
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Loading market data...</span>
        </div>
        <p>Loading market data...</p>
      </div>
    );
  }

  return (
    <div className="trading-view-container">
      <div className="row">
        <div className="col-md-9">
          <div className="card mb-4">
            <div className="card-header d-flex justify-content-between align-items-center">
              <div className="d-flex align-items-center">
                <h4 className="mb-0">{selectedSymbol}</h4>
                {marketData && marketData.meta && (
                  <div className="ms-3">
                    <span className="fs-5">${marketData.meta.regularMarketPrice.toFixed(2)}</span>
                    <span className={`ms-2 badge ${marketData.meta.regularMarketChangePercent >= 0 ? 'bg-success' : 'bg-danger'}`}>
                      {marketData.meta.regularMarketChangePercent >= 0 ? '+' : ''}
                      {marketData.meta.regularMarketChangePercent.toFixed(2)}%
                    </span>
                  </div>
                )}
              </div>
              <div className="btn-group">
                <button
                  type="button"
                  className={`btn btn-sm ${timeframe === '1D' ? 'btn-primary' : 'btn-outline-primary'}`}
                  onClick={() => setTimeframe('1D')}
                >
                  1D
                </button>
                <button
                  type="button"
                  className={`btn btn-sm ${timeframe === '1W' ? 'btn-primary' : 'btn-outline-primary'}`}
                  onClick={() => setTimeframe('1W')}
                >
                  1W
                </button>
                <button
                  type="button"
                  className={`btn btn-sm ${timeframe === '1M' ? 'btn-primary' : 'btn-outline-primary'}`}
                  onClick={() => setTimeframe('1M')}
                >
                  1M
                </button>
                <button
                  type="button"
                  className={`btn btn-sm ${timeframe === '3M' ? 'btn-primary' : 'btn-outline-primary'}`}
                  onClick={() => setTimeframe('3M')}
                >
                  3M
                </button>
                <button
                  type="button"
                  className={`btn btn-sm ${timeframe === '1Y' ? 'btn-primary' : 'btn-outline-primary'}`}
                  onClick={() => setTimeframe('1Y')}
                >
                  1Y
                </button>
              </div>
            </div>
            <div className="card-body">
              <div style={{ height: '300px' }}>
                <canvas id="priceChart"></canvas>
              </div>
              <div style={{ height: '100px' }}>
                <canvas id="volumeChart"></canvas>
              </div>
            </div>
          </div>
          
          <div className="row">
            <div className="col-md-6">
              <div className="card mb-4">
                <div className="card-header">
                  <h5 className="mb-0">Market Information</h5>
                </div>
                <div className="card-body">
                  {marketData && marketData.meta && (
                    <div className="row">
                      <div className="col-md-6">
                        <div className="mb-3">
                          <label className="small text-muted">Previous Close</label>
                          <div>${marketData.meta.regularMarketPreviousClose.toFixed(2)}</div>
                        </div>
                        <div className="mb-3">
                          <label className="small text-muted">Open</label>
                          <div>${marketData.meta.regularMarketOpen.toFixed(2)}</div>
                        </div>
                        <div className="mb-3">
                          <label className="small text-muted">Day's Range</label>
                          <div>${marketData.meta.regularMarketDayLow.toFixed(2)} - ${marketData.meta.regularMarketDayHigh.toFixed(2)}</div>
                        </div>
                      </div>
                      <div className="col-md-6">
                        <div className="mb-3">
                          <label className="small text-muted">Market Cap</label>
                          <div>
                            {marketData.meta.marketCap >= 1000000000000
                              ? `$${(marketData.meta.marketCap / 1000000000000).toFixed(2)}T`
                              : marketData.meta.marketCap >= 1000000000
                              ? `$${(marketData.meta.marketCap / 1000000000).toFixed(2)}B`
                              : `$${(marketData.meta.marketCap / 1000000).toFixed(2)}M`
                            }
                          </div>
                        </div>
                        <div className="mb-3">
                          <label className="small text-muted">Volume</label>
                          <div>
                            {marketData.meta.regularMarketVolume >= 1000000
                              ? `${(marketData.meta.regularMarketVolume / 1000000).toFixed(2)}M`
                              : `${(marketData.meta.regularMarketVolume / 1000).toFixed(2)}K`
                            }
                          </div>
                        </div>
                        <div className="mb-3">
                          <label className="small text-muted">52 Week Range</label>
                          <div>${marketData.meta.fiftyTwoWeekLow.toFixed(2)} - ${marketData.meta.fiftyTwoWeekHigh.toFixed(2)}</div>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
            
            <div className="col-md-6">
              <div className="card mb-4">
                <div className="card-header">
                  <h5 className="mb-0">Execute Trade</h5>
                </div>
                <div className="card-body">
                  {error && (
                    <div className="alert alert-danger" role="alert">
                      {error}
                    </div>
                  )}
                  
                  {tradeSuccess && (
                    <div className="alert alert-success" role="alert">
                      Trade executed successfully!
                    </div>
                  )}
                  
                  <div className="mb-3">
                    <label className="form-label">Available Funds</label>
                    <div className="input-group">
                      <span className="input-group-text">$</span>
                      <input
                        type="text"
                        className="form-control"
                        value={availableFunds.toFixed(2)}
                        disabled
                      />
                    </div>
                  </div>
                  
                  <div className="mb-3">
                    <label className="form-label">Trade Type</label>
                    <div className="btn-group w-100">
                      <button
                        type="button"
                        className={`btn ${tradeType === 'BUY' ? 'btn-success' : 'btn-outline-success'}`}
                        onClick={() => setTradeType('BUY')}
                      >
                        Buy
                      </button>
                      <button
                        type="button"
                        className={`btn ${tradeType === 'SELL' ? 'btn-danger' : 'btn-outline-danger'}`}
                        onClick={() => setTradeType('SELL')}
                      >
                        Sell
                      </button>
                    </div>
                  </div>
                  
                  <div className="mb-3">
                    <label className="form-label">Order Type</label>
                    <div className="btn-group w-100">
                      <button
                        type="button"
                        className={`btn ${orderType === 'MARKET' ? 'btn-primary' : 'btn-outline-primary'}`}
                        onClick={() => setOrderType('MARKET')}
                      >
                        Market
                      </button>
                      <button
                        type="button"
                        className={`btn ${orderType === 'LIMIT' ? 'btn-primary' : 'btn-outline-primary'}`}
                        onClick={() => setOrderType('LIMIT')}
                      >
                        Limit
                      </button>
                    </div>
                  </div>
                  
                  {orderType === 'LIMIT' && (
                    <div className="mb-3">
                      <label className="form-label">Limit Price</label>
                      <div className="input-group">
                        <span className="input-group-text">$</span>
                        <input
                          type="number"
                          step="0.01"
                          className="form-control"
                          placeholder="Enter limit price"
                          value={limitPrice}
                          onChange={handleLimitPriceChange}
                        />
                      </div>
                    </div>
                  )}
                  
                  <div className="mb-3">
                    <label className="form-label">Quantity</label>
                    <input
                      type="number"
                      className="form-control"
                      placeholder="Enter quantity"
                      value={quantity}
                      onChange={handleQuantityChange}
                      min="1"
                    />
                  </div>
                  
                  <div className="mb-3">
                    <label className="form-label">Estimated Total</label>
                    <div className="input-group">
                      <span className="input-group-text">$</span>
                      <input
                        type="text"
                        className="form-control"
                        value={estimatedCost.toFixed(2)}
                        disabled
                      />
                    </div>
                  </div>
                  
                  <button
                    type="button"
                    className={`btn btn-${tradeType === 'BUY' ? 'success' : 'danger'} w-100`}
                    onClick={handleExecuteTrade}
                    disabled={executingTrade}
                  >
                    {executingTrade ? (
                      <>
                        <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                        Processing...
                      </>
                    ) : (
                      `${tradeType} ${quantity} ${selectedSymbol} ${orderType === 'LIMIT' ? `@ $${limitPrice || 'Market Price'}` : 'at Market Price'}`
                    )}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        <div className="col-md-3">
          <div className="card mb-4">
            <div className="card-header">
              <h5 className="mb-0">Watchlist</h5>
            </div>
            <div className="card-body p-0">
              <ul className="list-group list-group-flush">
                {watchlist.map((item, index) => (
                  <li
                    key={index}
                    className={`list-group-item d-flex justify-content-between align-items-center ${selectedSymbol === item.symbol ? 'active bg-light' : ''}`}
                    style={{ cursor: 'pointer' }}
                    onClick={() => handleSymbolChange(item.symbol)}
                  >
                    <div>
                      <div className="fw-bold">{item.symbol}</div>
                      <small className="text-muted">{item.name}</small>
                    </div>
                    <div className="text-end">
                      <div>${item.current_price.toFixed(2)}</div>
                      <small className={`${item.change_percent >= 0 ? 'text-success' : 'text-danger'}`}>
                        <i className={`fas fa-arrow-${item.change_percent >= 0 ? 'up' : 'down'} me-1`}></i>
                        {Math.abs(item.change_percent).toFixed(2)}%
                      </small>
                    </div>
                  </li>
                ))}
              </ul>
              <div className="p-3">
                <button className="btn btn-outline-primary btn-sm w-100">
                  <i className="fas fa-plus me-1"></i> Add Symbol
                </button>
              </div>
            </div>
          </div>
          
          <div className="card">
            <div className="card-header">
              <h5 className="mb-0">Recent News</h5>
            </div>
            <div className="card-body p-0">
              <ul className="list-group list-group-flush">
                {marketData && marketData.news && marketData.news.map((item, index) => (
                  <li key={index} className="list-group-item">
                    <h6 className="mb-1">{item.title}</h6>
                    <p className="small mb-1">{item.summary}</p>
                    <div className="d-flex justify-content-between align-items-center">
                      <small className="text-muted">{new Date(item.published_at).toLocaleDateString()}</small>
                      <a href={item.url} target="_blank" rel="noreferrer" className="btn btn-link btn-sm p-0">Read more</a>
                    </div>
                  </li>
                ))}
                
                {(!marketData || !marketData.news || marketData.news.length === 0) && (
                  <li className="list-group-item text-center py-4">
                    <i className="fas fa-newspaper fs-4 text-muted mb-2"></i>
                    <p className="mb-0">No recent news for {selectedSymbol}</p>
                  </li>
                )}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default TradingView;
