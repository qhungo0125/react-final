import React from 'react';
import { getClasses } from '../../../../../api/admin';
import { createArrayFrom1ToN } from '../../../../../utils/format';
import { useSearchParams } from 'react-router-dom';

const useClasses = (props) => {
  // pagination
  const { sort, filter } = props;
  const [pages, setPages] = React.useState([]);
  const [pagination, setPagination] = React.useState({
    page: 1,
    limit: 10,
  });
  // support pagination
  const [searchParams, setSearchParams] = useSearchParams();

  // update pagination state
  React.useEffect(() => {
    setPagination((current) => ({
      ...current,
      page: +searchParams.get('page') || 1,
      limit: +searchParams.get('limit') || 10,
    }));
  }, [searchParams.get('page'), searchParams.get('limit')]);

  // data and loading
  const [classes, setClasses] = React.useState([]);
  const [loading, setLoading] = React.useState(false);

  const getClassesData = React.useCallback(async () => {
    console.log('getClassesData', pagination, sort, filter);
    try {
      setLoading(true);

      const params = {
        page: pagination.page,
        limit: pagination.limit,
        filter: {},
        sort: {},
      };

      if (sort) {
        params.sort = {
          isActived: sort.status,
          name: sort.name,
        };
      }

      if (filter) {
        if (filter.name.trim() !== '') {
          params.filter = {
            name: filter.name,
          };
        }
        if (filter.status !== 'all') {
          params.filter.isActived = filter.status;
        }
      }

      const response = await getClasses(params);
      if (response && response.data && response.data.classes) {
        setClasses(response.data.classes);
        const pages = createArrayFrom1ToN(response.data.pages);
        setPages(pages);
      }
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  }, [pagination, sort, filter]);

  // get first data
  React.useEffect(() => {
    setSearchParams({
      page: 1,
      limit: 10,
    });
  }, []);

  React.useEffect(() => {
    getClassesData();
  }, [pagination]);

  return {
    classes,
    refetchClasses: getClassesData,
    pages,
    loading,
    pagination,
  };
};

export default useClasses;
