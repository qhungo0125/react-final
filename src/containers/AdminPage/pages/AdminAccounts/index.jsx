import React from 'react';
import useStudents from './state/useStudents';
import useTeachers from './state/useTeachers';
import AccountsTable from '../../../../components/AdminTable/Accounts/accounts';

const AdminAccounts = () => {
  const { students } = useStudents({ page: 1, limit: 10 });
  const { teachers } = useTeachers();
  console.log(students, teachers);
  return <AccountsTable accounts={students.data || []} />;
};

export default AdminAccounts;
