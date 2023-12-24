import React from 'react';
import { ADMIN_PAGES } from '../../../constant';
import AdminAccounts from './AdminAccounts';
import AdminClasses from './AdminClasses';
import MappingStudents from './MappingStudents';

const Admin = (props) => {
  const { name } = props;
  switch (name) {
    case ADMIN_PAGES[0]:
      return <AdminAccounts />;
    case ADMIN_PAGES[1]:
      return <AdminClasses />;
    case ADMIN_PAGES[2]:
      return <MappingStudents/>
    default:
      return;
  }
};

export default Admin;
