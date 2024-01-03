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
import { useTranslation } from 'react-i18next';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';

const FilterStatus = ({ selected, onSelect }) => {
  const { t } = useTranslation();
  return (
    <FormControl fullWidth>
      <Select
        value={selected}
        onChange={(e) => {
          onSelect(e.target.value);
        }}
      >
        <MenuItem value={true}>{t('admin.status.active')}</MenuItem>
        <MenuItem value={false}>{t('admin.status.inactive')}</MenuItem>
        <MenuItem value={'all'}>{t('admin.status.all')}</MenuItem>
      </Select>
    </FormControl>
  );
};

const SortStatus = ({ selected, onSelect }) => {
  const { t } = useTranslation();
  return (
    <FormControl fullWidth>
      <Select
        value={selected}
        onChange={(e) => {
          onSelect(e.target.value);
        }}
      >
        <MenuItem value={'desc'}>{t('admin.status.desc')}</MenuItem>
        <MenuItem value={'asc'}>{t('admin.status.asc')}</MenuItem>
      </Select>
    </FormControl>
  );
};

const NameCombobox = ({ selected, onSelect }) => {
  const { t } = useTranslation();
  return (
    <FormControl fullWidth>
      <Select
        value={selected}
        onChange={(e) => {
          onSelect(e.target.value);
        }}
      >
        <MenuItem value={'asc'}>{t('admin.asc')}</MenuItem>
        <MenuItem value={'desc'}>{t('admin.desc')}</MenuItem>
      </Select>
    </FormControl>
  );
};

const AdminClasses = () => {
  React.useEffect(() => {
    console.log('mount');
    return () => {
      console.log('unmount');
    };
  }, []);
  // sort state
  const [openSort, setOpenSort] = React.useState(false);
  const [sort, setSort] = React.useState({
    name: 'desc',
    status: 'asc',
  });

  // filter state
  const [openFilter, setOpenFilter] = React.useState(false);
  const [filter, setFilter] = React.useState({
    name: '',
    status: 'all',
  });

  // classes state
  const { classes, refetchClasses, pages, pagination } = useClasses({
    sort,
    filter,
  });

  // functions handlers
  const onCreateCode = React.useCallback(
    async ({ classId }) => {
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
        await refetchClasses();
      }
    },
    [refetchClasses],
  );

  const onRemoveCode = React.useCallback(
    async ({ classId }) => {
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
        await refetchClasses();
      }
    },
    [refetchClasses],
  );

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
        await refetchClasses();
      }
    },
    [refetchClasses],
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
                value={filter.name}
                onChange={(e) => {
                  setFilter((c) => ({ ...c, name: e.target.value }));
                }}
              />
            </div>
            <div className='mb-4'>
              <label className='form-label'>Status</label>
              <FilterStatus
                selected={filter.status}
                onSelect={(value) => {
                  setFilter((c) => ({ ...c, status: value }));
                }}
              />
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
              <button
                onClick={async (e) => {
                  await refetchClasses();
                }}
                className='btn btn-success'
              >
                Apply
              </button>
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
              <NameCombobox
                selected={sort.name}
                onSelect={(value) => {
                  setSort((c) => ({ ...c, name: value }));
                }}
              />
            </div>
            <div className='mb-4'>
              <label className='form-label'>Status</label>
              <SortStatus
                selected={sort.status}
                onSelect={(value) => {
                  setSort((c) => ({ ...c, status: value }));
                }}
              />
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
              <button
                onClick={async (e) => {
                  console.log(sort);
                  await refetchClasses();
                }}
                className='btn btn-success'
              >
                Apply
              </button>
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
