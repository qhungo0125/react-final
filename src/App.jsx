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
import ConfirmPassword from './containers/ConfirmPassword';
import AddMember from './containers/AddMember';
import { MenuProvider } from './context/MenuContext';
import './lang/i18n';
import ProfilePage from './containers/ProfilePage';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/js/bootstrap.js';
import PageWithHeader from './components/PageWithHeader';
import React from 'react';
import AdminPage from './containers/AdminPage';
import CustomizedSnackbars from './components/Notification/Notification';
import AuthenticationRoute from './containers/AuthenticationRoute/AuthenticationRoute';
import AdminRoute from './containers/AuthenticationRoute/AdminRoute';

const router = createBrowserRouter([
  { path: '/login', Component: () => <Login /> },
  { path: '/register', Component: () => <Register /> },
  { path: '/', Component: () => <Home /> },
  {
    path: '/class/:classId/people',
    Component: () => (
      <AuthenticationRoute>
        <PageWithHeader>
          <Page tab={'people'} />
        </PageWithHeader>
      </AuthenticationRoute>
    ),
  },
  {
    path: '/class/:classId/grade',
    Component: () => (
      <AuthenticationRoute>
        <PageWithHeader>
          <Page tab={'grade'} />
        </PageWithHeader>
      </AuthenticationRoute>
    ),
  },
  {
    path: '/class/:classId/grade/upload',
    Component: () => (
      <AuthenticationRoute>
        <PageWithHeader>
          <Page tab={'grade_upload'} />
        </PageWithHeader>
      </AuthenticationRoute>
    ),
  },
  {
    path: '/class/:classId/grade/students',
    Component: () => (
      <AuthenticationRoute>
        <PageWithHeader>
          <Page tab={'grade_students'} />
        </PageWithHeader>
      </AuthenticationRoute>
    ),
  },
  {
    path: '/class/:classId/grade/structure',
    Component: () => (
      <AuthenticationRoute>
        <PageWithHeader>
          <Page tab={'grade_structure'} />
        </PageWithHeader>
      </AuthenticationRoute>
    ),
  },
  {
    path: '/class/:classId/grade/review',
    Component: () => (
      <AuthenticationRoute>
        <PageWithHeader>
          <Page tab={'grade_review'} />
        </PageWithHeader>
      </AuthenticationRoute>
    ),
  },
  {
    path: '/class/:classId/grade/review/:reviewId',
    Component: () => (
      <AuthenticationRoute>
        <PageWithHeader>
          <Page tab={'grade_review_detail'} />
        </PageWithHeader>
      </AuthenticationRoute>
    ),
  },
  {
    path: '/class/:classId/stream',
    Component: () => (
      <AuthenticationRoute>
        <PageWithHeader>
          <Page tab={'stream'} />
        </PageWithHeader>
      </AuthenticationRoute>
    ),
  },
  {
    path: '/add_class',
    Component: () => (
      <AuthenticationRoute>
        <PageWithHeader>
          <Page mainTab={'add_class'} />
        </PageWithHeader>
      </AuthenticationRoute>
    ),
  },
  {
    path: '/classes',
    Component: () => (
      <AuthenticationRoute>
        <PageWithHeader>
          <Page />
        </PageWithHeader>
      </AuthenticationRoute>
    ),
  },
  { path: '/confirm-register', Component: () => <ConfirmRegister /> },
  { path: '/forgot-password', Component: () => <ForgotPassword /> },
  { path: '/confirm-password', Component: () => <ConfirmPassword /> },
  { path: '/class/add', Component: () => <AddMember /> },
  {
    path: '/profile',
    Component: () => (
      <AuthenticationRoute>
        <PageWithHeader>
          <ProfilePage />
        </PageWithHeader>
      </AuthenticationRoute>
    ),
  },
  {
    path: '/admin',
    Component: () => (
      <AuthenticationRoute>
        <AdminRoute>
          <AdminPage />
        </AdminRoute>
      </AuthenticationRoute>
    ),
  },
  { path: '*', Component: () => <NotFound /> },
]);

export default function App() {
  return (
    <GlobalContext>
      <CustomizedSnackbars />
      <MenuProvider>
        <RouterProvider router={router} />
      </MenuProvider>
    </GlobalContext>
  );
}
