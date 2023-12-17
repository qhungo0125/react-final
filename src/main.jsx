import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { MenuProvider } from './context/MenuContext';
const env = process.env.NODE_ENV;

ReactDOM.createRoot(document.getElementById('root')).render(
  env === 'development' ? (
    <MenuProvider>
      <App />
    </MenuProvider>
  ) : (
    <React.StrictMode>
      <MenuProvider>
        <App />
      </MenuProvider>
    </React.StrictMode>
  ),
);
