import React from 'react';
import useStudents from './state/useStudents';
import useTeachers from './state/useTeachers';
import AccountsTable from '../../../../components/AdminTable/Accounts/accounts';
import {
  blockAccounts,
  mappingStudent,
  unblockAccounts,
} from '../../../../api/admin';

const AdminAccounts = () => {
  const [pagination, setPagination] = React.useState({
    page: 1,
    limit: 10,
  });
  const { students, refetchStudents } = useStudents(pagination);

  // this func can be use to lock account for both teacher and student
  const onBlock = React.useCallback(async ({ id, isLocked }) => {
    try {
      if (isLocked) {
        const response = await unblockAccounts({ id });
      } else {
        const response = await blockAccounts({ id });
      }
    } catch (err) {
      console.error(err);
    } finally {
      refetchStudents();
    }
  }, []);

  const onMapping = React.useCallback(async ({ studentId, mapCode }) => {
    try {
      console.log({ studentId, mapCode });
      await mappingStudent({ studentId, mapCode });
    } catch (err) {
      console.error(err);
    } finally {
      refetchStudents();
    }
  }, []);

  return (
    <AccountsTable
      onMapping={onMapping}
      onBlock={onBlock}
      accounts={students.data || []}
    />
  );
};

export default AdminAccounts;
