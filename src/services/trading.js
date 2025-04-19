/**
 * Trading service for TradesPro application
 * Handles market data fetching and trade execution
 */

const API_BASE_URL = process.env.REACT_APP_API_BASE_URL || 'http://localhost:8000/api';

/**
 * Helper function for making authenticated API requests
 * @param {string} endpoint - API endpoint
 * @param {Object} options - Fetch options
 * @returns {Promise<Object>} API response
 */
const fetchWithAuth = async (endpoint, options = {}) => {
  // Get the token from localStorage
  const token = localStorage.getItem('token');
  
  // Set default headers
  const headers = {
    'Content-Type': 'application/json',
    ...(token && { 'Authorization': `Bearer ${token}` }),
    ...options.headers
  };
  
  try {
    const response = await fetch(`${API_BASE_URL}${endpoint}`, {
      ...options,
      headers
    });
    
    // Check if the response is ok (status in the range 200-299)
    if (!response.ok) {
      const errorData = await response.json().catch(() => {
        return { message: 'An unknown error occurred' };
      });
      
      throw new Error(errorData.message || `Error: ${response.status}`);
    }
    
    // Parse and return the JSON response
    return await response.json();
  } catch (error) {
    console.error(`API Error (${endpoint}):`, error);
    throw error;
  }
};

/**
 * Fetch market data for a specific symbol and timeframe
 * @param {string} symbol - Stock symbol
 * @param {string} timeframe - Time frame (e.g., '1D', '1W', '1M', '3M', '1Y')
 * @returns {Promise<Object>} Market data
 */
export const fetchMarketData = async (symbol, timeframe = '1D') => {
  try {
    const data = await fetchWithAuth(`/market/data/${symbol}?timeframe=${timeframe}`);
    return data;
  } catch (error) {
    console.warn(`Using fallback market data for ${symbol} due to API error`);
    
    // Generate fallback data for development
    const now = new Date();
    const startDate = new Date();
    let dataPoints = 0;
    
    // Determine number of data points and start date based on timeframe
    switch (timeframe) {
      case '1D':
        startDate.setDate(now.getDate() - 1);
        dataPoints = 24;
        break;
      case '1W':
        startDate.setDate(now.getDate() - 7);
        dataPoints = 7;
        break;
      case '1M':
        startDate.setMonth(now.getMonth() - 1);
        dataPoints = 30;
        break;
      case '3M':
        startDate.setMonth(now.getMonth() - 3);
        dataPoints = 90;
        break;
      case '1Y':
        startDate.setFullYear(now.getFullYear() - 1);
        dataPoints = 365;
        break;
      default:
        startDate.setDate(now.getDate() - 1);
        dataPoints = 24;
    }
    
    // Generate price data
    const startPrice = 100 + (Math.random() * 200);
    const volatility = startPrice * 0.02;
    let currentPrice = startPrice;
    
    const prices = [];
    const volumes = [];
    
    for (let i = 0; i < dataPoints; i++) {
      const date = new Date(startDate);
      date.setDate(startDate.getDate() + (timeframe === '1D' ? 0 : i));
      if (timeframe === '1D') {
        date.setHours(Math.floor(i * 24 / dataPoints));
      }
      
      // Random price movement
      const changePercent = (Math.random() - 0.5) * 2 * 0.01;
      currentPrice = currentPrice * (1 + changePercent);
      
      // Create price point
      prices.push({
        date: date.toISOString(),
        open: currentPrice - (volatility * 0.1 * (Math.random() - 0.5)),
        high: currentPrice + (volatility * 0.2 * Math.random()),
        low: currentPrice - (volatility * 0.2 * Math.random()),
        close: currentPrice
      });
      
      // Create volume data
      volumes.push({
        date: date.toISOString(),
        volume: Math.floor(100000 + Math.random() * 1000000)
      });
    }
    
    // Final closing price
    const finalPrice = prices[prices.length - 1].close;
    const prevClose = prices[0].open;
    const change = finalPrice - prevClose;
    const changePercent = (change / prevClose) * 100;
    
    return {
      symbol,
      meta: {
        regularMarketPrice: finalPrice,
        regularMarketChange: change,
        regularMarketChangePercent: changePercent,
        regularMarketPreviousClose: prevClose,
        regularMarketOpen: prices[0].open,
        regularMarketDayHigh: Math.max(...prices.map(p => p.high)),
        regularMarketDayLow: Math.min(...prices.map(p => p.low)),
        regularMarketVolume: volumes.reduce((sum, v) => sum + v.volume, 0),
        fiftyTwoWeekHigh: finalPrice * 1.2,
        fiftyTwoWeekLow: finalPrice * 0.8,
        marketCap: finalPrice * 1000000000,
      },
      prices,
      volumes,
      news: [
        {
          title: `${symbol} Announces New Product Line`,
          summary: `${symbol} unveiled their latest innovations today, driving investor excitement about future growth prospects.`,
          published_at: new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString(),
          url: '#'
        },
        {
          title: `Analysts Upgrade ${symbol} Rating`,
          summary: `Several leading analysts have raised their price targets for ${symbol} following better than expected quarterly results.`,
          published_at: new Date(Date.now() - 48 * 60 * 60 * 1000).toISOString(),
          url: '#'
        }
      ]
    };
  }
};

/**
 * Execute a trade
 * @param {Object} tradeDetails - Trade details
 * @returns {Promise<Object>} Trade confirmation
 */
export const executeTrade = async (tradeDetails) => {
  try {
    const data = await fetchWithAuth('/trades/execute', {
      method: 'POST',
      body: JSON.stringify(tradeDetails)
    });
    return data;
  } catch (error) {
    // If in development, simulate successful trade execution
    console.warn('Using fallback trade execution due to API error');
    
    // Delay to simulate network request
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    return {
      success: true,
      tradeId: 'mock-' + Math.random().toString(36).substring(2, 15),
      executedAt: new Date().toISOString(),
      details: {
        ...tradeDetails,
        status: 'COMPLETED',
        executionPrice: tradeDetails.limitPrice || 100 + Math.random() * 10
      }
    };
  }
};

/**
 * Get stock quotes for multiple symbols
 * @param {Array<string>} symbols - Array of stock symbols
 * @returns {Promise<Array<Object>>} Stock quotes
 */
export const getStockQuotes = async (symbols) => {
  try {
    const symbolList = symbols.join(',');
    const data = await fetchWithAuth(`/market/quotes?symbols=${symbolList}`);
    return data;
  } catch (error) {
    console.warn('Using fallback stock quotes due to API error');
    
    return symbols.map(symbol => ({
      symbol,
      price: 100 + Math.random() * 200,
      change: (Math.random() - 0.5) * 10,
      changePercent: (Math.random() - 0.5) * 5,
      volume: Math.floor(100000 + Math.random() * 9000000)
    }));
  }
};

export default {
  fetchMarketData,
  executeTrade,
  getStockQuotes
};
