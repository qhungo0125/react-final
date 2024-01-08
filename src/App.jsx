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
import { socket } from './socket';
import AdminPage from './containers/AdminPage';
import CustomizedSnackbars from './components/Notification/Notification';

const router = createBrowserRouter([
  { path: '/login', Component: () => <Login /> },
  { path: '/register', Component: () => <Register /> },
  { path: '/', Component: () => <Home /> },
  {
    path: '/class/:classId/people',
    Component: () => (
      <PageWithHeader>
        <Page tab={'people'} />
      </PageWithHeader>
    ),
  },
  {
    path: '/class/:classId/grade',
    Component: () => (
      <PageWithHeader>
        <Page tab={'grade'} />
      </PageWithHeader>
    ),
  },
  {
    path: '/class/:classId/grade/upload',
    Component: () => (
      <PageWithHeader>
        <Page tab={'grade_upload'} />
      </PageWithHeader>
    ),
  },
  {
    path: '/class/:classId/grade/students',
    Component: () => (
      <PageWithHeader>
        <Page tab={'grade_students'} />
      </PageWithHeader>
    ),
  },
  {
    path: '/class/:classId/grade/structure',
    Component: () => (
      <PageWithHeader>
        <Page tab={'grade_structure'} />
      </PageWithHeader>
    ),
  },
  {
    path: '/class/:classId/grade/review',
    Component: () => (
      <PageWithHeader>
        <Page tab={'grade_review'} />
      </PageWithHeader>
    ),
  },
  {
    path: '/class/:classId/grade/review/:reviewId',
    Component: () => (
      <PageWithHeader>
        <Page tab={'grade_review_detail'} />
      </PageWithHeader>
    ),
  },
  {
    path: '/class/:classId/stream',
    Component: () => (
      <PageWithHeader>
        <Page tab={'stream'} />
      </PageWithHeader>
    ),
  },
  {
    path: '/add_class',
    Component: () => (
      <PageWithHeader>
        <Page mainTab={'add_class'} />
      </PageWithHeader>
    ),
  },
  // {
  //   path: '/dashboard',
  //   Component: () => (
  //     <PageWithHeader>
  //       <Page />
  //     </PageWithHeader>
  //   ),
  // },
  {
    path: '/classes',
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
  {
    path: '/admin',
    Component: () => <AdminPage />,
  },
  { path: '*', Component: () => <NotFound /> },
]);

export default function App() {
  console.log('effect run');
  React.useEffect(() => {
    const userId = localStorage.getItem('userid');
    if (userId) {
      // Emit 'userConnected' event with the user ID
      socket.emit('userConnected', userId);
    }

    socket.on('connect', () => {
      console.log('Connected to the server');
    });

    socket.on('welcome', (data) => {
      console.log('Received welcome event:', data.message);
      // Handle the welcome event as needed in your React component
    });

    socket.on('disconnect', () => {
      console.log('Disconnected from the server');
    });

    // Additional custom events can be handled here

    return () => {
      // Clean up the socket connection when the component unmounts
      socket.disconnect();
    };
  }, []);

  return (
    <GlobalContext>
      <MenuProvider>
        <RouterProvider router={router} />
        <CustomizedSnackbars />
      </MenuProvider>
    </GlobalContext>
  );
}
