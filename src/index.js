import React from 'react';
import ReactDOM from 'react-dom/client';
import './styles/App.css';
import App from './App';

async function prepareApp() {
  // Only start the mock server in development
  if (process.env.NODE_ENV !== 'production') {
    try {
      const { startMockServer } = await import('./mockApi/mockServer');
      await startMockServer();
      console.log('Mock API server started successfully');
    } catch (error) {
      console.error('Failed to start mock server:', error);
      // Continue loading the app even if mock server fails
    }
  }

  const root = ReactDOM.createRoot(document.getElementById('root'));
  root.render(
    <React.StrictMode>
      <App />
    </React.StrictMode>
  );
}

// Initialize the application
prepareApp();
