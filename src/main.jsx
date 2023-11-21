import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';

import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Login from './containers/Login/index';
import Register from './containers/Register/index';
import Page from './containers/index';
import NotFound from './components/NotFound';
import Home from './containers/Home';

const router = createBrowserRouter([
  { path: '/login', Component: () => <Login /> },
  { path: '/register', Component: () => <Register /> },
  { path: '/', Component: () => <Home /> },
  // { path: '/', Component: () => <Login /> },
  { path: '/dashboard', Component: () => <Page /> },
  { path: '*', Component: () => <NotFound /> },
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router} />;
  </React.StrictMode>,
);
