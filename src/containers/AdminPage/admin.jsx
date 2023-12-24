import React from 'react';
import { ADMIN_PAGES } from '../../constant';
import AdminAccounts from './pages/AdminAccounts';
import AdminClasses from './pages/AdminClasses';

const Admin = (props) => {
  const { name } = props;

  switch (name) {
    case ADMIN_PAGES[0]:
      return <AdminAccounts />;
    case ADMIN_PAGES[1]:
      return <AdminClasses />;
    case ADMIN_PAGES[2]:
      return;

    default:
      return;
  }
};

export default Admin;
