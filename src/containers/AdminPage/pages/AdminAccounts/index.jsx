import React from 'react';
import useStudents from './state/useStudents';
import useTeachers from './state/useTeachers';
import AccountsTable from '../../../../components/AdminTable/Accounts/accounts';
import {
  blockAccounts,
  mappingStudent,
  unblockAccounts,
} from '../../../../api/admin';

import { Dropdown } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';

const MyComboBox = ({ selectedRole, onSelectRole }) => {
  const { t } = useTranslation();
  return (
    <Dropdown onSelect={onSelectRole}>
      <Dropdown.Toggle variant="primary" id="dropdown-basic">
        {selectedRole || 'Select Role'}
      </Dropdown.Toggle>

      <Dropdown.Menu>
        <Dropdown.Item eventKey={t('label.student')}>
          {t('label.student')}
        </Dropdown.Item>
        <Dropdown.Item eventKey={t('label.teacher')}>
          {t('label.teacher')}
        </Dropdown.Item>
      </Dropdown.Menu>
    </Dropdown>
  );
};

const AdminAccounts = () => {
  const [pagination, setPagination] = React.useState({
    page: 1,
    limit: 10,
  });
  const { t } = useTranslation();
  const { students, refetchStudents } = useStudents(pagination);
  const { teachers, refetchTeachers } = useTeachers(pagination);
  const [selectedRole, setSelectedRole] = React.useState(t('label.student'));

  // this func can be use to lock account for both teacher and student
  const onBlock = React.useCallback(async ({ id, isLocked }) => {
    try {
      console.log({ id, isLocked });
      if (isLocked) {
        const response = await unblockAccounts({ id });
      } else {
        const response = await blockAccounts({ id });
      }
    } catch (err) {
      console.error(err);
    } finally {
      refetchStudents();
      refetchTeachers();
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
    <>
      <MyComboBox
        selectedRole={selectedRole}
        onSelectRole={(eventKey) => {
          console.log('run set ', eventKey);
          setSelectedRole(eventKey);
        }}
      />

      <AccountsTable
        type={selectedRole}
        onMapping={onMapping}
        onBlock={onBlock}
        accounts={
          selectedRole === t('label.student')
            ? students.data || []
            : teachers.data || []
        }
      />
    </>
  );
};

export default AdminAccounts;
