import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import './App.css';
import Register from './containers/Register';
import Home from './containers/Home';
import Page from './containers';
import NotFound from './components/NotFound';
import Login from './containers/Login/index';
import GlobalContext from './context';
import ConfirmRegister from './containers/ConfirmRegister';
import ForgotPassword from './containers/ForgotPassword';

const router = createBrowserRouter([
  { path: '/login', Component: () => <Login /> },
  { path: '/register', Component: () => <Register /> },
  { path: '/', Component: () => <Home /> },
  { path: '/dashboard', Component: () => <Page /> },
  { path: '/confirm-register', Component: () => <ConfirmRegister /> },
  { path: '/forgot-password', Component: () => <ForgotPassword /> },
  // { path: '/confirm-password', Component: () => <ConfirmRegister /> },
  { path: '*', Component: () => <NotFound /> },
]);

export default function App() {
  return (
    <GlobalContext>
      <RouterProvider router={router} />
    </GlobalContext>
  );
}
