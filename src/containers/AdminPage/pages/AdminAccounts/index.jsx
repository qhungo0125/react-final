import React from 'react';
import useStudents from './state/useStudents';
import useTeachers from './state/useTeachers';
import AccountsTable from '../../../../components/AdminTable/Accounts/accounts';
import { blockAccounts, unblockAccounts } from '../../../../api/admin';

const AdminAccounts = () => {
  const [pagination, setPagination] = React.useState({
    page: 1,
    limit: 10,
  });
  const { students, refetchStudents } = useStudents(pagination);
  const onBlock = React.useCallback(async ({ id, isLocked }) => {
    if (isLocked) {
      const response = await unblockAccounts({ id });
    } else {
      const response = await blockAccounts({ id });
    }
    refetchStudents();
  }, []);

  return <AccountsTable onBlock={onBlock} accounts={students.data || []} />;
};

export default AdminAccounts;
