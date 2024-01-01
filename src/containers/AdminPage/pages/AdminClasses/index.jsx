import React from 'react';
import Classes from '../../../../components/AdminTable/Classes/classes';
import useClasses from './state/useClasses';
import { createInvitationCode } from '../../../../api/admin';
import { Link, useSearchParams } from 'react-router-dom';

const AdminClasses = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  const [pagination, setPagination] = React.useState({
    page: searchParams.get('page') || 1,
    limit: searchParams.get('limit') || 10,
  });
  const { classes, refetchClasses } = useClasses(pagination);

  React.useEffect(() => {
    console.log(
      'searchParams',
      searchParams.get('page'),
      searchParams.get('limit'),
    );
    setPagination((current) => ({
      ...current,
      page: searchParams.get('page'),
      limit: searchParams.get('limit'),
    }));
  }, [searchParams]);

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

  return (
    <>
      <Classes classes={classes} onCreateCode={onCreateCode} />
      <div className="d-flex justify-content-center">
        <nav aria-label="Page navigation example">
          <ul className="pagination">
            <li className="page-item">
              <Link
                className="page-link"
                to={`?page=${pagination.page - 1}&limit=${pagination.limit}`}
              >
                Previous
              </Link>
            </li>
            <li className="page-item">
              <Link
                className="page-link"
                to={`?page=1&limit=${pagination.limit}`}
              >
                1
              </Link>
            </li>
            <li className="page-item">
              <Link
                className="page-link"
                to={`?page=2&limit=${pagination.limit}`}
              >
                2
              </Link>
            </li>
            <li className="page-item">
              <Link
                className="page-link"
                to={`?page=3&limit=${pagination.limit}`}
              >
                3
              </Link>
            </li>
            <li className="page-item">
              <Link
                className="page-link"
                href={`?page=${pagination.page + 1}&limit=${pagination.limit}`}
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
