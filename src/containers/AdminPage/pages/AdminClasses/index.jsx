import React from 'react';
import Classes from '../../../../components/AdminTable/Classes/classes';
import useClasses from './state/useClasses';
import {
  activeClass,
  createInvitationCode,
  deactiveClass,
  removeInvitationCode,
} from '../../../../api/admin';
import { Link, useSearchParams } from 'react-router-dom';
import FilterAltIcon from '@mui/icons-material/FilterAlt';
import SortIcon from '@mui/icons-material/Sort';
import { Dropdown } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';

const StatusCombobox = ({ selectedRole, onSelectRole }) => {
  const { t } = useTranslation();
  return (
    <Dropdown onSelect={onSelectRole}>
      <Dropdown.Toggle variant='primary' id='dropdown-basic'>
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

const NameCombobox = ({ selectedRole, onSelectRole }) => {
  const { t } = useTranslation();
  return (
    <Dropdown onSelect={onSelectRole}>
      <Dropdown.Toggle variant='primary' id='dropdown-basic'>
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

const AdminClasses = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [pagination, setPagination] = React.useState({
    page: 1,
    limit: 10,
  });
  const [openSort, setOpenSort] = React.useState(false);
  const [openFilter, setOpenFilter] = React.useState(false);

  const { classes, refetchClasses, pages } = useClasses(pagination);

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

  const onCreateCode = React.useCallback(async ({ classId }) => {
    console.log('onCreateCode', classId);

    try {
      const response = await createInvitationCode({ classId });
      console.log(response);
      if (response.error) {
        alert(response.error.message);
        return;
      }
    } catch (error) {
      console.error(error);
    } finally {
      refetchClasses();
    }
  }, []);

  const onRemoveCode = React.useCallback(async ({ classId }) => {
    console.log('onCreateCode', classId);

    try {
      const response = await removeInvitationCode({ classId });
      console.log(response);
      if (response.error) {
        alert(response.error.message);
        return;
      }
    } catch (error) {
      console.error(error);
    } finally {
      refetchClasses();
    }
  }, []);

  const updateClassStatus = React.useCallback(
    async ({ classId, isActived }) => {
      if (!classId) {
        console.error('classId is required');
      }

      try {
        let response;
        if (isActived) {
          response = await activeClass({ classId });
        } else {
          response = await deactiveClass({ classId });
        }

        if (response.error) {
          alert(response.error.message);
          return;
        }
      } catch (error) {
        console.error(error);
      } finally {
        refetchClasses();
      }
    },
    [],
  );

  return (
    <>
      {openFilter && (
        <div
          style={{
            position: 'fixed',
            zIndex: 999,
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
          }}
        >
          <div
            className='rounded position-absolute p-4 border border-2 bg-white'
            style={{
              width: '25%',
              top: '40%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
              opacity: 1,
            }}
          >
            <h5 className='text-center'>Filter</h5>
            <div className='mb-4'>
              <label className='form-label'>Keywords</label>
              <input
                className='form-control'
                type='text'
                placeholder='advanced web...'
              />
            </div>
            <div className='mb-4'>
              <label className='form-label'>Status</label>
              <StatusCombobox />
            </div>
            <div className='d-flex justify-content-center gap-4'>
              <button
                onClick={(e) => {
                  setOpenFilter(false);
                }}
                className='btn btn-danger'
              >
                Close
              </button>
              <button className='btn btn-success'>Apply</button>
            </div>
          </div>
        </div>
      )}

      {openSort && (
        <div
          style={{
            position: 'fixed',
            zIndex: 999,
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
          }}
        >
          <div
            className='rounded position-absolute p-4 border border-2 bg-white'
            style={{
              width: '25%',
              top: '40%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
              opacity: 1,
            }}
          >
            <h5 className='text-center'>Sort</h5>
            <div className='mb-4'>
              <label className='form-label'>Name</label>
              <NameCombobox />
            </div>
            <div className='mb-4'>
              <label className='form-label'>Status</label>
              <StatusCombobox />
            </div>
            <div className='d-flex justify-content-center gap-4'>
              <button
                onClick={(e) => {
                  setOpenSort(false);
                }}
                className='btn btn-danger'
              >
                Close
              </button>
              <button className='btn btn-success'>Apply</button>
            </div>
          </div>
        </div>
      )}

      <div
        className={
          openFilter || openSort
            ? 'position-relative opacity-25'
            : 'position-relative'
        }
      >
        <div className='d-flex justify-content-end gap-4'>
          <button
            onClick={(e) => {
              setOpenFilter(true);
            }}
            className='btn btn-success'
          >
            <FilterAltIcon />
            filter
          </button>
          <button
            onClick={(e) => {
              setOpenSort(true);
            }}
            className='btn btn-success'
          >
            <SortIcon />
            sort
          </button>
        </div>

        <Classes
          classes={classes}
          onRemoveCode={onRemoveCode}
          onCreateCode={onCreateCode}
          updateClassStatus={updateClassStatus}
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
                  Previous
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
                  Next
                </Link>
              </li>
            </ul>
          </nav>
        </div>
      </div>
    </>
  );
};

export default AdminClasses;
