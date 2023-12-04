import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
const env = process.env.NODE_ENV;

ReactDOM.createRoot(document.getElementById('root')).render(
  env === 'development' ? (
    <App />
  ) : (
    <React.StrictMode>
      <App />
    </React.StrictMode>
  ),
);
