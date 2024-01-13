import React from 'react';
import AccountsTable from '../../../../components/AdminTable/Accounts/accounts';
import {
  blockAccounts,
  mappingStudent,
  unMappingStudent,
  unblockAccounts,
} from '../../../../api/admin';

import { Dropdown } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import { Link, useSearchParams } from 'react-router-dom';
import useAccounts from './state/useAccounts';

const MyComboBox = ({ selectedRole, onSelectRole }) => {
  const { t } = useTranslation();
  return (
    <Dropdown onSelect={onSelectRole}>
      <Dropdown.Toggle variant='primary' id='dropdown-basic'>
        {t(`label.${selectedRole}`)}
      </Dropdown.Toggle>
      <Dropdown.Menu>
        <Dropdown.Item eventKey={'student'}>{t('label.student')}</Dropdown.Item>
        <Dropdown.Item eventKey={'teacher'}>{t('label.teacher')}</Dropdown.Item>
      </Dropdown.Menu>
    </Dropdown>
  );
};

const AdminAccounts = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const { t } = useTranslation();
  const [selectedRole, setSelectedRole] = React.useState('student');
  const [pagination, setPagination] = React.useState({
    page: 1,
    limit: 10,
  });

  const { accounts, pages, refetchAccounts } = useAccounts({
    ...pagination,
    role: selectedRole,
  });

  React.useEffect(() => {
    setSearchParams({
      page: 1,
      limit: 10,
    });
  }, []);

  React.useEffect(() => {
    setPagination((current) => ({
      ...current,
      page: +searchParams.get('page') || 1,
      limit: +searchParams.get('limit') || 10,
    }));
  }, [searchParams.get('page'), searchParams.get('limit')]);

  // this func can be use to lock account for both teacher and student
  const onBlock = React.useCallback(async ({ id, isLocked }) => {
    try {
      console.log({ id, isLocked });
      if (isLocked) {
        const response = await unblockAccounts({ id });
        alert(response.success ? 'success' : 'fail');
      } else {
        const response = await blockAccounts({ id });
        alert(response.success ? 'success' : 'fail');
      }
    } catch (err) {
      console.error(err);
    } finally {
      refetchAccounts();
    }
  }, []);

  const onMapping = React.useCallback(async ({ studentId, mapCode }) => {
    try {
      console.log({ studentId, mapCode });
      const response = await mappingStudent({ studentId, mapCode });
      if (response.error) {
        alert(response.error.message);
      }
    } catch (err) {
      console.error(err);
    } finally {
      refetchAccounts();
    }
  }, []);

  const onUnMapping = React.useCallback(async ({ studentId }) => {
    try {
      const response = await unMappingStudent({ studentId });
      if (response.error) {
        alert(response.error.message);
      }
    } catch (err) {
      console.error(err);
    } finally {
      refetchAccounts();
    }
  }, []);

  return (
    <>
      <MyComboBox
        selectedRole={selectedRole}
        onSelectRole={(eventKey) => {
          setSelectedRole(eventKey);
          setPagination({
            page: 1,
            limit: 10,
          });
          setSearchParams({
            page: 1,
            limit: 10,
          });
        }}
      />

      <AccountsTable
        type={selectedRole}
        onMapping={onMapping}
        onUnMapping={onUnMapping}
        onBlock={onBlock}
        accounts={accounts.data || []}
      />
      <div className='d-flex justify-content-center'>
        <nav aria-label='Page navigation example'>
          <ul className='pagination'>
            <li className='page-item'>
              <Link
                className='page-link'
                to={`?page=${
                  pagination.page - 1 > 0 ? pagination.page - 1 : 1
                }&limit=${pagination.limit}`}
              >
                {t('label.button.previous')}
              </Link>
            </li>
            {pages.map((pageIndex) => {
              return (
                <li key={pageIndex} className='page-item'>
                  <Link
                    className={
                      pagination.page === pageIndex
                        ? 'page-link active'
                        : 'page-link'
                    }
                    to={`?page=${pageIndex}&limit=${pagination.limit}`}
                  >
                    {pageIndex}
                  </Link>
                </li>
              );
            })}
            <li className='page-item'>
              <Link
                className='page-link'
                to={`?page=${
                  +pagination.page + 1 > pages.length
                    ? pages.length
                    : +pagination.page + 1
                }&limit=${pagination.limit}`}
              >
                {t('label.button.next')}
              </Link>
            </li>
          </ul>
        </nav>
      </div>
    </>
  );
};

export default AdminAccounts;
