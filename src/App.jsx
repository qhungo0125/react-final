import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import './App.css';
import Register from './containers/Register';
import Home from './containers/Home';
import Page from './containers';
import NotFound from './components/NotFound';
import Login from './containers/Login/index';
import GlobalContext from './context';

const router = createBrowserRouter([
  { path: '/login', Component: () => <Login /> },
  { path: '/register', Component: () => <Register /> },
  { path: '/', Component: () => <Home /> },
  { path: '/dashboard', Component: () => <Page /> },
  { path: '*', Component: () => <NotFound /> },
]);

export default function App() {
  return (
    <GlobalContext>
      <RouterProvider router={router} />;
    </GlobalContext>
  );
}
