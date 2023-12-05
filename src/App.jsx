import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import './App.css';
import Register from './containers/Register';
import Home from './containers/Home';
import Page from './containers';
import AddClass from './containers/AddClass';
import NotFound from './components/NotFound';
import Login from './containers/Login/index';
import GlobalContext from './context';
import ConfirmRegister from './containers/ConfirmRegister';
import ForgotPassword from './containers/ForgotPassword';
import ConfirmPassword from './containers/ConfirmPassword';

const router = createBrowserRouter([
  { path: '/login', Component: () => <Login /> },
  { path: '/register', Component: () => <Register /> },
  { path: '/', Component: () => <Home /> },
  { path: '/dashboard', Component: () => <Page /> },
  { path: '/class', Component: () => <Page /> },
  { path: '/add_class', Component: () => <Page /> },
  { path: '/confirm-register', Component: () => <ConfirmRegister /> },
  { path: '/forgot-password', Component: () => <ForgotPassword /> },
  { path: '/confirm-password', Component: () => <ConfirmPassword /> },
  { path: '*', Component: () => <NotFound /> },
]);

export default function App() {
  return (
    <GlobalContext>
      <RouterProvider router={router} />
    </GlobalContext>
  );
}
