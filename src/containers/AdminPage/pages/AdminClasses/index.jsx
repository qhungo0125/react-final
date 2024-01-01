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

const AdminClasses = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  const [pagination, setPagination] = React.useState({
    page: 1,
    limit: 10,
  });
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
      <Classes
        classes={classes}
        onRemoveCode={onRemoveCode}
        onCreateCode={onCreateCode}
        updateClassStatus={updateClassStatus}
      />
      <div className="d-flex justify-content-center">
        <nav aria-label="Page navigation example">
          <ul className="pagination">
            <li className="page-item">
              <Link
                className="page-link"
                to={`?page=${
                  pagination.page - 1 > 0 ? pagination.page - 1 : 1
                }&limit=${pagination.limit}`}
              >
                Previous
              </Link>
            </li>
            {pages.map((pageIndex) => {
              return (
                <li key={pageIndex} className="page-item">
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
            <li className="page-item">
              <Link
                className="page-link"
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
    </>
  );
};

export default AdminClasses;
