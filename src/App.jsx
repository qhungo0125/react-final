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
import AddMember from './containers/AddMember';
import { MenuProvider } from './context/MenuContext';
import './lang/i18n';
import ProfilePage from './containers/ProfilePage';
// import bootstrap from 'bootstrap';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/js/bootstrap.js';
import PageWithHeader from './components/PageWithHeader';

const router = createBrowserRouter([
  { path: '/login', Component: () => <Login /> },
  { path: '/register', Component: () => <Register /> },
  { path: '/', Component: () => <Home /> },
  {
    path: '/class/people',
    Component: () => (
      <PageWithHeader>
        <Page />
      </PageWithHeader>
    ),
  },
  {
    path: '/class/general',
    Component: () => (
      <PageWithHeader>
        <Page />
      </PageWithHeader>
    ),
  },
  {
    path: '/class/grade',
    Component: () => (
      <PageWithHeader>
        <Page />
      </PageWithHeader>
    ),
  },
  {
    path: '/class/stream',
    Component: () => (
      <PageWithHeader>
        <Page />
      </PageWithHeader>
    ),
  },
  {
    path: '/add_class',
    Component: () => (
      <PageWithHeader>
        <Page />
      </PageWithHeader>
    ),
  },
  {
    path: '/dashboard',
    Component: () => (
      <PageWithHeader>
        <Page />
      </PageWithHeader>
    ),
  },
  {
    path: '/class',
    Component: () => (
      <PageWithHeader>
        <Page />
      </PageWithHeader>
    ),
  },
  { path: '/confirm-register', Component: () => <ConfirmRegister /> },
  { path: '/forgot-password', Component: () => <ForgotPassword /> },
  { path: '/confirm-password', Component: () => <ConfirmPassword /> },
  { path: '/class/add', Component: () => <AddMember /> },
  {
    path: '/profile',
    Component: () => (
      <PageWithHeader>
        <ProfilePage />
      </PageWithHeader>
    ),
  },
  { path: '*', Component: () => <NotFound /> },
]);

export default function App() {
  return (
    <GlobalContext>
      <MenuProvider>
        <RouterProvider router={router} />
      </MenuProvider>
    </GlobalContext>
  );
}
